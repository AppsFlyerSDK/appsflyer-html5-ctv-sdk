import {PlatformPayload} from '../platformPayload.js';
import {DEFAULT_DEVICE_ID, DEFAULT_APP_VERSION} from '../types/constants.js';
import {DeviceIds, Platform} from '../types/types.js';

class AppsFlyerSamsungSDK {
  constructor(){
    this.platformLogs = [];
  }
  async getPlatformPayload() {
    let samsungPlatformPayload = PlatformPayload(Platform.Tizen);
    try {
      samsungPlatformPayload.payload = await this.getSamsungData(samsungPlatformPayload.payload);
    } catch (error) {
      this.platformLogs.push(error);
    }
    return samsungPlatformPayload;
  }
  getPlatformLogs() {
    return this.platformLogs;
  }
  async getSamsungData(samsungPlatformPayload) {
    let deviceData = samsungPlatformPayload;
    if (typeof tizen != 'undefined' && tizen.application) {
      let appVersion = DEFAULT_APP_VERSION; 
      try{
        appVersion = await tizen.application.getCurrentApplication().appInfo.version;
      }catch(err){
        this.platformLogs.push("Couldn't collect app version");
      }
      deviceData.app_version = appVersion;
      
      let isLATEnabled = true;
      let tifa;
      try {
        isLATEnabled = await webapis.adinfo.isLATEnabled();
        if (!isLATEnabled) {
          tifa = await webapis.adinfo.getTIFA();  
        }
        deviceData.limit_ad_tracking = isLATEnabled;
      } catch (e) {
        if (e.message.indexOf('undefined') == -1) {
          this.platformLogs.push('Error, such as a missing privilege in thee config.xml of the app. Error: ' + e);
        } else {
          this.platformLogs.push('Older firmware and models do not support this method. Error: ' + e);
          tifa = DEFAULT_DEVICE_ID;
        }
      }
      if(tifa !== undefined){
        deviceData.device_ids.push({type: DeviceIds.Tifa, value: tifa});
      }

      let deviceModel = '';
      try {
        deviceModel = await webapis.productinfo.getModel();
        deviceData.device_model = deviceModel;
      } catch (e) {
        this.platformLogs.push('permisson missing for device model Error: ' + e);
        deviceData.device_model = "samsung";
      }

      let systeminfo = '';
      try {
        systeminfo = await tizen.systeminfo.getCapability('http://tizen.org/feature/platform.version');
        deviceData.device_os_version = systeminfo;
      } catch (e) {
        this.platformLogs.push('permisson missing for device model Error: ' + e);
      }
    }
    return deviceData;
  }
}

export default AppsFlyerSamsungSDK;
