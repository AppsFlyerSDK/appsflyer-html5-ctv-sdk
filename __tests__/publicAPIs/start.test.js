import AppsFlyerCore from '../../src/core/AppsFlyerCore.js';
import {Platforms} from '../mock/platforms.js'
import {MOCK_SUCCESS_RESPONSE, MOCK_FAILED_RESPONSE} from '../mock/responses.js'

let appsflyer, response;
jest.setTimeout(7000)

describe.each(Platforms)("Start API", (config, payload) => {
    beforeAll(async () => {
        fetch.resetMocks();
        appsflyer = AppsFlyerCore;
        await appsflyer.init(config, payload);
    })

    it("succeful response", async () => {
        fetch.mockResponseOnce(JSON.stringify(MOCK_SUCCESS_RESPONSE));
        
        try {
            response = await appsflyer.start()
        } catch(err){
            response = err
        };
        expect(response).toEqual(MOCK_SUCCESS_RESPONSE)
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("failed response", async () => {
        fetch.resetMocks();
        fetch.mockReject(() => Promise.reject(MOCK_FAILED_RESPONSE));
        
        try {
            response = await appsflyer.start()
        } catch(err){
            response = err
        };
        
        expect(response).toEqual(MOCK_FAILED_RESPONSE);
        expect(fetch).toHaveBeenCalledTimes(3);
    });
});

