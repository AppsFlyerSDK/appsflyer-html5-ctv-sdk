import {buildResponseMessage, buildResponseObj, ResponseSuccessCodes} from './responses.js';
import {LOG_EVENT} from '../../utils/constants.js';
import {Endpoints} from './endpoints.js';

export class Requests {
  constructor(utils, logger, auth, storage, isSandbox) {
    this.utils = utils;
    this.logger = logger;
    this.auth = auth;
    this.storage = storage;
    this.endpoints = new Endpoints(isSandbox);

    const retryTimes = 2;
    const retryTimeout = 2000;

    this.buildAndCallRequest = async function(apiMethod, appsFlyerOption, payload, platform) {
      const url = this.getRequestEndpoint(apiMethod, appsFlyerOption.appId, platform);
      const options = await this.postJson(appsFlyerOption.devKey, payload);

      return this.request(apiMethod, url, options);
    };

    this.request = (apiMethod, url, options) => {
      this.logger.info('Sending ' + apiMethod + ' request');
      this.logger.info(url);
      this.logger.info(options.body);

      let responseObj, responseMessage;
      return new Promise((resolve, reject) => {
        this.sendHTTPRequestWithRetry(url, options)
            .then((response) => {
              responseObj = buildResponseObj(response);
              responseMessage = buildResponseMessage(apiMethod, responseObj);
              if(!ResponseSuccessCodes.includes(response.status)){
                throw responseObj
              }
              this.logger.info(responseMessage);
              resolve(responseObj);
            })
            .catch((err) => {
              if(responseMessage == undefined){
                responseObj = buildResponseObj(err);
                responseMessage = buildResponseMessage(apiMethod, responseObj);
              }
              this.logger.error(responseMessage);
              reject(responseObj);
            });
      })
    }

    this.sendHTTPRequestWithRetry = async function(url, options) {
      return new Promise(async (resolve, reject) => {
        let response;
        try{
          response = await HTTPRequest(url, options);
          resolve(response);
        } catch(err){
          try{
            response = await this.retryRequest(() => HTTPRequest(url, options), retryTimes, retryTimeout);
            resolve(response);
          }catch(err){
            reject(err);
          }
        }
      });
    };

    const HTTPRequest = function(url, options){
      return new Promise(async (resolve, reject) => {
        try {
          let response = await fetch(url, options)
          if(response.status === undefined || response.status === 404){
            reject(response);
          }
          resolve(response)
        } catch(err){
          reject(err)
        }
      });
    }

    this.retryRequest = async function(callback, retryTimes, intervalTime){
      let tryNumber = 1;
      return new Promise(async (resolve, reject) => {
          const interval = setInterval(async () => {
            this.logger.info("Retry number: " + tryNumber);

            if(tryNumber == retryTimes){
              clearInterval(interval);
            }
            
            try{
              let response = await callback();
              clearInterval(interval);
              resolve(response);
            }catch(error){
              if(tryNumber == retryTimes){
                reject(error)
              }
            }
            tryNumber++;
          }, intervalTime)  
      });
    }

    this.postJson = async function(devKey, body) {
      const bodyString = JSON.stringify(body);
      let signature;
      try{
        signature = await this.auth.generateSignature(devKey, bodyString);
      }catch(e){
        throw new Error("Device OS is not supported")
      }
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': signature,
        },
        body: bodyString,
      };
      return options;
    };

    this.getRequestEndpoint = function(apiMethod, appId, platform) {
      let endpoint;
      if (apiMethod === LOG_EVENT) {
        endpoint = this.endpoints.inAppEndpoint;
      } else {
        if (this.storage.getSessionCount() == 1) {
          endpoint = this.endpoints.firstLaunchEndpoint;
        } else {
          endpoint = this.endpoints.sessionEndpoint;
        }
      }
      return this.utils.buildEndpoint(endpoint, platform, appId);
    };

  }

  
}
