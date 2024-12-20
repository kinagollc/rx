import { WordpressClient } from './../../providers/wordpress-client.service';
import { Component } from '@angular/core';
import { Events, Loading, Platform, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserResponse } from "../../models/user-response.models";
import { Constants } from "../../models/constants.models";
import { Subscription } from "rxjs/Subscription";
import { AuthResponse } from "../../models/auth-response.models";
import { RegisterRequest } from "../../models/register-request.models";
import { AuthCredential } from "../../models/auth-credential.models";
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-otp ',
  templateUrl: 'otp.html',
  providers: [WordpressClient]
})
export class OtpPage {
  private recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  private loading: Loading;
  private loadingShown: boolean = false;
  private phoneNumberFull: string;
  private message: string;
  private interupted = true;
  private captchanotvarified = true;
  private result: any;
  private otp: string;
  private registerRequest: RegisterRequest = new RegisterRequest('', '', '', '', '', '');
  private subscriptions: Array<Subscription> = [];
  private buttonDisabled: any = true;
  private component: any;
  private captchaVerified: boolean = false;
  private verfificationId: any;
  private timer: any;
  private minutes: number = 0;
  private seconds: number = 0;
  private totalSeconds: number = 0;
  private intervalCalled: boolean = false;
  private resendCode: boolean = false;
  private otpNotSent: boolean = true;

  constructor(params: NavParams, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private navCtrl: NavController, private platform: Platform,
    private service: WordpressClient, private events: Events, private translate: TranslateService) {
    this.registerRequest = params.get('registerRequest');
    this.registerRequest.username = params.get('countryCode') + this.registerRequest.username;
    this.phoneNumberFull = "+" + this.registerRequest.username;
  }

  ionViewDidEnter() {
    if (!(this.platform.is('cordova'))) {
      this.makeCaptcha();
    }
    this.sendOTP();
  }

  sendOTP() {
    this.resendCode = false;
    this.otpNotSent = true;
    console.log("phone no. is " + this.phoneNumberFull);
    if (this.platform.is('cordova')) {
      this.sendOtpPhone(this.phoneNumberFull);
    } else {
      this.sendOtpBrowser(this.phoneNumberFull);
    }
    if (this.intervalCalled) {
      clearInterval(this.timer);
    }
  }

  createTimer() {
    this.intervalCalled = true;
    this.totalSeconds--;
    if (this.totalSeconds == 0) {
      this.otpNotSent = true;
      this.resendCode = true;
      clearInterval(this.timer);
    } else {
      this.seconds = (this.totalSeconds % 60);
      if (this.totalSeconds >= this.seconds) {
        this.minutes = (this.totalSeconds - this.seconds) / 60
      } else {
        this.minutes = 0;
      }
    }
  }

  createInterval() {
    this.totalSeconds = 60;
    this.createTimer();
    this.timer = setInterval(() => {
      this.createTimer();
    }, 1000);
  }

  sendOtpPhone(phone) {
    this.translate.get('sending_otp').subscribe(value => {
      this.presentLoading(value);
    });
    const component = this;
    (<any>window).FirebasePlugin.verifyPhoneNumber(phone, 60, function (credential) {
      console.log("verifyPhoneNumber", JSON.stringify(credential));
      component.verfificationId = credential.verificationId ? credential.verificationId : credential;
      // if instant verification is true use the code that we received from the firebase endpoint, otherwise ask user to input verificationCode:
      //var code = credential.instantVerification ? credential.code : inputField.value.toString();
      if (component.verfificationId) {
        if (credential.instantVerification && credential.code) {
          component.otp = credential.code;
          component.showToast("Verified automatically");
          component.verifyOtpPhone();
        } else {
          component.translate.get("otp_sent").subscribe(value => {
            component.showToast(value);
          });
          component.otpNotSent = false;
          component.createInterval();
        }
      }
      component.dismissLoading();
    }, function (error) {
      console.log("otp_send_fail", error);
      component.otpNotSent = true;
      component.resendCode = true;
      component.dismissLoading();
      component.translate.get('otp_err').subscribe(value => {
        component.showToast(value);
      });
    });
  }

  sendOtpBrowser(phone) {
    this.dismissLoading();
    const component = this;
    component.translate.get('sending_otp').subscribe(value => {
      component.presentLoading(value);
    });
    // component.presentLoading("Sending OTP by SMS");
    console.log("In not cordova");
    firebase.auth().signInWithPhoneNumber(phone, this.recaptchaVerifier)
      .then((confirmationResult) => {
        component.otpNotSent = false;
        component.result = confirmationResult;
        component.dismissLoading();
        component.translate.get('otp_sent').subscribe(value => {
          component.showToast(value);
        });
        // component.showToast("OTP sent on your mobile");
        if (component.intervalCalled) {
          clearInterval(component.timer);
        }
        component.createInterval();
      })
      .catch(function (error) {
        component.resendCode = true;
        component.dismissLoading();
        if (error.message) {
          component.showToast(error.message);
        } else {
          component.translate.get('otp_err').subscribe(value => {
            component.presentLoading(value);
          });
          // component.showToast("SMS not sent");
        }
        console.log("SMS not sent " + JSON.stringify(error));
      });
  }

  verify() {
    this.otpNotSent = true;
    if (this.platform.is('cordova')) {
      this.verifyOtpPhone();
    } else {
      this.verifyOtpBrowser();
    }
  }

  verifyOtpPhone() {
    console.log("Verifying phone in cordova");
    const credential = firebase.auth.PhoneAuthProvider.credential(this.verfificationId, this.otp);
    console.log("Fetched the credential");
    this.translate.get('verifying_otp').subscribe(value => {
      this.presentLoading(value);
    });
    // this.presentLoading("Verifying OTP by SMS");
    firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then((info) => {
        console.log(JSON.stringify(info));
        this.dismissLoading();
        this.translate.get('otp_success').subscribe(value => {
          this.showToast(value);
        });
        // this.showToast("OTP verified");
        this.signIn();
      }, (error) => {
        if (error.message) {
          this.showToast(error.message);
        } else {
          this.translate.get('otp_err').subscribe(value => {
            this.showToast(value);
          });
          // this.showToast("Wrong OTP");
        }
        this.dismissLoading();
        console.log(JSON.stringify(error));
      })
  }

  verifyOtpBrowser() {
    const component = this;
    console.log("Confimation result:---" + JSON.stringify(component.result));
    // component.presentLoading("Verifying OTP by SMS");
    component.translate.get('verifying_otp').subscribe(value => {
      component.presentLoading(value);
    });
    component.result.confirm(this.otp).then(function (response) {
      component.dismissLoading();
      component.translate.get('otp_success').subscribe(value => {
        component.showToast(value);
      });
      // component.showToast("OTP verified");
      component.signIn();
    }).catch(function (error) {
      if (error.message) {
        component.showToast(error.message);
      } else {
        component.translate.get('otp_err').subscribe(value => {
          component.showToast(value);
        });
        // component.showToast("Wrong OTP");
      }
      component.dismissLoading();
    });
  }

  makeCaptcha() {
    const component = this;
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      // 'size': 'normal',
      'size': 'invisible',
      'callback': function (response) {
        component.captchanotvarified = true;
        console.log("captchanotvarified:--" + component.captchanotvarified);
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
    this.recaptchaVerifier.render();
  }

  private signIn() {
    this.translate.get('wait').subscribe(value => {
      this.presentLoading(value);
    });
    let credentials: AuthCredential = new AuthCredential(this.registerRequest.username, this.registerRequest.password);
    let subscription: Subscription = this.service.getAuthToken(credentials).subscribe(data => {
      let authResponse: AuthResponse = data;
      window.localStorage.setItem(Constants.USER_API_KEY, authResponse.token);
      this.getUser(this.getUserIdFromToken(authResponse.token));
    }, err => {
      this.dismissLoading();
      this.translate.get('login_error').subscribe(value => {
        this.presentErrorAlert(value);
      });
    });
    this.subscriptions.push(subscription);
  }

  private getUserIdFromToken(token: string): string {
    let decodedString: string = window.atob(token.split(".")[1]);
    return JSON.parse(decodedString).data.user.id;
  }

  private getUser(userId: string) {
    let subscription: Subscription = this.service.getUser(window.localStorage.getItem(Constants.ADMIN_API_KEY), userId).subscribe(data => {
      this.dismissLoading();
      let userResponse: UserResponse = data;
      window.localStorage.setItem(Constants.USER_KEY, JSON.stringify(userResponse));
      window.localStorage.removeItem("userCreateData");
      this.navCtrl.setRoot(HomePage);
      this.events.publish('user:login', userResponse);
    }, err => {
      this.dismissLoading();
      this.translate.get('login_error').subscribe(value => {
        this.presentErrorAlert(value);
      });
    });
    this.subscriptions.push(subscription);
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

  private showToast(message: string) {
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

  private presentErrorAlert(msg: string) {
    this.translate.get(['error', 'dismiss'])
      .subscribe(text => {
        let alert = this.alertCtrl.create({
          title: text['error'],
          subTitle: msg,
          buttons: [text['dismiss']]
        });
        alert.present();
      })
  }

  makeExitAlert() {
    const alert = this.alertCtrl.create({
      title: 'App termination',
      message: 'Do you want to close the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Close App',
        handler: () => {
          this.platform.exitApp(); // Close this application
        }
      }]
    });
    alert.present();
  }

}
