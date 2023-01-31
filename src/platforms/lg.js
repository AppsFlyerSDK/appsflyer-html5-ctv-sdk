import {platformData} from './utils/platformData.js';
import {DEFAULT_DEVICE_ID, DEFAULT_APP_VERSION} from './utils/constants.js';
import {DeviceIds, Platform} from './utils/types.js';

class LG {
  constructor(){
    this.platformLogs = [];
  }
  async getPlatformData() {
      let data = platformData(Platform.Webos);
        try {
          const lgUdid = await this.getLGUDID()
          data.payload.device_ids.push({type: DeviceIds.Lgudid, value: lgUdid});
        } catch (error) {
          this.platformLogs.push(error);
        }

        try {
          let deviceData = await this.getWebosData();
          data.payload.device_model = deviceData.device_model;
          data.payload.device_os_version = deviceData.device_os_version;
        } catch (error) {
          this.platformLogs.push(error);
        }

        try {
          data.payload.app_version = await this.getAppVersion();
        } catch (error) {
          data.payload.app_version = DEFAULT_APP_VERSION;
          this.platformLogs.push(error);
        }

        return data;

  }
  getPlatformLogs() {
    return this.platformLogs;
  }
  async getWebosData() {
    return new Promise((resolve, reject)=>{
      webOS.service.request("luna://com.webos.service.tv.systemproperty", {
        method: "getSystemInfo",
        parameters: { 
            "keys": ["modelName", "sdkVersion"]
        },
        onComplete: function (response) {
            let isSucceeded = response.returnValue;
            let deviceData = {};

            if (isSucceeded){
                deviceData.device_model = String(response.modelName);
                deviceData.device_os_version = String(response.sdkVersion);
                resolve(deviceData);
            } else {
                reject("Failed to get TV device information")
            }
        }
      });
    })
  }
  async getAppVersion() {
    let _this = this;
    return new Promise((resolve, reject)=>{
      let path = webOS.fetchAppRootPath();
      if (path.length !== 0) {
        webOS.fetchAppInfo(function (info) {
          if (info) {
            let appVersion = info.version;
            if(appVersion == undefined){
              appVersion = '0.0.0';
              _this.platformLogs.push("App version doesn't exist in appinfo.json");
            }
            resolve(appVersion)
          } else {
            reject('Error occurs while getting appinfo.json.');
          }
        }, path + 'appinfo.json');
      } else {
        reject('Getting application root path failed.');
      }
    })
  }

  async getLGUDID() {
    return new Promise((resolve, reject) => {
      webOS.service.request("luna://com.webos.service.sm", {
        method: "deviceid/getIDs",
        parameters: { 
            "idType": ["LGUDID"]        
        },
        onSuccess: function (response) {
          let isSucceeded = response.returnValue;
    
          if (isSucceeded){
            let lgUdid = String(response.idList[0].idValue);
            // if the device is a simulator, device ID should be zeros
            if(lgUdid.includes("simulator")){
              lgUdid = DEFAULT_DEVICE_ID
            }
            resolve(lgUdid);
          }
        },
        onFailure: function (inError) {
            reject("Failed to get system ID information" + "[" + inError.errorCode + "]: " + inError.errorText);
        }
      });
    })
  }
}

export default LG;