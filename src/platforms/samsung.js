import {platformData} from './utils/platformData.js';
import {DEFAULT_DEVICE_ID, DEFAULT_APP_VERSION} from './utils/constants.js';
import {DeviceIds, Platform} from './utils/types.js';

class Samsung {
  constructor(){
    this.platformLogs = [];
  }
  async getPlatformData() {
    let data = platformData(Platform.Tizen);
    
    data.payload.app_version = await this.getAppVersion();
    const limitAdTracking = await this.getIsLATEnabled();
    data.payload.limit_ad_tracking = limitAdTracking

    if(!limitAdTracking){
      const tifa = await this.getTIFA();
      if(tifa !== undefined){
        data.payload.device_ids.push({type: DeviceIds.Tifa, value: tifa});
      }
    }
    
    data.payload.device_model = await this.getModel();
    data.payload.device_os_version = await this.getDeviceOsVersion();

    return data;
  }

  getPlatformLogs() {
    return this.platformLogs;
  }

  async getAppVersion() {
    try{
      return await tizen.application.getCurrentApplication().appInfo.version;
    } catch(e){
      this.platformLogs.push("Couldn't collect app version");
      return DEFAULT_APP_VERSION
    } 
  }
  async getIsLATEnabled() {
    try{
      return await webapis.adinfo.isLATEnabled();
    } catch(e){
      if (e.message.indexOf('undefined') == -1) {
        this.platformLogs.push('Error, such as a missing privilege in thee config.xml of the app');
      } else {
        this.platformLogs.push('Older firmware and models do not support this method');
      }
      return false;
    } 
  }
  async getTIFA() {
    try {
      return await webapis.adinfo.getTIFA();  
    } catch (e) {
      if (e.message.indexOf('undefined') == -1) {
        this.platformLogs.push('Error, such as a missing privilege in thee config.xml of the app');
      } else {
        this.platformLogs.push('Older firmware and models do not support this method');
        return DEFAULT_DEVICE_ID;
      }
    }
  }
  async getModel() {
      try {
        return await webapis.productinfo.getModel();
      } catch (e) {
        this.platformLogs.push('permisson missing for device model');
        return "samsung";
      }
  }
  async getDeviceOsVersion() {
    try {
      return await tizen.systeminfo.getCapability('http://tizen.org/feature/platform.version');
    } catch (e) {
      this.platformLogs.push('permisson missing for device model');
    }
  }

}

export default Samsung;
