import {PlatformPayload} from '../platformPayload.js';
import {Platform, DeviceIds} from '../types/types.js';

class CustomPlatform {
  constructor(platform){
    this.platform = platform;
    this.platformLogs = [];
  }
  async getPlatformPayload() {
    let platformPayload = PlatformPayload(this.platform);
    let idType;
    
    switch(this.platform){
      case Platform.Smartcast:
        idType = DeviceIds.Vida;  
        break;
      case Platform.Vidaa:
        idType = DeviceIds.Custom;  
        break;
      default:
        idType = DeviceIds.Custom;
    }

    platformPayload.payload.device_ids.push({type: idType, value: ""});
    return platformPayload;
  }

  getPlatformLogs() {
    return this.platformLogs;
  }

}

export default CustomPlatform;