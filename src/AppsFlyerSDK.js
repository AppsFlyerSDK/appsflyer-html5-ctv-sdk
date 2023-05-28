import AppsFlyerCore from './core/AppsFlyerCore.js';
import Samsung from './platforms/samsung.js';
import LG from './platforms/lg.js';
import Vizio from './platforms/vizio.js';
import Vidaa from './platforms/vidaa.js';
import {INVALID_SDK, DEVICE_OS_NOT_SUPPORT, NO_PLATFORM_FOUND} from './core/utils/constants.js';
import {Platform} from './platforms/utils/types.js';
import semver from 'semver';

const PLATFORM_MAPPING = [Samsung, LG, Vizio, Vidaa]

class AppsFlyerSDK {
  constructor(config) {
    return new Promise( async(resolve, reject) => {
        this.appsflyerInstance = AppsFlyerCore;
        try{
          this.setPlatformInstance();
          await this.init(config);
          resolve(this)
        }catch(err){
          reject(err) 
        }
    });
  }

  setPlatformInstance() {
    try{
      const isDefined = x => x!= undefined;
      const availablePlatforms = [(window.tizen && tizen.application), (window.webOS && webOS.fetchAppInfo && webOS.platform.tv), window.VIZIO, window.VIDAA];
      const plafromIndex = availablePlatforms.map(p => isDefined(p)).findIndex(p => p == true);
      if(plafromIndex !== -1){
        const platformFactory = PLATFORM_MAPPING[plafromIndex];
        this.platformInstance = new platformFactory();
      }else{
        throw NO_PLATFORM_FOUND;
      }
    }catch(e){
      throw DEVICE_OS_NOT_SUPPORT;
    }
  }

  async init(config) {
    return new Promise( async(resolve, reject) => {
      let platformData, platformLogs;
      if(this.isSDKValid()){
        try{
          platformData = await this.platformInstance.getPlatformData();
          platformLogs = this.platformInstance.getPlatformLogs();
        } catch (error){
          platformLogs.push(error)
        }
        const isVersionValid = await this.validateOSVersion(platformData.platform, platformData.payload.device_os_version)
        if(isVersionValid){
          try{
            await this.appsflyerInstance.init(config, platformData, platformLogs);
            resolve(true)
          } catch (error){
            reject(error)
          } 
        }else{
          reject(DEVICE_OS_NOT_SUPPORT);
        }
      }else{
        reject(INVALID_SDK);
      } 
    });
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

  async validateOSVersion(os, osVersion){
    if((os == Platform.Tizen || os == Platform.Webos) && semver.gte(semver.coerce(osVersion), '4.0.0')){
      return true
    }else{
      let raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
      return raw ? parseInt(raw[2], 10) : false;
    }
  }

  isSDKValid(){
    return (this.appsflyerInstance && this.platformInstance) ? true : false;
  }
  
}

export async function getInstance(config){
  return new AppsFlyerSDK(config);
}

export default (config) => new AppsFlyerSDK(config);
