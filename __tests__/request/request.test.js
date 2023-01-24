import AppsFlyerCore from '../../src/core/AppsFlyerCore.js';
import {Endpoints} from '../../src/core/internal/http/endpoints.js';
import {Platforms} from '../mock/platforms.js'

let appsflyer, appId, platformType, endpoints;

describe.each(Platforms)("Test endpoints", (config, payload) => {
    beforeAll(async () => {
        global.localStorage.setItem('appsflyer', '{"sessionCount":0,"appsflyerID":""}')
        appId = config.appId;
        platformType = payload.platform;
        appsflyer = AppsFlyerCore;
        await appsflyer.init(config, payload);

        // define endpoints
        endpoints = new Endpoints(false);
        if(config.isSandbox){
            endpoints = new Endpoints(true);
        }
    })

    test("start - first session", () => {
        let endpoint = appsflyer.requests.getRequestEndpoint("start", appId, platformType);
        expect(endpoint).toEqual(endpoints.baseEndpoint + "first_open/app/"+platformType + "/" + appId)
    });        
    
    test("start", () => {
        global.localStorage.setItem('appsflyer', '{"sessionCount":2,"appsflyerID":""}')
        let endpoint = appsflyer.requests.getRequestEndpoint("start", appId, platformType);
        expect(endpoint).toEqual(endpoints.baseEndpoint + "session/app/"+platformType + "/" + appId)
    });

    test("logEvent", () => {
        let endpoint = appsflyer.requests.getRequestEndpoint("logEvent", appId, platformType);
        expect(endpoint).toEqual(endpoints.baseEndpoint + "inapp/app/" + platformType + "/" + appId)
    });
});

