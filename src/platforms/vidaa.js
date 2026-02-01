import {Platform} from './utils/types.js';
import CustomPlatform from './custom.js';

// Enhanced VIDAA platform detection
export function isVidaa() {
  try {
    const ua = navigator.userAgent || "";
    const hasGlobal = typeof window.VIDAA !== "undefined";
    const hasVidaaUA = /VIDAA\/\d+/i.test(ua);                 // e.g. "... VIDAA/6.0 ..."
    const hasHisense = /\bHisense\b/i.test(ua);                // e.g. "Model/Hisense-MT9602"
    const hasOdin = /\bOdin\/\d+/i.test(ua);                   // Chromium fork on VIDAA U
    return hasGlobal || (hasVidaaUA && (hasHisense || hasOdin));
  } catch { return false; }
}

class Vidaa extends CustomPlatform {
  constructor(){
    super(Platform.Vidaa);
  }
}

export default Vidaa;