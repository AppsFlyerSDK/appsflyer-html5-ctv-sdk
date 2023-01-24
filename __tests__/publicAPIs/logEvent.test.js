import AppsFlyerCore from '../../src/core/AppsFlyerCore.js';
import {Platforms} from '../mock/platforms.js'
import {MOCK_SUCCESS_RESPONSE, MOCK_FAILED_RESPONSE} from '../mock/responses.js'

let appsflyer, response, timesBeingCalled;
const dataSet = [
    ["af_purchase", {"af_revenue" : 1.99, "af_currency": "USD"}],
    ["af_purchase", null],
    ["af_purchase", undefined],
    ["af_purchase", 0],
    ["af_purchase", {}],
    ["af_purchase", ''],
  ];
  const dataSetCustom = [
    ["af_custom", {"status" : "123", "statusInt": 123}, {"status" : "123", "statusInt": "123"}],
    ["af_custom", "123", {"eventkey": "123"}],
    ["af_purchase", {"af_revenue" : 1.99, "af_currency": "USD", "af_custom":"123"}, {"af_custom":"123"}],
  ];

describe.each(Platforms)("Log event API ", (config, payload) => {
    beforeAll(async () => {
        fetch.resetMocks();
        appsflyer = AppsFlyerCore;
        await appsflyer.init(config, payload);
        timesBeingCalled = 1;
    })

    it.each(dataSet)("succeful response for event_parameters", async (eventName, eventValue) => {
        fetch.mockResponseOnce(JSON.stringify(MOCK_SUCCESS_RESPONSE));
        
        try {
            response = await appsflyer.logEvent(eventName, eventValue)
            payload = appsflyer.payload;
        } catch(err){
            response = err
        };
        expect(response).toEqual(MOCK_SUCCESS_RESPONSE)
        expect(appsflyer.logEventPayload.event_name).toEqual(String(eventName));
        if(appsflyer.logEventPayload.event_parameters == undefined){
            eventValue = undefined;
        }
        expect(appsflyer.logEventPayload.event_parameters).toEqual(eventValue);
        expect(fetch).toHaveBeenCalledTimes(timesBeingCalled);
        timesBeingCalled++;
    });
    it.each(dataSetCustom)("succeful response for event_custom_parameters", async (eventName, eventValue, expectedEventValue) => {
        fetch.mockResponseOnce(JSON.stringify(MOCK_SUCCESS_RESPONSE));
        
        try {
            response = await appsflyer.logEvent(eventName, eventValue)
            payload = appsflyer.payload;
        } catch(err){
            response = err
        };
        expect(response).toEqual(MOCK_SUCCESS_RESPONSE)
        expect(appsflyer.logEventPayload.event_name).toEqual(String(eventName));
        expect(appsflyer.logEventPayload.event_custom_parameters).toEqual(expectedEventValue);
        expect(fetch).toHaveBeenCalledTimes(timesBeingCalled);
        timesBeingCalled++;
    });

    it.each(dataSetCustom)("failed response retry", async (eventName, eventValue, expectedEventValue) => {
        fetch.resetMocks();
        fetch.mockReject(() => Promise.reject(MOCK_FAILED_RESPONSE));
    
        try {
            response = await appsflyer.logEvent(eventName, eventValue)
        } catch(err){
            response = err
        };
    
        expect(response).toEqual(MOCK_FAILED_RESPONSE);
        // retry mechanisem
        timesBeingCalled = 3;
        expect(fetch).toHaveBeenCalledTimes(timesBeingCalled);
    });
})

