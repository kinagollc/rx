import { Component, Inject } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController, ToastController, Events } from 'ionic-angular';
import { WordpressClient } from '../../providers/wordpress-client.service';
import { Subscription } from "rxjs/Subscription";
import { HomePage } from '../home/home';
import { RegisterRequest } from "../../models/register-request.models";
import { RegisterResponse } from "../../models/register-response.models";
import { UserResponse } from "../../models/user-response.models";
import { Constants } from "../../models/constants.models";
import { OtpPage } from "../../pages/otp/otp";
import { AppConfig, APP_CONFIG } from '../../app/app.config';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

@Component({
	selector: 'page-createaccount',
	templateUrl: 'createaccount.html',
	providers: [WordpressClient]
})
export class CreateaccountPage {
	private loading: Loading;
	private loadingShown: Boolean = false;
	private authError = "";
	private subscriptions: Array<Subscription> = [];
	private registerRequest: RegisterRequest = new RegisterRequest('', '', '', '', '', '');
	//private registerRequestPasswordConfirm: string = '';
	private registerResponse: RegisterResponse;
	private buttonDisabled: Boolean = true;
	private countries: any;
	private countryCode: string;

	constructor(@Inject(APP_CONFIG) private config: AppConfig, private events: Events, private toastCtrl: ToastController,
		private navCtrl: NavController, private service: WordpressClient, private translate: TranslateService,
		private loadingCtrl: LoadingController, private alertCtrl: AlertController, ) {
		this.getCountries();
	}

	getCountries() {
		this.service.getCountries().subscribe(data => {
			this.countries = data;
		}, err => {
			console.log(err);
		});
	}

	register() {
		this.authError = "";
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (this.registerRequest.first_name == "" || !this.registerRequest.first_name.length) {
			this.translate.get('field_error_name_first').subscribe(value => {
				this.showToast(value);
			});
			// this.showToast('Please enter your first name');
		}
		// else if (this.registerRequest.last_name == "" || !this.registerRequest.last_name.length) {
		// 	this.translate.get('field_error_name_last').subscribe(value => {
		// 		this.showToast(value);
		// 	});
		// 	// this.showToast('Please enter your last name');
		// }
		else if (!this.countryCode || !this.countryCode.length) {
			this.translate.get('login_countrycode_empty').subscribe(value => {
				this.showToast(value);
			});
			// this.showToast('Username or Password cannot be empty!');
		} else if (!this.registerRequest.username || !this.registerRequest.username.length) {
			this.translate.get('field_error_phone_valid').subscribe(value => {
				this.showToast(value);
			});
			// this.showToast('Enter valid phone');
		} else if (this.registerRequest.email.length <= 5 || !reg.test(this.registerRequest.email)) {
			this.translate.get('field_error_email').subscribe(value => {
				this.showToast(value);
			});
			// this.showToast('Enter valid email address');
		} else if (this.registerRequest.password.length < 6) {
			this.translate.get('field_error_password').subscribe(value => {
				this.showToast(value);
			});
			// this.showToast('Enter valid passwords, twice.');
		} else {
			let alert = this.alertCtrl.create({
				title: "+" + this.countryCode + this.registerRequest.username,
				message: "Continue using this phone number for OTP verification?",
				buttons: [{
					text: "No",
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}, {
					text: "Yes",
					handler: () => {
						this.translate.get('loading_sign_up').subscribe(value => {
							this.presentLoading(value);
						});

						let subscription: Subscription = this.service.createUser(window.localStorage.getItem(Constants.ADMIN_API_KEY), this.countryCode, this.registerRequest).subscribe(data => {
							this.dismissLoading();
							this.registerResponse = data;
							this.translate.get('signup_success').subscribe(value => {
								this.showToast(value);
							});
							this.navCtrl.push(OtpPage, { registerRequest: this.registerRequest, countryCode: this.countryCode });
						}, err => {
							console.log(err);
							this.dismissLoading();
							// if (err && err.error && err.error.message) {
							// 	this.authError = err.error.message;
							// 	let pos = this.authError.indexOf('<a');
							// 	if (pos != -1) {
							// 		this.authError = this.authError.substr(0, pos) + '<a target="_blank" ' + this.authError.substr(pos + 2, this.authError.length - 1);
							// 	}
							// } else {
							// 	this.translate.get('something_went_wrong').subscribe(value => {
							// 		this.showToast(value);
							// 	});
							// }
							this.translate.get('signup_error').subscribe(value => {
								this.showToast(value);
							});
						});
						this.subscriptions.push(subscription);
					}
				}]
			});
			alert.present();
		}
	}

	private getUser(userId: string) {
		let subscription: Subscription = this.service.getUser(window.localStorage.getItem(Constants.ADMIN_API_KEY), userId).subscribe(data => {
			this.dismissLoading();
			let userResponse: UserResponse = data;
			window.localStorage.setItem(Constants.USER_KEY, JSON.stringify(userResponse));
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

	signinPage() {
		this.navCtrl.pop();
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
}
