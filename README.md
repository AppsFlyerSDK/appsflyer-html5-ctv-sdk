<img src="https://github.com/AppsFlyerSDK/AppsFlyerSDK-appsflyer-html5-ctv-sdk/blob/main/images/CTV.png?raw=true"  width="400" > 

# appsflyer-html5-ctv-sdk

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/appsflyer-html5-ctv-sdk.svg)](https://badge.fury.io/js/appsflyer-html5-ctv-sdk)
[![Downloads](https://img.shields.io/npm/dm/appsflyer-html5-ctv-sdk.svg)](https://www.npmjs.com/package/appsflyer-html5-ctv-sdk)

🛠 In order for us to provide optimal support, we would kindly ask you to submit any issues to support@appsflyer.com

> *When submitting an issue please specify your AppsFlyer sign-up (account) email , your app ID , production steps, logs, code snippets and any additional relevant information.*

### <a id="plugin-build-for"> This SDK is built for

- <img src="https://github.com/AppsFlyerSDK/AppsFlyerSDK-appsflyer-html5-ctv-sdk/blob/main/images/tizen.png?raw=true" alt="drawing" width="15"/> Samsung Tizen
- <img src="https://github.com/AppsFlyerSDK/AppsFlyerSDK-appsflyer-html5-ctv-sdk/blob/main/images/lg.png?raw=true" alt="drawing" width="15"/> LG Webos
- VIZIO & Vidaa. [Check the implementation guide for these specific platforms here](/docs/other-platforms.md)
 ##  📖 Guides
- [Adding the SDK to your project](#installation)
    - [Yarn](#yarn)
    - [appsflyerSdk.bundle.js](#bundle)
- [Platforms dependecy](#platform-dependency)
    - [Samsung](#samsung)
    - [LG](#lg)
- [Support for other platforms](/docs/other-platforms.md)
- [Basic implemantation of the SDK](#integration)
- [API](/docs/api.md)
    - [Init](/docs/api.md#init)
    - [Start](/docs/api.md#start)
    - [In-app events](/docs/api.md#inappevents)
    - [Set custom payload](/docs/api.md#setCustomPayload)
    - [Set customer user Id](/docs/api.md#setCustomerUserId)
- [Testing the integration](/docs/testing.md)
    - [Logs](/docs/testing.md#logs)
    - [Response codes](/docs/testing.md#response-codes)
    - [Sample App](/docs/testing.md#demo)


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

## <a id="platform-dependency"> Platform dependency

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

 ## <a id="integration"> 🚀 Basic implemantation of the SDK

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

appsflyer.start()
    .then((response)=>{
        console.log("start API response success: " + JSON.stringify(response));
    }).catch((err)=>{
        console.log("start API response err: " + JSON.stringify(err));
    });
```