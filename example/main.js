import AppsFlyerSDK from 'appsflyer-html5-ctv-sdk'
import {SAMSUNG_CONFIG, LG_CONFIG} from './config.js'

async function main(){
    let appsflyer = new AppsFlyerSDK();
    let config = SAMSUNG_CONFIG;
    // config = LG_CONFIG;

    await appsflyer.init(config);

    appsflyer.start()
        .then((response)=>{
            console.log("start API response success: " + JSON.stringify(response));
        }).catch((err)=>{
            console.log("start API response err: " + JSON.stringify(err));
        });

    appsflyer.logEvent("af_purchase", {"af_revenue" : 1.99, "af_currency": "USD"})
            .then((response)=>{
                console.log("logEvent API response success: " + JSON.stringify(response));
            }).catch((err)=>{
                console.log("logEvent API response err: " + JSON.stringify(err));
            });    
}

main();