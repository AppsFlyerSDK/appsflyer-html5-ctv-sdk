export class Utils {
  constructor() {
    this.generateUUIDv4 = function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0; const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    this.isEmptyString = function isEmptyString(str) {
      return !str || str.length === 0;
    };

    this.isNumber = function isNumber(n) {
      return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    };

    this.isString = function isString(s) {
      return !(typeof (s) === 'string') || !(this.isEmptyString(s));
    };  
    
    this.isBooleanTrue = function isString(b) {
      return (b === true && typeof (b) === 'boolean');
    };  

    this.isEmptyJSON = function isString(obj) {
      return (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype);
    };

    this.isJsonString = function isJsonString(str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return true;
      }
      return false;
    }
    this.buildEndpoint = function buildEndpoint(baseEndpoint, platform, appId) {
      return baseEndpoint + platform + '/' + appId;
    }
  }
}
