export class Logger {
  constructor() {
    let isDebug;
    const appsflyerPerfix = 'AppsFlyerSDK :: '
    this.setDebugMode = function setDebugMode(isDebugMode) {
      isDebug = isDebugMode;
    };

    this.info = function info(message) {
      if (isDebug) {
        console.log(appsflyerPerfix, String(message));
      }
    };
    this.warning = function warning(message) {
      if (isDebug) {
        console.warn(appsflyerPerfix, String(message));
      }
    };
    this.error = function error(message) {
      if (isDebug) {
        console.error(appsflyerPerfix, String(message));
      }
    };
  }
}
