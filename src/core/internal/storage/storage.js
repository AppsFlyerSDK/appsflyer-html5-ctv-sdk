import {APPSFLYER} from '../../utils/constants.js';
import {StorageData} from './storageData.js';

export class LocalStorage {
  constructor() {
    // LocalStorage init
    if (!localStorage[APPSFLYER]) {
      localStorage.setItem(APPSFLYER, JSON.stringify(StorageData));
    }

    this.setLocalStorage = function setLocalStorage(appsflyerID, sessionCount) {
      const storage = this.getStorage();
      storage.sessionCount = sessionCount;

      if (!storage.appsflyerID) {
        storage.appsflyerID = appsflyerID;
      }

      this.setStorage(storage);
    };

    this.setStorage = function setStorage(newData) {
      localStorage.setItem(APPSFLYER, JSON.stringify(newData));
    };

    this.getStorage = function getStorage() {
      return JSON.parse(localStorage.getItem(APPSFLYER));
    };

    this.getAppsFlyerID = function getAppsFlyerID() {
      return this.getStorage().appsflyerID;
    };

    this.getSessionCount = function getSessionCount() {
      return this.getStorage().sessionCount;
    };
  }
}
