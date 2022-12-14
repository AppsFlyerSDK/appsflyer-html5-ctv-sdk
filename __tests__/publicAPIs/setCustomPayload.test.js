import AppsFlyerCore from '../../src/core/AppsFlyerCore.js';
import {Platforms} from '../mock/platforms.js'

let appsflyer, response;
const dataSet = [
    {
        custom1: "custom1",
        custom2: {custom: "test"},
    },
    {},
    null,
    undefined,
  ];
  
  const dataSetBadInput = [
    {
        device_model: "test",
        device_os_version: "test",
        timestamp: 123
    },
  ];

describe.each(Platforms)("setCustomPayload API ", (config, payload) => {
    beforeAll(async () => {
        appsflyer = AppsFlyerCore.prototype.getInstance();
        await appsflyer.init(config, payload);
    })

    it.each(dataSet)("setCustomPayload inputs", (additionalPayload) => { 
        let payload;       
        try {
            response = appsflyer.setCustomPayload(additionalPayload);
            payload = appsflyer.payload;
        } catch(err){
            response = err
        };

        if(additionalPayload){
            Object.keys(additionalPayload).forEach((key) => {
                if(payload.hasOwnProperty(key)){
                    expect(payload[key]).toEqual(additionalPayload[key]);
                }
            })
        }
    });
    
    it.each(dataSetBadInput)("setCustomPayload not overriding exsiting inputs", (additionalPayload) => { 
        let payload;       
        try {
            response = appsflyer.setCustomPayload(additionalPayload);
            payload = appsflyer.payload;
        } catch(err){
            response = err
        };

        Object.keys(additionalPayload).forEach((key) => {
            expect(payload[key]).not.toEqual(additionalPayload[key]);
        })
    });
})

