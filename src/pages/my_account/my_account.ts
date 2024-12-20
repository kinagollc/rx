import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Address } from "../../models/address.models";
import { Constants } from "../../models/constants.models";
import { UserResponse } from "../../models/user-response.models";
import { WordpressClient } from '../../providers/wordpress-client.service';
import { SelectareaPage } from '../selectarea/selectarea';

@Component({
	selector: 'page-my_account ',
	templateUrl: 'my_account.html',
	providers: [WordpressClient]
})
export class My_accountPage {
	private account: string = "profile";
	private user: UserResponse;
	private addresses = new Array<Address>();
	private addressChangeText = 'Change';
	private tab: number;

	constructor(private navCtrl: NavController, navParams: NavParams) {
		this.tab = navParams.get("tab");
		this.account = (this.tab && this.tab == 1) ? "profile" : "address";
		this.user = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
	}

	ionViewDidEnter() {
		let addresses = JSON.parse(window.localStorage.getItem(Constants.SELECTED_ADDRESS_LIST));
		if (addresses != null) {
			for (let ad of addresses) if (!ad.type) ad.type = 1;
			this.addresses = addresses;
		}
	}

	addressPage(address) {
		this.navCtrl.push(SelectareaPage, { address: address });
	}

	isReadonly() {
		return true;
	}

}
