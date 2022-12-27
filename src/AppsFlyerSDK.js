import AppsFlyerCore from './core/AppsFlyerCore.js';
import SamsungPlatform from './platforms/samsung/samsung.js';
import LGPlatform from './platforms/lg/lg.js';
import CustomPlatform from './platforms/custom/custom.js';
import { Platform } from './platforms/types/types.js';

class AppsFlyerSDK {
  constructor() {
    this.appsflyerInstance = AppsFlyerCore.prototype.getInstance();
    this.setPlatformInstance();
  }

  setPlatformInstance() {
    let platformInstance;
    if (platformInstance === undefined) {
      if (typeof tizen != 'undefined' && tizen.application) {
        platformInstance = new SamsungPlatform();
      } else if (typeof webOS != 'undefined' && webOS.fetchAppInfo && webOS.platform.tv) {
        platformInstance = new LGPlatform();
      } else if(typeof VIZIO != 'undefined'){
        platformInstance = new CustomPlatform(Platform.Smartcast);
      } else if(typeof VIDAA != 'undefined'){
        platformInstance = new CustomPlatform(Platform.Vidaa);
      } else {
        platformInstance = null;
        console.error("No platform found");
      }
      this.platformInstance = platformInstance;
    }
  }

  async init(config) {
    let platformPayload, platformLogs;
    if(this.platformInstance){
      try{
        platformPayload = await this.platformInstance.getPlatformPayload();
        platformLogs = this.platformInstance.getPlatformLogs();
      } catch (error){
        platformLogs.push(error)
      }

      try{
        await this.appsflyerInstance.init(config, platformPayload, platformLogs);
      } catch (error){
        console.error(error)
      } 
    } else {
      console.error("Init failed: No platform found");
    }  
  }

  start() {   
    return this.appsflyerInstance.start();
  }
  
  logEvent(eventName, eventValue) {
    return this.appsflyerInstance.logEvent(eventName, eventValue);
  }

  setCustomPayload(payload) {
    return this.appsflyerInstance.setCustomPayload(payload);
  }

  setCustomerUserId(userId) {
    return this.appsflyerInstance.setCustomerUserId(userId);
  }
}

export function getInstance(){
  return new AppsFlyerSDK();
}

export default AppsFlyerSDK;
