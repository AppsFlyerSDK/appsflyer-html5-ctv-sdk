var SAMSUNG_CONFIG = {
    devKey: "RxutGo4bSB9MKkM7bMCjHP",
    appId: "3202204027284",
    isDebug: true,    
    isSandbox: false
};
var LG_CONFIG = {
    devKey: "Jtef5xTpBf9M3rXtRhU2Fd",
    appId: "27022015",
    isDebug: true,    
    isSandbox: false
};
var CUSTOM_CONFIG = {
    devKey: "pJtNoWRvepn9EBtYG4jAUQ",
    appId: "12345678",
    isDebug: true,    
    isSandbox: false
}

function main(){
    AppsFlyerSDK.getInstance().then(function(appsflyer){
        var config = SAMSUNG_CONFIG;
        // config = LG_CONFIG;
        config = CUSTOM_CONFIG;

        appsflyer.init(config).then(function(response){
            console.log("Init API response success: " + response);

            // // Add custom payload
            var customPayload = {
                "device_model": "3920X",
                "device_os_version": "9.3.0",
                "app_version": "1.0.5",
                "device_id": "fa73d67d-f55c-5af3-883a-726253dc7d0e",
            }
            appsflyer.setCustomPayload(customPayload);
            
            appsflyer.start()
                .then(function(response){
                    console.log("start API response success: " + JSON.stringify(response));
                }).catch(function(err){
                    console.log("start API response err: " + JSON.stringify(err));
                });

            appsflyer.logEvent("af_purchase", {"af_revenue" : 1.99, "af_currency": "USD"})
                    .then(function(response){
                        console.log("logEvent API response success: " + JSON.stringify(response));
                    }).catch(function(err){
                        console.log("logEvent API response err: " + JSON.stringify(err));
                    });    

    }).catch(function(err){
        console.log("Init API response err: " + err);
    });
}).catch(function(err){
    console.log("getInstance API response err: " + err);
});
}

main();