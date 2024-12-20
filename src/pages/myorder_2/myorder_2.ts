import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { WordpressClient } from '../../providers/wordpress-client.service';
import { Subscription } from "rxjs/Subscription";
import { Constants } from "../../models/constants.models";
import { Order } from "../../models/order.models";
import { UserResponse } from "../../models/user-response.models";
import { LineItem } from "../../models/line-item.models";
import { OrderUpdateRequest } from "../../models/order-update-request.models";
import { ItemdetailPage } from '../itemdetail/itemdetail';
import { Currency } from "../../models/currency.models";
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { Order_infoPage } from '../order_info/order_info';

@Component({
  selector: 'page-myorder_2 ',
  templateUrl: 'myorder_2.html',
  providers: [WordpressClient]
})
export class Myorder_2Page {
  private loading: Loading;
  private loadingShown: Boolean = false;
  private subscriptions: Array<Subscription> = [];
  private orders = new Array<Order>();
  private user: UserResponse;
  private pageNo: number = 1;
  private currencyIcon: string = '';
  private currencyText: string = '';

  constructor(private translate: TranslateService, private toastCtrl: ToastController,
    private service: WordpressClient, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private navCtrl: NavController) {
    this.user = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
    this.loadMyOrders();
    this.translate.get('loading_orders').subscribe(value => {
      this.presentLoading(value);
    });
    let currency: Currency = JSON.parse(window.localStorage.getItem(Constants.CURRENCY));
    if (currency) {
      this.currencyText = currency.value;
      let iconText = currency.options[currency.value];
      this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
    }
  }

  ionViewWillLeave() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.dismissLoading();
  }

  loadMyOrders() {
    let subscription: Subscription = this.service.myOrders(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(this.user.id), String(this.pageNo)).subscribe(data => {
      this.dismissLoading();
      this.orders = data;
    }, err => {
      this.dismissLoading();
    });
    this.subscriptions.push(subscription);
  }

  itemdetailPage(item: LineItem) {
    this.navCtrl.push(ItemdetailPage, { pro_id: item.product_id });
  }

  confirmCancelOrder(order) {
    this.translate.get(['cancel_order_title', 'cancel_order_message', 'no', 'yes']).subscribe(text => {
      let alert = this.alertCtrl.create({
        title: text['cancel_order_title'],
        message: text['cancel_order_message'],
        buttons: [{
          text: text['no'],
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: text['yes'],
          handler: () => {
            this.cancelOrder(order);
          }
        }]
      });
      alert.present();
    });
  }

  cancelOrder(order) {
    this.translate.get('cancelling_orders').subscribe(value => {
      this.presentLoading(value);
    });
    // this.presentLoading('Cancelling order');
    let subscription: Subscription = this.service.updateOrder(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(order.id), new OrderUpdateRequest('cancelled')).subscribe(data => {
      let orderRes: Order = data;
      order.status = 'cancelled';
      /* for(let o of this.orders) {
        console.log(String(o.id) == String(orderRes.id));
        if(o.id == orderRes.id) {
          o = orderRes;
          console.log('here');
          this.orders = this.orders;
          break;
        }
      } */
      this.dismissLoading();
      // this.showToast('Order cancelled');
      this.translate.get('order_cancelled').subscribe(value => {
        this.showToast(value);
      });
    }, err => {
      console.log(err);
    });
    this.subscriptions.push(subscription);
  }

  doInfinite(infiniteScroll: any) {
    this.pageNo++;
    let subscription: Subscription = this.service.myOrders(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(this.user.id), String(this.pageNo)).subscribe(data => {
      this.orders.concat(data);
      infiniteScroll.complete();
    }, err => {
      infiniteScroll.complete();
      console.log(err);
    });
    this.subscriptions.push(subscription);
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

  orderInfo(order) {
    this.navCtrl.push(Order_infoPage, { order: order });
  }

}