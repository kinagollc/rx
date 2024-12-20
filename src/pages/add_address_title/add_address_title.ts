import { Component } from '@angular/core';
import { ViewController, NavParams, ToastController } from 'ionic-angular';
import { Address } from '../../models/address.models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-add_address_title',
  templateUrl: 'add_address_title.html'
})
export class Add_address_titlePage {
  private address: Address;

  constructor(navParam: NavParams, private viewCtrl: ViewController,
    private translate: TranslateService, private toastCtrl: ToastController) {
    this.address = navParam.get("address");
    if (!this.address.type) this.address.type = 1;
  }

  cancel() {
    this.viewCtrl.dismiss(null);
  }

  save() {
    if (!this.address.postcode || !this.address.postcode.length) {
      this.translate.get("field_error_postalcode").subscribe(value => this.showToast(value));
    } else if (!this.address.address_1 || !this.address.address_1.length) {
      this.translate.get("field_error_address_full").subscribe(value => this.showToast(value));
    } else {
      this.viewCtrl.dismiss(this.address);
    }
  }

  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
