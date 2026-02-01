import {Platform} from './utils/types.js';
import CustomPlatform from './custom.js';

// Enhanced VIDAA platform detection
export function isVidaa() {
  const ua = navigator.userAgent || "";
  const hasGlobal = window.VIDAA != null;
  const hasVidaaUA = /VIDAA\/\d+/i.test(ua);
  const hasHisense = /\bHisense\b/i.test(ua);
  const hasOdin = /\bOdin\/\d+/i.test(ua);
  return hasGlobal || (hasVidaaUA && (hasHisense || hasOdin));
}

class Vidaa extends CustomPlatform {
  constructor(){
    super(Platform.Vidaa);
  }
}

export default Vidaa;