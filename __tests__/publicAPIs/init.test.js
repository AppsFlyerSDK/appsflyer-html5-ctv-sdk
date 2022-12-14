import AppsFlyerCore from '../../src/core/AppsFlyerCore.js';
import {Platforms} from '../mock/platforms.js'
import {INVALID_APP_ID, INVALID_DEV_KEY} from '../../src/core/utils/constants.js'

let appsflyer;
const dataSetBadInputs = [
    [{
        appId: "",
        devKey: "123",
        isDebug: false
    }, INVALID_APP_ID],
    [{
        appId: "123",
        devKey: "",
        isDebug: false
    }, INVALID_DEV_KEY],
    [{
        appId: "",
        devKey: "",
        isDebug: false
    }, INVALID_APP_ID],
    [{
        appId: "",
        devKey: "",
        isDebug: false,
        isSandbox: true
    }, INVALID_APP_ID],    
    [{}, INVALID_APP_ID],
];

describe.each(Platforms)("Init API", (config, payload) => {
    beforeAll(async () => {
        appsflyer = AppsFlyerCore.prototype.getInstance();
        await appsflyer.init(config, payload);
    })

    test("config", () => {
        expect(config).toEqual(appsflyer.appsFlyerOptions)
    });
    test("platformPayload", () => {
        expect(payload.payload).toEqual(appsflyer.payload)
    });    
    test("first session count", () => {
        global.localStorage.setItem('appsflyer', '{"sessionCount":0,"appsflyerID":""}')
        expect(appsflyer.sessionCount).toEqual(1)
    });
});

describe("Init wrong config", (_, payload) => {
    beforeAll(async () => {
        appsflyer = AppsFlyerCore.prototype.getInstance();
    })

    it.each(dataSetBadInputs)("Bad inputs", async (config, expectedErr) => {
        await expect(async () => await appsflyer.init(config, payload)).rejects.toThrowError(expectedErr);
    });
   
});

