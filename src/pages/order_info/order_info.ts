import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Order } from '../../models/order.models';
import { Currency } from '../../models/currency.models';
import { Constants } from '../../models/constants.models';
import { Helper } from '../../models/helper.models';

@Component({
  selector: 'page-order_info',
  templateUrl: 'order_info.html'
})
export class Order_infoPage {
  private order: Order;
  private orderLevel: number = 0;
  private servicefeeHtml;

  constructor(private navCtrl: NavController, navParam: NavParams) {
    this.order = navParam.get("order");

    switch (this.order.status) {
      case "pending": {
        this.orderLevel = 1;
        break;
      }
      case "processing": {
        this.orderLevel = 2;
        break;
      }
      case "on-hold": {
        this.orderLevel = 2;
        break;
      }
      case "completed": {
        this.orderLevel = 3;
        break;
      }
      case "cancelled": {
        this.orderLevel = 0;
        break;
      }
      case "refunded": {
        this.orderLevel = 0;
        break;
      }
      case "failed": {
        this.orderLevel = 0;
        break;
      }
      case "trash": {
        this.orderLevel = 0;
        break;
      }
    }

    let hasServiceFee = false;
    let sf: string;
    if (this.order.fee_lines && this.order.fee_lines.length) {
      for (let fl of this.order.fee_lines) {
        if (fl.name.toLowerCase().includes("service")) {
          hasServiceFee = true;
          sf = fl.total;
          break;
        }
      }
    }
    if (hasServiceFee) {
      let currency: Currency = JSON.parse(window.localStorage.getItem(Constants.CURRENCY));
      if (currency) {
        let currencyText = currency.value;
        let iconText = currency.options[currency.value];
        let currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);

        if (!sf) sf = Helper.getSetting("mobile_ecommerce_service_fee");

        if (sf && sf.length) {
          let servicefee = Number(Number(sf).toFixed());
          if (currencyIcon) {
            this.servicefeeHtml = currencyIcon + " " + servicefee;
          } else if (currencyText) {
            this.servicefeeHtml = currencyText + " " + servicefee;
          }
        }
      }
    }
    
  }
}
