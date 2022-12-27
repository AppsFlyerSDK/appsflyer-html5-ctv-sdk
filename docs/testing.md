
# <a id="testing"> Testing the integration


## <a id="logs"> Logs

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


## <a id="response-codes"> Response codes

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

![demo printscreen](https://github.com/AppsFlyerSDK/AppsFlyerSDK-appsflyer-html5-ctv-sdk/blob/main/images/demo.png?raw=true)
