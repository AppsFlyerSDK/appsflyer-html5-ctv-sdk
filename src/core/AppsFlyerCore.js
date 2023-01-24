import {Utils} from './utils/utils.js';
import {Logger} from './utils/logger.js';
import {Auth} from './internal/auth/utils.js';
import {Requests} from './internal/http/requests.js';
import {LocalStorage} from './internal/storage/storage.js';
import {APPSFLYER_INITIZALIZED, APPSFLYER_PREDEFINED_EVENTS, APPSFLYER_PREDEFINED_EVENTS_ARR, INVALID_APP_ID, INVALID_DEV_KEY, LOG_EVENT, START, CUSTOMER_USER_ID, DEVICE_ID} from './utils/constants.js';

// AppsFlyerCore constructor and setters methods
class AppsFlyerCore {
  constructor() {
    this.appsFlyerOptions = {
      appId: '',
      devKey: '',
      isDebug: false,
      isSandbox: false
    };
    this.utils = new Utils();
    this.storage = new LocalStorage();
    this.auth = new Auth();
    this.logger = new Logger();
    
    this.setCustomerUserId = function(userId) {
      this.payload[CUSTOMER_USER_ID] = userId;
    };
    this.setPayload = function(payload) {
      this.payload = payload;
    };
    this.setCustomPayload = function(payload) {   
      Object.keys(payload).forEach((key) => {
        if(key == DEVICE_ID){
          this.payload.device_ids.forEach(device_id => {
            if(device_id.value == ""){
              device_id.value = payload[key];
            }
          });    
        }else{
          this.payload[key] = payload[key];
        }
      })
    };
    this.setPlatform = function(platform) {
      this.platform = platform;
    };
    this.getPayload = function() {
      return JSON.parse(JSON.stringify(this.payload));
    };

    this.setRequestID = function() {
      this.payload.request_id = this.utils.generateUUIDv4();
    };

    this.setTimestamp = function() {
      this.payload.timestamp = Date.now();
    };
    
    this.setAppsFlyerID = function() {
      let appsFlyerID = this.storage.getAppsFlyerID();
      if (!appsFlyerID) {
        appsFlyerID = this.utils.generateUUIDv4();
      }
      this.appsFlyerID = appsFlyerID;
      // this.payload.appsflyer_id = appsFlyerID;
      this.payload.device_ids.push({type: 'custom', value: appsFlyerID});
    };   

    this.setSessionCount = function setSessionCount() {
      const currSessionCount = this.storage.getSessionCount();
      if (currSessionCount) {
        this.sessionCount = Number(currSessionCount) + 1;
      } else {
        this.sessionCount = 1;
      }
    };
    this.printPlatformLogs = function printPlatformLogs(platformLogs){
      if(platformLogs){
        platformLogs.forEach(log => this.logger.error(log));
      }
    };
  }

  // public APIs
  setCustomerUserId(userId){
    this.setCustomerUserId(userId);
  }

  setCustomPayload(payload){
    this.setCustomPayload(payload);
  }
  
  // init API sets appsFlyerOptions, sessionCount and AppsFlyer ID
  async init(config, platformPayload, platformLogs) {
      const appId = config.appId;
      const devKey = config.devKey;
      let isDebug = false;
      let isSandbox = false;

      if (this.utils.isBooleanTrue(config.isDebug)) {
        isDebug = true;
      }    
      if (this.utils.isBooleanTrue(config.isSandbox)) {
        isSandbox = true;
      }

      this.logger.setDebugMode(isDebug);
      this.printPlatformLogs(platformLogs);

      try {
        if (!this.utils.isNumber(appId)) {
          throw new Error(INVALID_APP_ID);
        }

        if (!this.utils.isString(devKey)) {
          throw new Error(INVALID_DEV_KEY);
        }
      
        this.appsFlyerOptions.devKey = devKey;
        this.appsFlyerOptions.appId = appId;
        this.appsFlyerOptions.isDebug = isDebug;
        this.appsFlyerOptions.isSandbox = isSandbox;

        this.requests = new Requests(this.utils, this.logger, this.auth, this.storage, isSandbox);
        this.setPayload(platformPayload.payload);
        this.setPlatform(platformPayload.platform);
        this.setAppsFlyerID();
        this.setSessionCount();
        this.setRequestID();
        this.setTimestamp();
        this.storage.setLocalStorage(this.appsFlyerID, this.sessionCount);

        this.logger.info(APPSFLYER_INITIZALIZED);
      } catch (err) {
        this.logger.error(err);
        throw new Error(err);
      }
  }
  // start API send a request to session/first-open endpoint
  start() {
    return new Promise((resolve, reject) => {

      this.setRequestID();
      this.setTimestamp();

      this.requests.buildAndCallRequest(START, this.appsFlyerOptions, this.payload, this.platform)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
  // logEvent API send a request to inapp-events endpoint
  logEvent(eventName, eventValue) {
    return new Promise((resolve, reject) => {
      
      this.setRequestID();
      this.setTimestamp();

      this.logEventPayload = this.setLogEventPayload(eventName, eventValue);
      
      this.requests.buildAndCallRequest(LOG_EVENT, this.appsFlyerOptions, this.logEventPayload, this.platform)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }

  validateLogEventsParams(eventParameters){
    let paramValue;

    for(const paramKey in eventParameters) {
      paramValue = eventParameters[paramKey];
      if (APPSFLYER_PREDEFINED_EVENTS_ARR.includes(paramKey)) {
        switch(paramKey){
          case APPSFLYER_PREDEFINED_EVENTS.Revenue:
            paramValue = parseFloat(paramValue);
            break;
          case APPSFLYER_PREDEFINED_EVENTS.Price:
            paramValue = parseFloat(paramValue);
            break;
          case APPSFLYER_PREDEFINED_EVENTS.Currency:
            paramValue = String(paramValue);
            break;
          case APPSFLYER_PREDEFINED_EVENTS.Duration:
            paramValue = parseInt(paramValue);
            break;
          default:
            paramValue = null;
            break;
        }
        if(paramValue !== null && paramValue !== "undefined"){
          this.predefinedParams[paramKey] = paramValue;
        }
      }else{
        if(paramValue !== null && paramValue !== "undefined"){
          this.customParams[paramKey] = String(paramValue);
        }
      }
    }
    
  }

  setLogEventPayload(eventName, eventValue) {
    let eventNameStr = eventName;
    // get payload
    let logEventPayload = this.getPayload();
    this.customParams = {};
    this.predefinedParams = {};

    // validate event name
    if (!this.utils.isString(eventName)){
      eventNameStr = String(eventName);
    }
    // validate event params
    if(this.utils.isJsonString(eventValue)){
      this.validateLogEventsParams(eventValue);
    }else{
      this.customParams.eventkey = String(eventValue);
    }
    // set event name, event_parameters, event_custom_parameters in payload
    logEventPayload.event_name = eventNameStr;
    if(!this.utils.isEmptyJSON(this.predefinedParams)){
      logEventPayload.event_parameters = this.predefinedParams;
    }
    if(!this.utils.isEmptyJSON(this.customParams)){
      logEventPayload.event_custom_parameters = this.customParams;
    }
    return logEventPayload;
  }
}


export default new AppsFlyerCore();
