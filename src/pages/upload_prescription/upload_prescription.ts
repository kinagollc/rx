import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-upload_prescription',
  templateUrl: 'upload_prescription.html'
})
export class Upload_prescriptionPage {

  constructor(private navCtrl: NavController) {

  }

  home() {
    window.localStorage.setItem("tabpos", "0");
    this.navCtrl.pop();
  }

}
