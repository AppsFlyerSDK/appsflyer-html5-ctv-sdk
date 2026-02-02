import {Platform} from './utils/types.js';
import CustomPlatform from './custom.js';

export function isVizio() {
  return window.VIZIO || /VIZIO|SmartCast/i.test(navigator.userAgent || '');
}

class Vizio extends CustomPlatform {
  constructor(){
    super(Platform.Smartcast);
  }
}

export default Vizio;