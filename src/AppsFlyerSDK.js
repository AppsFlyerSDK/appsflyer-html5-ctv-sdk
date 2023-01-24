import AppsFlyerCore from './core/AppsFlyerCore.js';
import SamsungPlatform from './platforms/samsung/samsung.js';
import LGPlatform from './platforms/lg/lg.js';
import Vizio from './platforms/custom/vizio.js';
import Vidaa from './platforms/custom/vidaa.js';
import {INVALID_SDK, DEVICE_OS_NOT_SUPPORT, NO_PLATFORM_FOUND} from './core/utils/constants.js';

const PLATFORM_MAPPING = [SamsungPlatform, LGPlatform, Vizio, Vidaa]

class AppsFlyerSDK {
  constructor() {
    return new Promise( (resolve, reject) => {

      if(this.getChromiumVersion() > 49){
        this.appsflyerInstance = AppsFlyerCore;
        try{
          this.setPlatformInstance();
        }catch(err){
          reject(err) 
        }
      }else{
        reject(DEVICE_OS_NOT_SUPPORT);
      }
      
      this.isSDKValid() ? resolve(this) : reject(INVALID_SDK);
    });
  }

  setPlatformInstance() {
    const isDefined = x => x!= undefined;
    const availablePlatforms = [(window.tizen && tizen.application), (window.webOS && webOS.fetchAppInfo && webOS.platform.tv), window.VISIO, window.VIDAA];
    const plafromIndex = availablePlatforms.map(p => isDefined(p)).findIndex(p => p == true);

    if(plafromIndex !== -1){
      const platformFactory = PLATFORM_MAPPING[plafromIndex];
      this.platformInstance = new platformFactory();
    }else{
      // this.platformInstance = new Vizio();
      this.platformInstance = null;
      throw NO_PLATFORM_FOUND;
    }
  }

  async init(config) {
    return new Promise(async (resolve, reject) => {

      let platformPayload, platformLogs;
      if(this.isSDKValid()){
        try{
          platformPayload = await this.platformInstance.getPlatformPayload();
          platformLogs = this.platformInstance.getPlatformLogs();
        } catch (error){
          platformLogs.push(error)
        }

        try{
          await this.appsflyerInstance.init(config, platformPayload, platformLogs);
          resolve(true)
        } catch (error){
          reject(error)
        } 
      } 
    });
  }

  start() {   
    return this.isSDKValid() ? this.appsflyerInstance.start() : null;
  }
  
  logEvent(eventName, eventValue) {
    return this.isSDKValid() ? this.appsflyerInstance.logEvent(eventName, eventValue) : null;
  }

  setCustomPayload(payload) {
    return this.isSDKValid() ? this.appsflyerInstance.setCustomPayload(payload) : null;
  }

  setCustomerUserId(userId) {
    return this.isSDKValid() ? this.appsflyerInstance.setCustomerUserId(userId) : null;
  }

  getChromiumVersion(){
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : false;
  }

  isSDKValid(){
    return (this.appsflyerInstance && this.platformInstance) ? true : false;
  }
}

export function getInstance(){
  return new AppsFlyerSDK();
}

export default AppsFlyerSDK;
