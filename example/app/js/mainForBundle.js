const SAMSUNG_CONFIG = {
    devKey: "RxutGo4bSB9MKkM7bMCjHP",
    appId: "3202204027284",
    isDebug: true,    
    isSandbox: false
};
const LG_CONFIG = {
    devKey: "Jtef5xTpBf9M3rXtRhU2Fd",
    appId: "27022015",
    isDebug: true,    
    isSandbox: false
};

async function main(){
    let appsflyer = AppsFlyerSDK.getInstance();
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