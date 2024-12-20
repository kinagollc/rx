import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export interface FirebaseConfig {
  apiKey: string,
  authDomain: string,
  databaseURL: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  webApplicationId: string,
  appId: string
}

export interface AppConfig {
  appName: string;
  apiBase: string;
  googleApiKey: string;
  consumerKey: string;
  consumerSecret: string;
  adminUsername: string;
  adminPassword: string;
  oneSignalAppId: string;
  oneSignalGPSenderId: string;
  paypalSandbox: string;
  paypalProduction: string;
  payuSalt: string;
  payuKey: string;
  availableLanguages: Array<any>;
  firebaseConfig: FirebaseConfig;
  demoMode: boolean;
}

export const BaseAppConfig: AppConfig = {
  appName: "RX Stat",
  apiBase: "https://rxstat.io/",
  googleApiKey: "AIzaSyB8bQgLfIw3FszUfLV8fZqhgkuKrhj0S_Q",
  consumerKey: "ck_fccf464b199306aadd1baad5208e38c15be33421",
  consumerSecret: "cs_8b38efb11be693f7a653a7307f2f1529be33948e",
  adminUsername: "appadmin",
  adminPassword: "!RxStAt123316!",
  oneSignalAppId: "c5db2fab-35d2-474a-bfcc-36bf3704bf02",
  oneSignalGPSenderId: "903880668033",
  paypalSandbox: "xxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  paypalProduction: "",
  payuSalt: "xxxxxxxxx",
  payuKey: "xxxxxx",

  availableLanguages: [{
    code: 'en',
    name: 'English'
  }, {
    code: 'ar',
    name: 'Arabic'
  }, {
    code: 'es',
    name: 'Spanish'
  }, {
    code: 'fr',
    name: 'French'
  }, {
    code: 'pt',
    name: 'Portuguese'
  }],
 demoMode: false,
  firebaseConfig: {
  webApplicationId: "747934766850-ikgkpd04pbml8pofj4kgra80em4uibpj.apps.googleusercontent.com",
  apiKey: "AIzaSyCt7wsFMv7YjlfH6jlUAhwdWfY5jopOSDc",
  authDomain: "rx-customer-new.firebaseapp.com",
  databaseURL: "https://rx-customer-new-default-rtdb.firebaseio.com/",
  projectId: "rx-customer-new",
  storageBucket: "rx-customer-new.appspot.com",
  messagingSenderId: "747934766850",
  appId: "1:747934766850:web:e78aa4033399444b0a541b"
  }
};