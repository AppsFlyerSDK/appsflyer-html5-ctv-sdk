import AppsFlyerSDK from 'appsflyer-html5-ctv-sdk'
import {SAMSUNG_CONFIG, LG_CONFIG, CUSTOM_CONFIG} from './config.js'

async function main(){
    let appsflyer;
    let response;
    let config = SAMSUNG_CONFIG;
    // config = LG_CONFIG;
    // config = CUSTOM_CONFIG;

    try{
        appsflyer = await new AppsFlyerSDK(config);
        // appsflyer = await new AppsFlyerSDK();
        // await appsflyer.init(config);
    }catch(e){
        console.log(e);
    }  
    
    // // Add custom payload
    // let customPayload = {
    //     "device_model": "3920X",
    //     "device_os_version": "9.3.0",
    //     "app_version": "1.0.5",
    //     "device_id": "fa73d67d-f55c-5af3-883a-726253dc7d0e",
    // }
    // appsflyer.setCustomPayload(customPayload);

    try{
        response = await appsflyer.start();
        console.log("start API response success: " + JSON.stringify(response));
    }catch(err){
        console.log("start API response err: " + JSON.stringify(err));
    }

    try{
        response = await appsflyer.logEvent("af_purchase", {"af_revenue" : 1.99, "af_currency": "USD"})
        console.log("logEvent API response success: " + JSON.stringify(response));
    }catch(err){
        console.log("logEvent API response err: " + JSON.stringify(err));
    }

}

main();