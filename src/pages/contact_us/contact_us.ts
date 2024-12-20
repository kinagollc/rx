import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-contact_us',
  templateUrl: 'contact_us.html'
})
export class Contact_usPage {

constructor(private iab: InAppBrowser) {}

  conversation() {
    this.iab.create('https://tawk.to/chat/6629b90a1ec1082f04e68d3a/1hs9flkmt', '_blank', 'location=yes');
  }

}
