// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

jest.setTimeout(30000)


type cookieType = {
    get: () => string,
    set: (key: string) => void,
}
let __cookies: cookieType;
Object.defineProperty( window.document, 'cookie', {
    get: () => __cookies,
    set: v => __cookies = v,
} );


const sessionStorageMock = (function() {
    let store: {key: string, value: string} | any = {};
    
    return {
      getItem(key: string) {
        return store[key];
      },
   
      setItem(key: string, value: string) {
        store[key] = value;
      },
    
      clear() {
        store = {};
      },
  
      removeItem(key: string) {
        delete store[key];
      },
       
      getAll() {
        console.log(store);
      }
    };
})();

Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });