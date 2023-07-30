import {platformData} from './utils/platformData.js';
import {Platform, DeviceIds} from './utils/types.js';

class CustomPlatform {
  constructor(platform){
    this.platform = platform;
    this.platformLogs = [];
  }
  async getPlatformData() {
    let data = platformData(this.platform);
    let idType;
    
    switch(this.platform){
      case Platform.Smartcast:
        idType = DeviceIds.Vida;  
        break;
      case Platform.Vidaa:
        idType = DeviceIds.Vidaa;  
        break;
      default:
        idType = DeviceIds.Custom;
    }

    data.payload.device_ids.push({type: idType, value: ""});
    return data;
  }

  getPlatformLogs() {
    return this.platformLogs;
  }

}

export default CustomPlatform;