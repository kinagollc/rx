import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { Constants } from "../../models/constants.models";
import { Address } from "../../models/address.models";
import { Subscription } from '../../../node_modules/rxjs/Subscription';
import { WordpressClient } from '../../providers/wordpress-client.service';
import { UserResponse } from '../../models/user-response.models';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { SelectareaPage } from '../selectarea/selectarea';

@Component({
	selector: 'page-addressselect ',
	templateUrl: 'addressselect.html',
	providers: [WordpressClient]
})
export class AddressSelectPage {
	private addresses = new Array<Address>();
	private select: boolean;
	private loading: Loading;
	private loadingShown: Boolean = false;
	private subscriptions: Array<Subscription> = [];

	constructor(private translate: TranslateService, private navCtrl: NavController, navParam: NavParams,
		private toastCtrl: ToastController, private service: WordpressClient, private loadingCtrl: LoadingController) {
		this.select = (navParam.get('action') != null);
	}

	ionViewDidEnter() {
		let addresses = JSON.parse(window.localStorage.getItem(Constants.SELECTED_ADDRESS_LIST));
		if (addresses != null) {
			for (let ad of addresses) if (!ad.type) ad.type = 1;
			this.addresses = addresses;
		}
	}

	addressNew() {
		this.navCtrl.push(SelectareaPage);
	}

	addressEditSelect(address: Address) {
		if (this.select) {
			for (let add of this.addresses) {
				if (add.id == -100) {
					add.id = address.id;
					break;
				}
			}

			address.id = -100;
			let user: UserResponse = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
			user.billing = address;
			user.shipping = address;
			user.first_name = address.first_name;
			//user.last_name = address.last_name;
			window.localStorage.setItem(Constants.USER_KEY, JSON.stringify(user));
			window.localStorage.setItem(Constants.SELECTED_ADDRESS, JSON.stringify(address));

			this.translate.get('just_moment').subscribe(value => {
				this.presentLoading(value);
			});
			let subscription: Subscription = this.service.updateUser(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(user.id), user).subscribe(data => {
				this.dismissLoading();
				this.navCtrl.pop();
			}, err => {
				this.dismissLoading();
				this.navCtrl.pop();
			});
			this.subscriptions.push(subscription);
		} else {
			this.navCtrl.push(SelectareaPage, { address: address });
		}
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
