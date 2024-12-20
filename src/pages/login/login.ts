import { PhonePage } from './../phone/phone';
import { Component, Inject } from '@angular/core';
import { Platform, NavController, AlertController, Loading, LoadingController, ToastController, Events } from 'ionic-angular';
import { WordpressClient } from '../../providers/wordpress-client.service';
import { Subscription } from "rxjs/Subscription";
import { HomePage } from '../home/home';
import { PasswordPage } from '../password/password';
import { CreateaccountPage } from '../createaccount/createaccount';
import { AuthCredential } from "../../models/auth-credential.models";
import { AuthResponse } from "../../models/auth-response.models";
import { UserResponse } from "../../models/user-response.models";
import { Constants } from "../../models/constants.models";
import { Address } from '../../models/address.models';
import { RegisterRequest } from "../../models/register-request.models";
import { APP_CONFIG, AppConfig } from "../../app/app.config";
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [WordpressClient]
})
export class LoginPage {
  private loading: Loading;
  private loadingShown: Boolean = false;
  private authError = "";
  private registerRequest: RegisterRequest = new RegisterRequest('', '', '', '', '', '');
  private subscriptions: Array<Subscription> = [];
  private credentials: AuthCredential = new AuthCredential('', '');
  private countries: any;
  private countryCode: string;
  private socialDP: string;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private translate: TranslateService,
    private events: Events, private toastCtrl: ToastController, private navCtrl: NavController,
    private service: WordpressClient, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private platform: Platform) {
    if (this.userLoggedIn()) {
      navCtrl.setRoot(HomePage);
    } else {
      this.getCountries();
    }
  }

  getCountries() {
    this.service.getCountries().subscribe(data => {
      this.countries = data;
    }, err => {
      console.log(err);
    });
  }

  private userLoggedIn(): boolean {
    let user: UserResponse = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
    return user != null;
  }

  signIn() {
    this.authError = "";

    if (!this.countryCode || !this.countryCode.length) {
      this.translate.get('login_countrycode_empty').subscribe(value => {
        this.showToast(value);
      });
      // this.showToast('Username or Password cannot be empty!');
    } else if (this.credentials.username.length == 0 || this.credentials.password.length == 0) {
      this.translate.get('login_box_empty').subscribe(value => {
        this.showToast(value);
      });
      // this.showToast('Username or Password cannot be empty!');
    } else {
      this.translate.get('loging').subscribe(value => {
        this.showToast(value);
      });
      let credentials = { username: this.countryCode + this.credentials.username, password: this.credentials.password };
      let subscription: Subscription = this.service.getAuthToken(credentials).subscribe(data => {
        let authResponse: AuthResponse = data;
        window.localStorage.setItem(Constants.USER_API_KEY, authResponse.token);
        this.getUser(this.getUserIdFromToken(authResponse.token));
      }, err => {
        // this.authError = err.error.message.replace('username', 'mobile no.');
        // let pos = this.authError.indexOf('<a');
        // if (pos != -1) {
        //   this.authError = this.authError.substr(0, pos) + '<a target="_blank" ' + this.authError.substr(pos + 2, this.authError.length - 1);
        // }
        this.dismissLoading();
        this.translate.get('login_error').subscribe(value => {
          this.presentErrorAlert(value);
        });
      });
      this.subscriptions.push(subscription);
    }
  }



  checkUser(fireUser) {
    const component = this;
    fireUser.getIdToken(false).then(function (idToken) {
      component.dismissLoading();
      component.translate.get('check_user').subscribe(value => {
        component.presentLoading(value);
      });
      // component.presentLoading("Checking the user");
      console.log("Checking the user");
      component.service.checkToken(window.localStorage.getItem(Constants.ADMIN_API_KEY), idToken).subscribe(data => {
        console.log("checkToken", JSON.stringify(data));
        // user exists
        let authResponse = data;
        window.localStorage.setItem(Constants.USER_API_KEY, authResponse.token);
        component.dismissLoading();
        component.getUser(component.getUserIdFromToken(authResponse.token));
      }, err => {
        console.log("checkToken", JSON.stringify(err));
        component.dismissLoading();
        component.verifyPhone();
      });
    }).catch(function (error) {
      component.dismissLoading();
      console.log("error");
    });
  }

  verifyPhone() {
    this.navCtrl.setRoot(PhonePage, { registerRequest: this.registerRequest });
  }

  private getUser(userId: string) {
    this.translate.get('fetch_user').subscribe(value => {
      this.presentLoading(value);
      if (this.socialDP && this.socialDP.length) {
        this.service.updateUser(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(userId), { meta_data: [{ key: "avatar_url", value: this.socialDP }] }).subscribe(data => {
          console.log("dpUpdated", data);
          this.dismissLoading();
          this.done(data);
        }, err => {
          console.log("dpUpdate", err);
          this.dismissLoading();
          this.translate.get('login_error').subscribe(value => {
            this.showToast(value);
          });
        });
      } else {
        this.subscriptions.push(this.service.getUser(window.localStorage.getItem(Constants.ADMIN_API_KEY), userId).subscribe(data => {
          this.dismissLoading();
          this.done(data);
        }, err => {
          console.log("getUser", err);
          this.dismissLoading();
          this.translate.get('login_error').subscribe(value => {
            this.showToast(value);
          });
        }));
      }
    });
  }

  done(userResponse: UserResponse) {
    //if (this.socialDP && this.socialDP.length) userResponse.meta_data = [{ key: "avatar_url", value: this.socialDP }];
    window.localStorage.setItem(Constants.USER_KEY, JSON.stringify(userResponse));
    if (userResponse.billing && userResponse.billing.address_1 && userResponse.billing.address_1.length && userResponse.billing.address_2 && userResponse.billing.address_2.length) {
      userResponse.billing.id = -100;
      let addresses = new Array<Address>();
      addresses.push(userResponse.billing);
      window.localStorage.setItem(Constants.SELECTED_ADDRESS, JSON.stringify(userResponse.billing));
      window.localStorage.setItem(Constants.SELECTED_ADDRESS_LIST, JSON.stringify(addresses));
    }
    this.navCtrl.setRoot(HomePage);
    this.events.publish('user:login', userResponse);
  }

  private getUserIdFromToken(token: string): string {
    let decodedString: string = window.atob(token.split(".")[1]);
    return JSON.parse(decodedString).data.user.id;
  }

  private presentLoading(message: string) {
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.onDidDismiss(() => { });

    this.loading.present();
    this.loadingShown = true;
  }

  private dismissLoading() {
    if (this.loadingShown) {
      this.loadingShown = false;
      this.loading.dismiss();
    }
  }

  private presentErrorAlert(msg: string) {
    this.translate.get(['error', 'dismiss']).subscribe(text => {
      let alert = this.alertCtrl.create({
        title: text['error'],
        subTitle: msg,
        buttons: [text['dismiss']]
      });
      alert.present();
    })
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  signupPage() {
    this.navCtrl.push(CreateaccountPage);
  }

  homePage() {
    this.navCtrl.setRoot(HomePage);
  }

  passwordPage() {
    this.navCtrl.push(PasswordPage);
  }

}
