import AppsFlyerCore from '../../src/core/AppsFlyerCore.js';
import {CUSTOMER_USER_ID} from '../../src/core/utils/constants.js';
import {Platforms} from '../mock/platforms.js'

let appsflyer, response;

const dataSet = [
    123,
    123-323-12-23,
    "123-323-12-23",
    "123",
    "",
    undefined,
    null,
  ];

describe.each(Platforms)("setCustomerUserId API ", (config, payload) => {
    beforeAll(async () => {
        appsflyer = AppsFlyerCore.prototype.getInstance();
        await appsflyer.init(config, payload);
    })

    it.each(dataSet)("setCustomerUserId inputs", (userID) => {        
        try {
            response = appsflyer.setCustomerUserId(userID);
            payload = appsflyer.payload;
        } catch(err){
            response = err
        };
        expect(appsflyer.payload[CUSTOMER_USER_ID]).toEqual(userID);
    });
})

