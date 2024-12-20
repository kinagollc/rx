import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CodePage } from '../pages/code/code';
import { AddressSelectPage } from '../pages/addressselect/addressselect';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PasswordPage } from '../pages/password/password';
import { LoginPage } from '../pages/login/login';
import { Order_infoPage } from '../pages/order_info/order_info';
import { PhonePage } from '../pages/phone/phone';
import { OtpPage } from '../pages/otp/otp';
import { Upload_prescriptionPage } from '../pages/upload_prescription/upload_prescription';
import { CreateaccountPage } from '../pages/createaccount/createaccount';
import { CategoryPage } from '../pages/category/category';
import { ItemdetailPage } from '../pages/itemdetail/itemdetail';
import { ShippiningPage } from '../pages/shippining/shippining';
import { PaymentPage } from '../pages/payment/payment';
import { PlacedPage } from '../pages/placed/placed';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { My_accountPage } from '../pages/my_account/my_account';
import { CartPage } from '../pages/cart/cart';
import { SearchPage } from '../pages/search/search';
import { Myorder_2Page } from '../pages/myorder_2/myorder_2';
import { ShirtsPage } from '../pages/shirts/shirts';
import { UploadPage } from '../pages/upload/upload';
import { Walkthough_1Page } from '../pages/walkthough_1/walkthough_1';
import { SocialSharing } from '@ionic-native/social-sharing';
import { APP_CONFIG, BaseAppConfig } from "./app.config";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { SelectareaPage } from '../pages/selectarea/selectarea';
import { Add_address_titlePage } from '../pages/add_address_title/add_address_title';
import { Connectivity } from '../providers/connectivity-service';
import { GoogleMaps } from '../providers/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { HelpPage } from '../pages/help/help';
import { Vendor_profilePage } from '../pages/vendor_profile/vendor_profile';
import { ManagelanguagePage } from '../pages/managelanguage/managelanguage';
import { ChatsPage } from '../pages/chats/chats';
import { Contact_usPage } from '../pages/contact_us/contact_us';
import { Global } from '../providers/global';
import { SelectShippingPage } from '../pages/selectshipping/selectshipping';
import { BuyAppAlertPage } from '../pages/buyappalert/buyappalert';
import { Vt_popupPage } from '../pages/vt_popup/vt_popup';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    CodePage,
    SelectareaPage,
    Add_address_titlePage,
    AddressSelectPage,
    MyApp,
    HomePage,
    LoginPage,
    PhonePage,
    OtpPage,
    PasswordPage,
    CreateaccountPage,
    CategoryPage,
    ItemdetailPage,
    ShippiningPage,
    PaymentPage,
    Myorder_2Page,
    ShirtsPage,
    PlacedPage,
    Upload_prescriptionPage,
    WishlistPage,
    My_accountPage,
    Order_infoPage,
    CartPage,
    SearchPage,
    Walkthough_1Page,
    UploadPage,
    HelpPage,
    ManagelanguagePage,
    Contact_usPage,
    Vendor_profilePage,
    ChatsPage,
    SelectShippingPage,
    BuyAppAlertPage,
    Vt_popupPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CodePage,
    SelectareaPage,
    Add_address_titlePage,
    AddressSelectPage,
    MyApp,
    HomePage,
    PasswordPage,
    CreateaccountPage,
    LoginPage,
    PhonePage,
    OtpPage,
    CategoryPage,
    ItemdetailPage,
    ShippiningPage,
    PaymentPage,
    Myorder_2Page,
    Order_infoPage,
    ShirtsPage,
    PlacedPage,
    Upload_prescriptionPage,
    WishlistPage,
    My_accountPage,
    CartPage,
    SearchPage,
    Walkthough_1Page,
    UploadPage,
    HelpPage,
    ManagelanguagePage,
    ChatsPage,
    Contact_usPage,
    Vendor_profilePage,
    ChatsPage,
    SelectShippingPage,
    BuyAppAlertPage,
    Vt_popupPage
  ],
  providers: [
    Device,
    OneSignal,
    StatusBar,
    SplashScreen,
    SocialSharing,
    InAppBrowser,
    Camera,
    File,
    Geolocation,
    Connectivity,
    GoogleMaps,
    Network,
    { provide: APP_CONFIG, useValue: BaseAppConfig },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Global
  ]
})
export class AppModule { }
