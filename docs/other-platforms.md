# <a id="other-platforms"> Support for other platforms

AppsFlyerSDK support the following platforms:
- Vizio
- Vidaa

In order to initalized the SDK:

1. Initalize the SDK as explained.

2. Add the following params using the `setCustomPayload` API:
- device_model
- device_os_version
- device_id
- app_version

These fields are manadatory! 
Make sure to provide them using the relevant platform APIs. A missing field will cause `400` response code by the SDK.

```javascript
import AppsFlyerSDK from 'appsflyer-html5-ctv-sdk'

let appsflyer;
let response;
let config = {
    devKey: DEV_KEY,
    appId: APP_ID,
    isDebug: true, 
    isSandbox: false
}

try{
    appsflyer = await new AppsFlyerSDK(config);
}catch(e){
    console.log(e);
}  

// Get the params using the relevant platform APIs and a provide the JSON object
let customPayload = {
    "device_model": "3920X",
    "device_os_version": "9.3.0",
    "app_version": "1.0.5",
    "device_id": "fa73d67d-f55c-5af3-883a-726253dc7d0e",
}
// Call the API
appsflyer.setCustomPayload(customPayload);

try{
    response = await appsflyer.start();
    console.log("start API response success: " + JSON.stringify(response));
}catch(err){
    console.log("start API response err: " + JSON.stringify(err));
}
```
 