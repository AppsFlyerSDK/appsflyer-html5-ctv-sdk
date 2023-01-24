import AppsFlyerCore from './core/AppsFlyerCore.js';
import Samsung from './platforms/samsung/samsung.js';
import LG from './platforms/lg/lg.js';
import Vizio from './platforms/custom/vizio.js';
import Vidaa from './platforms/custom/vidaa.js';
import {INVALID_SDK, DEVICE_OS_NOT_SUPPORT, NO_PLATFORM_FOUND} from './core/utils/constants.js';

const PLATFORM_MAPPING = [Samsung, LG, Vizio, Vidaa]

class AppsFlyerSDK {
  constructor(config) {
    return new Promise( async(resolve, reject) => {
      if(this.getChromiumVersion() > 49){
        this.appsflyerInstance = AppsFlyerCore;
        try{
          this.setPlatformInstance();
          await this.init(config);
          resolve(this)
        }catch(err){
          reject(err) 
        }
      }else{
        reject(DEVICE_OS_NOT_SUPPORT);
      }
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
      throw NO_PLATFORM_FOUND;
    }
  }

  async init(config) {
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
      } catch (error){
        throw error
      } 
    }else{
      throw INVALID_SDK;
    } 
  }

  start() {   
    return this.isSDKValid() ? this.appsflyerInstance.start() : new Error(INVALID_SDK);
  }
  
  logEvent(eventName, eventValue) {
    return this.isSDKValid() ? this.appsflyerInstance.logEvent(eventName, eventValue) : new Error(INVALID_SDK);
  }

  setCustomPayload(payload) {
    return this.isSDKValid() ? this.appsflyerInstance.setCustomPayload(payload) : new Error(INVALID_SDK);
  }

  setCustomerUserId(userId) {
    return this.isSDKValid() ? this.appsflyerInstance.setCustomerUserId(userId) : new Error(INVALID_SDK);
  }

  getChromiumVersion(){
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : false;
  }

  isSDKValid(){
    return (this.appsflyerInstance && this.platformInstance) ? true : false;
  }
  
}

export async function getInstance(config){
  return new AppsFlyerSDK(config);
}

export default (config) => new AppsFlyerSDK(config);
