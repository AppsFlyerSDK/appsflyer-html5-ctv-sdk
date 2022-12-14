// local storage
class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  
  global.localStorage = new LocalStorageMock;

// crypto
  import crypto from "crypto";

  Object.defineProperty(global, "crypto", {
    value: {
      subtle: crypto.webcrypto.subtle,
    },
  });

  // enable mocks
  import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();