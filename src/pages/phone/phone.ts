import { Component, Inject } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { Constants } from "../../models/constants.models";
import { OtpPage } from '../../pages/otp/otp';
import { RegisterRequest } from "../../models/register-request.models";
import { RegisterResponse } from "../../models/register-response.models";
import { WordpressClient } from '../../providers/wordpress-client.service';
import { Subscription } from "rxjs/Subscription";
import { APP_CONFIG, AppConfig } from "../../app/app.config";
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

@Component({
  selector: 'page-phone',
  templateUrl: 'phone.html',
  providers: [WordpressClient]
})
export class PhonePage {
  loading: any;
  loadingShown: boolean = false;
  captchanotvarified: boolean = true;
  result: any;
  buttonDisabled: any = true;
  verfificationId: any;
  otpNotsent: boolean = false;
  countries: any;
  countryCode: string;
  private registerRequest: RegisterRequest = new RegisterRequest('', '', '', '', '', '');
  private subscriptions: Array<Subscription> = [];
  private registerResponse: RegisterResponse;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private navCtrl: NavController, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController, private platform: Platform,
    navParam: NavParams, private service: WordpressClient, private translate: TranslateService) {
    this.registerRequest = navParam.get("registerRequest");
    this.getCountries();
  }

  getCountries() {
    this.service.getCountries().subscribe(data => {
      console.log("Countries fetched");
      this.countries = data;
      // console.log(data);
    }, err => {
      console.log(err);
    })
  }

  createUser() {
    if (!this.countryCode || !this.countryCode.length) {
      this.translate.get('login_countrycode_empty').subscribe(value => {
        this.showToast(value);
      });
    } else if (!this.registerRequest.username || !this.registerRequest.username.length) {
      this.translate.get('field_error_phone_valid').subscribe(value => {
        this.showToast(value);
      });
    } else {
      this.translate.get(['phone_confirm_message', 'yes', 'no']).subscribe(res => {
        let alert = this.alertCtrl.create({
          title: "+" + this.countryCode + this.registerRequest.username,
          message: res.phone_confirm_message,
          buttons: [{
            text: res.no,
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }, {
            text: res.yes,
            handler: () => {
              this.registerRequest.password = Math.random().toString(36).slice(-6);
              this.translate.get('checking_phone').subscribe(value => {
                this.presentLoading(value);
                this.subscriptions.push(this.service.createUser(window.localStorage.getItem(Constants.ADMIN_API_KEY), this.countryCode, this.registerRequest).subscribe(data => {
                  let haveImgToUpdate = false;
                  if (this.registerRequest && this.registerRequest.meta_data) {
                    for (let meta of this.registerRequest.meta_data) {
                      if (meta.key == "avatar_url" && meta.value && meta.value.length) {
                        haveImgToUpdate = true;
                        break;
                      }
                    }
                  }
                  if (haveImgToUpdate) {
                    this.service.updateUser(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(data.id), { meta_data: this.registerRequest.meta_data }).subscribe(data => {
                      console.log("dpUpdated", data);
                    }, err => {
                      console.log(err);
                    });
                  }
                  this.dismissLoading();
                  this.navCtrl.push(OtpPage, { registerRequest: this.registerRequest, countryCode: this.countryCode });
                }, err => {
                  console.log(err);
                  this.dismissLoading();
                  this.translate.get('checking_phone_error').subscribe(value => {
                    this.showToast(value);
                  });
                }));
              });
            }
          }]
        });
        alert.present();
      });
    }
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
}