import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { SettingResponse } from '../../models/setting-response.models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-help ',
  templateUrl: 'help.html'
})
export class HelpPage {
  private title: string;
  private toShow: string;

  constructor(navParam: NavParams, private translate: TranslateService) {
    let fieldname = navParam.get("fieldname");
    this.translate.get((fieldname == "faq") ? "faq" : "about").subscribe(value => {
      this.title = value;
    });
    let sr: SettingResponse = navParam.get("settings");
    this.toShow = fieldname == "faq" ? sr.mobile_ecommerce_appconfig_faq : sr.mobile_ecommerce_appconfig_terms;
    console.log("fieldname", fieldname);
  }
}
