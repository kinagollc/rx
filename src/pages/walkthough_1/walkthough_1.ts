import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { HomePage } from '../home/home';
import { Constants } from '../../models/constants.models';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-walkthough_1',
  templateUrl: 'walkthough_1.html'
})
export class Walkthough_1Page {
  @ViewChild('slides') slides: Slides;

  constructor(private navCtrl: NavController) {

  }

  home() {
    localStorage.setItem(Constants.WALKTHROUGH_SHOWN, "shown");
    let user = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
    this.navCtrl.setRoot(user ? HomePage : LoginPage);
  }

  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

}
