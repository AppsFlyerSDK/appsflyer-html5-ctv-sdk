import AppsFlyerCore from './core/AppsFlyerCore.js';
import SamsungPlatform from './platforms/samsung/samsung.js';
import LGPlatform from './platforms/lg/lg.js';
import CustomPlatform from './platforms/custom/custom.js';
import { Platform } from './platforms/types/types.js';
import {INVALID_SDK, DEVICE_OS_NOT_SUPPORT, NO_PLATFORM_FOUND} from './core/utils/constants.js';

class AppsFlyerSDK {
  constructor(config) {
    return new Promise( async(resolve, reject) => {

      if(this.getChromiumVersion() > 49){
        this.appsflyerInstance = AppsFlyerCore.prototype.getInstance();
        try{
          this.platformInstance = this.setPlatformInstance();
        }catch(err){
          reject(err) 
        }
      }else{
        reject(DEVICE_OS_NOT_SUPPORT);
      }
      
      if(this.isSDKValid()){
        try{
          await this.init(config);
          resolve(this)
        }catch(err){
          reject(err)
        }
      }else{
        reject(INVALID_SDK);
      }
    });
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
        // platformInstance = new CustomPlatform(Platform.Smartcast);
        platformInstance = null;
        throw NO_PLATFORM_FOUND;
      }
    }
    return platformInstance;
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
      } 
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

export async function getInstance(config){
  return new AppsFlyerSDK(config);
}

export default (config) => new AppsFlyerSDK(config);
