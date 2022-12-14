import AppsFlyerCore from './core/AppsFlyerCore.js';
import AppsFlyerSamsungSDK from './platforms/samsung/samsung.js';
import AppsFlyerLGSDK from './platforms/lg/lg.js';

class AppsFlyerSDK {
  constructor() {
    this.appsflyerInstance = AppsFlyerCore.prototype.getInstance();
    this.setPlatformInstance();
  }

  setPlatformInstance() {
    let platformInstance;
    if (platformInstance === undefined) {
      if (typeof tizen != 'undefined' && tizen.application) {
        platformInstance = new AppsFlyerSamsungSDK();
      } else if (typeof webOS != 'undefined' && webOS.fetchAppInfo && webOS.platform.tv) {
        platformInstance = new AppsFlyerLGSDK();
      } else {
        platformInstance = null;
        console.error("No platform found");
      }
      this.platformInstance = platformInstance;
    }
  }

  async init(config) {
    if(this.platformInstance){
      let platformPayload, platformLogs;
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
