import { Component, ViewChild, Inject } from '@angular/core';
import { Nav, Platform, AlertController, Events, IonicApp, MenuController, ToastController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoryPage } from '../pages/category/category';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { My_accountPage } from '../pages/my_account/my_account';
import { Myorder_2Page } from '../pages/myorder_2/myorder_2';
import { CartPage } from '../pages/cart/cart';
import { AddressSelectPage } from '../pages/addressselect/addressselect';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TranslateService } from '../../node_modules/@ngx-translate/core';
import { WordpressClient } from '../providers/wordpress-client.service';
import { Subscription } from "rxjs/Subscription";
import { AuthResponse } from "../models/auth-response.models";
import { AuthCredential } from "../models/auth-credential.models";
import { Constants } from "../models/constants.models";
import { Category } from "../models/category.models";
import { PaymentGateway } from "../models/payment-gateway.models";
import { UserResponse } from "../models/user-response.models";
import { Currency } from "../models/currency.models";
import { OneSignal } from '@ionic-native/onesignal';
import { AppConfig, APP_CONFIG } from './app.config';
import { HelpPage } from '../pages/help/help';
import { Walkthough_1Page } from '../pages/walkthough_1/walkthough_1';
import { ManagelanguagePage } from '../pages/managelanguage/managelanguage';
import { Chat } from '../models/chat.models';
import { ChatsPage } from '../pages/chats/chats';
import { Contact_usPage } from '../pages/contact_us/contact_us';
import { ShippingZone } from '../models/shipping-zone.models';
import { ShippingZoneLocation } from '../models/shipping-zone-location.models';
import firebase from 'firebase';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Vt_popupPage } from '../pages/vt_popup/vt_popup';

@Component({
  templateUrl: 'app.html',
  providers: [WordpressClient]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  private subscriptions: Array<Subscription> = [];
  private user: UserResponse;
  private userAdmin: UserResponse;
  private rtlSide: string = "left";

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private ionicApp: IonicApp, private toastCtrl: ToastController,
    private oneSignal: OneSignal, private events: Events, private alertCtrl: AlertController, private modalCtrl: ModalController,
    private service: WordpressClient, private platform: Platform, private menu: MenuController, public inAppBrowser: InAppBrowser
    , private statusBar: StatusBar, private splashScreen: SplashScreen, private translate: TranslateService) {
    let superAuth = "";
    if (config.apiBase && config.apiBase.startsWith('https') && config.consumerKey && config.consumerKey.length && config.consumerSecret && config.consumerSecret.length) {
      superAuth = ("Basic " + btoa(config.consumerKey + ":" + config.consumerSecret));
      window.localStorage.setItem(Constants.ADMIN_API_KEY, superAuth);
      this.onSuperAuthSetup(superAuth);
    } else if (config.apiBase && config.apiBase.startsWith('http:') && config.adminUsername && config.adminUsername.length && config.adminPassword && config.adminPassword.length) {
      let subscription: Subscription = service.getAuthToken(new AuthCredential(config.adminUsername, config.adminPassword)).subscribe(data => {
        let authResponse: AuthResponse = data;
        superAuth = ("Bearer " + authResponse.token);
        window.localStorage.setItem(Constants.ADMIN_API_KEY, superAuth);
        this.onSuperAuthSetup(superAuth);
      }, err => {
        console.log('auth setup error');
      });
      this.subscriptions.push(subscription);
    } else {
      console.log('auth setup error');
    }

    this.setupEvents();
    this.initializeApp();
    if (this.config.demoMode) {
      setTimeout(() => {
        let modal = modalCtrl.create(Vt_popupPage);
        modal.onDidDismiss((data) => { });
        modal.present();
      }, 15000)
    }
  }

  onSuperAuthSetup(superAuth) {
    console.log('auth setup success:', superAuth);
    this.loadCurrency();
    this.loadParentCategories();
    this.loadPaymentGateways();
    this.loadShipping();
    this.loadSettings();
  }

  loadSettings() {
    let subscription: Subscription = this.service.getSettings(window.localStorage.getItem(Constants.ADMIN_API_KEY)).subscribe(data => {
      window.localStorage.setItem(Constants.SETTINGS, JSON.stringify(data));
      console.log('settings setup success');
    }, err => {
      console.log('settings setup error');
    });
    this.subscriptions.push(subscription);
  }

  setupEvents() {
    this.events.subscribe('language:selection', (language) => {
      this.globalize(language);
    });
    this.events.subscribe('user:login', (user) => {
      this.user = user;
      this.setupAvtar();
      if (this.platform.is('cordova') && this.user) this.updatePlayerId();
    });
    this.events.subscribe("goto", (to) => {
      if (to == "chatting") {
        this.chatting();
      }
    });
  }

  setupAvtar() {
    if (this.user && this.user.avatar_url && (this.user.avatar_url.includes("gravatar.com") || this.user.avatar_url.includes("avatar"))) this.user.avatar_url = null;
    if (this.user && this.user.meta_data) {
      for (let meta of this.user.meta_data) {
        if (meta.key == "avatar_url" && meta.value && meta.value.length) {
          this.user.avatar_url = meta.value;
          break;
        }
      }
    }
  }

  updatePlayerId() {
    this.oneSignal.getIds().then((id) => {
      if (id && id.userId) {
        firebase.database().ref(Constants.REF_USERS_FCM_IDS).child((this.user.id + "customer")).set(id.userId);
        this.subscriptions.push(this.service.registerForPushNotification(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(this.user.id), id.userId).subscribe(data => console.log(data), err => console.log(err)));
      }
    });
  }

  loadCurrency() {
    let subscription: Subscription = this.service.currencies(window.localStorage.getItem(Constants.ADMIN_API_KEY)).subscribe(data => {
      let currency: Currency = data;
      window.localStorage.setItem(Constants.CURRENCY, JSON.stringify(currency));
      console.log('currency setup success');
    }, err => {
      console.log('currency setup error');
    });
    this.subscriptions.push(subscription);
  }

  loadShipping() {
    // let selectedShippingMethod: ShippingMethod = JSON.parse(window.localStorage.getItem(Constants.SELECTED_SHIPPING_METHOD));
    // if (selectedShippingMethod) {
    //   console.log('selectedShippingMethod', selectedShippingMethod);
    //   let subscription1: Subscription = this.service.shippingMethod(window.localStorage.getItem(Constants.ADMIN_API_KEY), selectedShippingMethod.method_id).subscribe(data => {
    //     window.localStorage.setItem(Constants.SELECTED_SHIPPING_METHOD, JSON.stringify(data));
    //   }, err => {
    //     console.log('ErrShippingmethod', err);
    //   });
    //   this.subscriptions.push(subscription1);
    // }
    let subscription2: Subscription = this.service.shippingZones(window.localStorage.getItem(Constants.ADMIN_API_KEY)).subscribe(data => {
      let shippingZones: Array<ShippingZone> = data;
      console.log('shippingZones', shippingZones);
      let shippingZoneLocations = new Array<ShippingZoneLocation>();
      let timesReturned = 0;
      for (let sz of shippingZones) {
        let subscription3: Subscription = this.service.shippingZoneLocations(window.localStorage.getItem(Constants.ADMIN_API_KEY), sz.id).subscribe(data => {
          shippingZoneLocations = shippingZoneLocations.concat(data);
          timesReturned = timesReturned + 1;
          if (timesReturned == shippingZones.length) {
            window.localStorage.setItem(Constants.SHIPPING_ZONE_LOCATIONS, JSON.stringify(shippingZoneLocations));
            console.log('shippingZoneLocations', shippingZoneLocations);
            console.log('shippingZoneLocations setup done');
          }
        }, err => {
          timesReturned = timesReturned + 1;
          if (timesReturned == shippingZones.length) {
            console.log('ErrShippingZoneLocation', err);
          }
        });
        this.subscriptions.push(subscription3);
      }
    }, err => {
      console.log('ErrShippingZone', err);
    });
    this.subscriptions.push(subscription2);
  }

  loadPaymentGateways() {
    let subscription: Subscription = this.service.paymentGateways(window.localStorage.getItem(Constants.ADMIN_API_KEY)).subscribe(data => {
      let paymentGateway: Array<PaymentGateway> = data;
      window.localStorage.setItem(Constants.PAYMENT_GATEWAYS, JSON.stringify(paymentGateway));
      console.log('payment-gateway setup success');
    }, err => {
      console.log('categories setup error');
    });
    this.subscriptions.push(subscription);
  }

  loadParentCategories() {
    let subscription: Subscription = this.service.categoriesParent(window.localStorage.getItem(Constants.ADMIN_API_KEY)).subscribe(data => {
      let categories: Array<Category> = data;
      window.localStorage.setItem(Constants.PRODUCT_CATEGORIES_PARENT, JSON.stringify(categories));
      console.log('categories setup success');
      this.walkThroughOrHome();
    }, err => {
      console.log('categories setup error');
    });
    this.subscriptions.push(subscription);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.show();
      firebase.initializeApp({
        apiKey: this.config.firebaseConfig.apiKey,
        authDomain: this.config.firebaseConfig.authDomain,
        databaseURL: this.config.firebaseConfig.databaseURL,
        projectId: this.config.firebaseConfig.projectId,
        storageBucket: this.config.firebaseConfig.storageBucket,
        messagingSenderId: this.config.firebaseConfig.messagingSenderId
      });

      // try {
      //   if (this.device.model) {
      //     this.deviceModel = this.device.model.replace(/\s/g, '').replace(',', '').toLowerCase();
      //     // iphone model nos. https://gist.github.com/adamawolf/3048717
      //     if (this.deviceModel.indexOf("iphone103") != -1 || this.deviceModel.indexOf("iphone106") != -1 || this.deviceModel.indexOf("iphonex") != -1) {
      //       this.deviceModel = "iphonex";
      //     }
      //   }
      // } catch (exception) {
      //   console.log(exception);
      // }

      this.user = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
      this.setupAvtar();
      if (this.platform.is('cordova')) this.initOneSignal();
      setTimeout(() => {
        let categories: Array<Category> = JSON.parse(window.localStorage.getItem(Constants.PRODUCT_CATEGORIES_PARENT));
        if (categories && categories.length) this.walkThroughOrHome();
        if (this.platform.is('cordova') && this.user) this.updatePlayerId();

        //after basic init
        const component = this;
        firebase.database().ref(Constants.REF_ADMIN_USER).on("value", function (snap) {
          component.userAdmin = snap.val();
        });
      }, 3000);

      if (this.platform.is('cordova')) {
        this.initOneSignal();
        this.updatePlayerId();
      }
      let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
      this.globalize(defaultLang);
      this.platform.registerBackButtonAction(() => {
        if (this.menu.isOpen()) {
          this.menu.close();
        } else {
          const overlayView = this.ionicApp._overlayPortal._views[0];
          if (overlayView && overlayView.dismiss) {
            overlayView.dismiss();// it will close the modals, alerts
          } else if (this.nav.canGoBack()) {
            this.nav.pop();
          } else if (this.nav.getActive().instance instanceof HomePage) {
            this.platform.exitApp();
          } else {
            this.homePage();
          }
        }
      }, 1);
    });
  }

  globalize(languagePriority) {
    this.translate.setDefaultLang("en");
    let defaultLangCode = this.config.availableLanguages[0].code;
    this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    window.localStorage.setItem(Constants.KEY_LOCALE, languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
  }

  setDirectionAccordingly(lang: string) {
    switch (lang) {
      case 'ar': {
        this.platform.setDir('ltr', false);
        this.platform.setDir('rtl', true);
        this.rtlSide = "right";
        break;
      }
      default: {
        this.platform.setDir('rtl', false);
        this.platform.setDir('ltr', true);
        this.rtlSide = "left";
        break;
      }
    }
    // this.translate.use('ar');
    // this.platform.setDir('ltr', false);
    // this.platform.setDir('rtl', true);
  }

  getSuitableLanguage(language) {
    language = language.substring(0, 2).toLowerCase();
    console.log('check for: ' + language);
    return this.config.availableLanguages.some(x => x.code == language) ? language : 'en';
  }

  initOneSignal() {
    if (this.config.oneSignalAppId && this.config.oneSignalAppId.length && this.config.oneSignalGPSenderId && this.config.oneSignalGPSenderId.length) {
      this.oneSignal.startInit(this.config.oneSignalAppId, this.config.oneSignalGPSenderId);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe((data) => {
        // do something when notification is received
        console.log("handleNotificationReceived", data);
      });
      this.oneSignal.handleNotificationOpened().subscribe((data) => {
        console.log("handleNotificationOpened", data);
        if (data.notification && data.notification.payload && data.notification.payload.additionalData && data.notification.payload.additionalData.msgs) {
          this.chatting();
        } else {
          this.myOrders();
        }
      });
      this.oneSignal.endInit();
    }
  }

  actionNavHeader(tab) {
    this.nav.setRoot(My_accountPage, { tab: tab });
  }

  phonenumberPage() {
    if (this.user) {
      this.logoutAlert();
    } else {
      if (!(this.nav.getActive().instance instanceof LoginPage))
        this.nav.push(LoginPage);
    }
  }

  logoutAlert() {
    this.translate.get(['logout', 'logout_message', 'no', 'yes']).subscribe(text => {
      let alert = this.alertCtrl.create({
        title: text['logout'],
        message: text['logout_message'],
        buttons: [{
          text: text['no'],
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: text['yes'],
          handler: () => {
            this.user = null;
            window.localStorage.removeItem(Constants.USER_KEY);
            window.localStorage.removeItem(Constants.USER_API_KEY);
            window.localStorage.removeItem(Constants.SELECTED_ADDRESS);
            window.localStorage.removeItem(Constants.SELECTED_ADDRESS_LIST);
            this.homePage();
          }
        }]
      });
      alert.present();
    });
  }

  walkThroughOrHome() {
    if (window.localStorage.getItem(Constants.WALKTHROUGH_SHOWN)) {
      this.homePage();
    } else {
      this.walkthroughPage();
    }
    this.splashScreen.hide();
  }

  walkthroughPage() {
    if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof Walkthough_1Page))
      this.nav.setRoot(Walkthough_1Page);
  }

  loginPage() {
    if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof LoginPage))
      this.nav.setRoot(LoginPage);
  }

  manageLanguage() {
    if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof ManagelanguagePage))
      this.nav.setRoot(ManagelanguagePage);
  }

  myOrders() {
    if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof Myorder_2Page))
      this.nav.setRoot(Myorder_2Page);
  }

  addressPage() {
    if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof AddressSelectPage))
      this.nav.setRoot(AddressSelectPage);
  }

  my_accountPage() {
    if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof My_accountPage))
      this.nav.setRoot(My_accountPage);
  }

  categoryPage() {
    if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof CategoryPage))
      this.nav.setRoot(CategoryPage);
  }

  homePage() {
    if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof HomePage))
      this.nav.setRoot(HomePage);
  }

  wishlistPage() {
    if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof WishlistPage))
      this.nav.setRoot(WishlistPage);
  }

  cartPage() {
    if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof CartPage))
      this.nav.setRoot(CartPage);
  }

  helpPage(fieldname) {
    let settings = JSON.parse(window.localStorage.getItem(Constants.SETTINGS));
    if (settings) {
      this.nav.setRoot(HelpPage, { settings: settings, fieldname: fieldname });
    } else {
      this.loadSettings();
    }
  }

  chatUs() {
    if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof Contact_usPage))
      this.nav.setRoot(Contact_usPage);
  }

  chatting() {
    if (!this.user) {
      this.loginIfNot();
      this.translate.get("auth_required").subscribe(value => this.showToast(value));
    } else if (!this.userAdmin) {
      this.translate.get("auth_required_admin").subscribe(value => this.showToast(value));
    } else {
      let chat = new Chat();
      chat.chatId = this.userAdmin.id + "admin";
      chat.chatImage = (this.userAdmin.avatar_url && this.userAdmin.avatar_url.length) ? this.userAdmin.avatar_url : "assets/imgs/empty_dp.png";
      chat.chatName = this.config.appName;
      chat.chatStatus = this.config.appName;
      chat.myId = this.user.id + "customer";
      this.nav.setRoot(ChatsPage, { chat: chat });
    }
  }

  loginIfNot() {
    if (!this.user) {
      if (!(this.nav.getActive().instance instanceof LoginPage))
        this.nav.push(LoginPage);
    }
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
  developedBy() {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.inAppBrowser.create('https://verbosetechlabs.com/', '_system', options);
  }
}
