<img src="https://github.com/AppsFlyerSDK/appsflyer-html5-ctv-sdk/blob/master/images/CTV.png"  width="400" > 

# appsflyer-html5-ctv-sdk

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/appsflyer-html5-ctv-sdk.svg)](https://badge.fury.io/js/appsflyer-html5-ctv-sdk)
[![Downloads](https://img.shields.io/npm/dm/appsflyer-html5-ctv-sdk.svg)](https://www.npmjs.com/package/appsflyer-html5-ctv-sdk)

🛠 In order for us to provide optimal support, we would kindly ask you to submit any issues to support@appsflyer.com

> *When submitting an issue please specify your AppsFlyer sign-up (account) email , your app ID , production steps, logs, code snippets and any additional relevant information.*

### <a id="plugin-build-for"> This SDK is built for

- <img src="https://github.com/AppsFlyerSDK/appsflyer-html5-ctv-sdk/blob/master/images/tizen.png" alt="drawing" width="15"/> Samsung Tizen
- <img src="https://github.com/AppsFlyerSDK/appsflyer-html5-ctv-sdk/blob/master/images/lg.png" alt="drawing" width="15"/> LG Webos

 ##  📖 Guides
- [Adding the SDK to your project](#installation)
    - [Yarn](#yarn)
    - [appsflyerSdk.bundle.js](#bundle)
- [Platforms dependecy](#platform-dependency)
    - [Samsung](#samsung)
    - [LG](#lg)
- [Initializing the SDK](#integration)
- [Launch event](#launch)
- [In-app Events](#inappevents)
- [Testing the integration](#testing)
    - [Response codes](#response-codes)
- [Sample App](#demo)


#


## <a id="installation"> Adding the SDK to your project


### <a id="yarn"> Yarn

**Please make sure to use npm v16.16.0/yarn v1.21.0 and above!**
  
```
$ yarn add appsflyer-html5-ctv-sdk
```

### <a id="bundle"> appsflyerSdk.bundle.js

Download the appsflyerSdk.bundle.js file from [here](dist/appsflyerSdk.bundle.js), and add it to your index.html file header:

```
<script src="[bundle-js-location]"></script>
```

## <a id="platform-dependency"> Platforms dependecy

In order for the SDK to fetch device data from the relevant platform, make sure to follow the following instructions:


### <a id="samsung"> Samsung

1. Add the following script to your index.html file:

```
<script type="text/javascript" src="$WEBAPIS/webapis/webapis.js"></script>
```

2. Add the following dependecies through Tizen studio:

```
<tizen:privilege name="http://tizen.org/privilege/internet"/>
<tizen:privilege name="http://developer.samsung.com/privilege/productinfo"/>
<tizen:privilege name="http://developer.samsung.com/privilege/adinfo"/>
```

### <a id="lg"> LG

1. Download the [webOSTVjs](https://webostv.developer.lge.com/assets/library/webOSTVjs-v1.2.4.zip) to your project.

2. Add the following script to your index.html file:
```
<script type="text/javascript" src="[webOSTVjs-1.2.4-directory]"></script>
```

 
 ## <a id="integration"> 🚀 Initializing the SDK

Initialize the SDK to enable AppsFlyer to detect installations, sessions (app opens) and updates.<br>

```javascript
import AppsFlyerSDK from 'appsflyer-html5-ctv-sdk'

let appsflyer = new AppsFlyerSDK();
let config = {
    devKey: "RxutGo4bSB9MKkM7bMCjHP",
    appId: "3202204027284",
    isDebug: true, 
    isSandbox: false
}

await appsflyer.init(config);

```

| Setting  | Description   |
| -------- | ------------- |
| devKey   | Your application [devKey](https://support.appsflyer.com/hc/en-us/articles/207032066-Basic-SDK-integration-guide#retrieving-the-dev-key) provided by AppsFlyer (required)  |
| appId      | [App ID](https://support.appsflyer.com/hc/en-us/articles/207377436-Adding-a-new-app#available-in-the-app-store-google-play-store-windows-phone-store) you configured in your AppsFlyer dashboard (required) |
| isDebug    | Show Debug logs - set to `true` for testing only!  |
| isSandbox    | Send events to sandbox endpoints - set to `true` for testing only!  |


## <a id="launch"> Launch event

 ```javascript
appsflyer.start()
    .then((response)=>{
        console.log("start API response success: " + JSON.stringify(response));
    }).catch((err)=>{
        console.log("start API response err: " + JSON.stringify(err));
    });
 ```


## <a id="inappevents"> In-app events

**<a id="logEvent"> `logEvent(String eventName, Object eventValues)`**

| parameter    | type     | description                                   |
| -----------  |----------|------------------------------------------     |
| eventName    | String   | The event name, it is presented in your dashboard. |
| eventValues  | Object     | The event values that are sent with the event. |

 ```javascript
appsflyer.logEvent("af_purchase", {"af_revenue" : 1.99, "af_currency": "USD"})
        .then((response)=>{
            console.log("logEvent API response success: " + JSON.stringify(response));
        }).catch((err)=>{
            console.log("logEvent API response err: " + JSON.stringify(err));
        });  
 ```

## <a id="testing"> Testing the integration

- In order to check a succesful integration of the AppsFlyer SDK, please enable `isDebug` option to `true`;

- The following request should be sent:

```
// launch request:

AppsFlyerSDK ::  Sending start request
AppsFlyerSDK ::  https://events.appsflyer.com/v1.0/c2s/session/app/tizen/3202204027284
AppsFlyerSDK ::  {"device_ids":[{"type":"custom","value":"c6577bb9-d4d1-4adf-809e-c3abf7c76b58"}],"limit_ad_tracking":true,"device_model":"UKS9000","device_os_version":"5.0","customer_user_id":"15667737-366d-4994-ac8b-653fe6b2be4a","app_version":"1.0.5","request_id":"aa64ea40-6cda-4fde-b4c5-31f600e1b50f","timestamp":1662035187532}

// logEvent request:
AppsFlyerSDK ::  Sending logEvent request
AppsFlyerSDK ::  https://events.appsflyer.com/v1.0/c2s/inapp/app/tizen/3202204027284
AppsFlyerSDK ::  {"device_ids":[{"type":"custom","value":"c6577bb9-d4d1-4adf-809e-c3abf7c76b58"}],"limit_ad_tracking":true,"device_model":"UKS9000","device_os_version":"5.0","customer_user_id":"15667737-366d-4994-ac8b-653fe6b2be4a","app_version":"1.0.5","request_id":"c55bb0fe-fed5-4c02-8e5d-c6031f56ecaf","timestamp":1662035187534,"event_name":"af_purchase","event_parameters":{"af_revenue":1.99,"af_currency":"USD"}}

```


- Check the response code is 202/200

```
AppsFlyerSDK ::  start request success with status code: 202 Message: Success
AppsFlyerSDK ::  logEvent request success with status code: 202 Message: Success
```

### <a id="response-codes"> Response codes

| response code | description                                   |
| -----------   |------------------------------------------     |
| 200/202     | Successful |
| 400   | In case the authentication succeeded, if any of the mandatory fields in the message body are missing, or if any of the fields are invalid|
| 401   | If the app doesn’t exist or the authentication failed |
| 403   | In case app traffic should be blocked due to Zero package limit |
| 404   | network error |

## <a id="demo"> Sample app

Try our demo app! 

1. Clone the repo

2. Comment/uncomment the relevant config file for the relevant platform in example/main.js (LG/SAMSUNG)

3. Execute the following:

```bash
$ yarn buildDev
```

Open and run the following directory from your emulator/simulator or real device:

```
appsflyer-html5-ctv-sdk/example/app
```

![demo printscreen](https://github.com/AppsFlyerSDK/appsflyer-html5-ctv-sdk/blob/master/images/demo.png)
