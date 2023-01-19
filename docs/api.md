# <a id="other-platforms"> 📑 API

## <a id="init"> Init

**<a id="init"> `init(Object config)`**

Initalization of the SDK 


| Setting  | Description   |
| -------- | ------------- |
| devKey   | Your application [devKey](https://support.appsflyer.com/hc/en-us/articles/207032066-Basic-SDK-integration-guide#retrieving-the-dev-key) provided by AppsFlyer (required)  |
| appId      | [App ID](https://support.appsflyer.com/hc/en-us/articles/207377436-Adding-a-new-app#available-in-the-app-store-google-play-store-windows-phone-store) you configured in your AppsFlyer dashboard (required) |
| isDebug    | Show Debug logs - set to `true` for testing only!  |
| isSandbox    | Send events to sandbox endpoints - set to `true` for testing only!  |


 ```javascript
let config = {
    devKey: "RxutGo4bSB9MKkM7bMCjHP",
    appId: "3202204027284",
    isDebug: true, 
    isSandbox: false
}

try{  
    await appsflyer.init(config);
}catch(e){
    console.log(e);
}  
```

## <a id="launch"> Launch event

**<a id="start"> `start()`**

Send session to our servers


 ```javascript
try{
    let response = await appsflyer.start();
    console.log("start API response success: " + JSON.stringify(response));
}catch(err){
    console.log("start API response err: " + JSON.stringify(err));
}
 ```


## <a id="inappevents"> In-app events

**<a id="logEvent"> `logEvent(String eventName, Object eventValues)`**
| parameter    | type     | description                                   |
| -----------  |----------|------------------------------------------     |
| eventName    | String   | The event name, it is presented in your dashboard. |
| eventValues  | Object     | The event values that are sent with the event. |

Send in-app event


 ```javascript
    try{
        let response = await appsflyer.logEvent("af_purchase", {"af_revenue" : 1.99, "af_currency": "USD"})
        console.log("logEvent API response success: " + JSON.stringify(response));
    }catch(err){
        console.log("logEvent API response err: " + JSON.stringify(err));
    }
 ```

## <a id="setCustomPayload"> Set custom payload

**<a id="setCustomPayload"> `setCustomPayload(Object customPayload)`**

Add custom payload. [You could use it to integrate other platforms](/docs/other-platforms.md)


 ```javascript
    let customPayload = {
        "device_model": "3920X",
        "device_os_version": "9.3.0",
        "app_version": "1.0.5",
        "device_id": "fa73d67d-f55c-5af3-883a-726253dc7d0e",
    }

    appsflyer.setCustomPayload(customPayload);
 ```

 ## <a id="setCustomerUserId"> Set customer user Id

**<a id="setCustomerUserId"> `setCustomerUserId(string customerUserId)`**

Add customer user id. This will add `customer_user_id` key to the payload.


 ```javascript
    appsflyer.setCustomerUserId("123");
 ```