const protocol = 'https';
const sandboxhost = 'sandbox-events.appsflyer.com';
const host = 'events.appsflyer.com';
const version = 'v1.0';
const type = 'c2s';
const suffix = '/app/';

export class Endpoints {
    constructor(isSandbox){
        this.baseEndpoint = protocol + '://' + (isSandbox ? sandboxhost: host) + '/' + version + '/' + type + '/';
        this.sessionEndpoint = this.baseEndpoint + 'session' + suffix;
        this.firstLaunchEndpoint = this.baseEndpoint + 'first_open' + suffix;
        this.inAppEndpoint = this.baseEndpoint + 'inapp' + suffix;
    }
}
