import { Component, Inject } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController, ToastController, App } from 'ionic-angular';
import { PlacedPage } from '../placed/placed';
import { PaymentGateway } from "../../models/payment-gateway.models";
import { Constants } from "../../models/constants.models";
import { WordpressClient } from '../../providers/wordpress-client.service';
import { Subscription } from "rxjs/Subscription";
import { CartItem } from "../../models/cart-item.models";
import { OrderRequest } from "../../models/order-request.models";
import { OrderUpdateRequest } from '../../models/order-update-request.models';
import { Address } from "../../models/address.models";
import { UserResponse } from "../../models/user-response.models";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { sha512 } from 'js-sha512';
import { APP_CONFIG, AppConfig } from '../../app/app.config';
import { Coupon } from '../../models/coupon.models';
import { HomePage } from '../home/home';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { Helper } from '../../models/helper.models';
import { ShippingMethod } from '../../models/shipping-method.models';
import { ShippingLine } from '../../models/shipping-line.models';
import { Order } from '../../models/order.models';

@Component({
  selector: 'page-payment ',
  templateUrl: 'payment.html',
  providers: [WordpressClient]
})
export class PaymentPage {
  private loading: Loading;
  private loadingShown: Boolean = false;
  private placedPagePushed: Boolean = false;
  private paymentDone: Boolean = false;
  private paymentFailAlerted: Boolean = false;
  private subscriptions: Array<Subscription> = [];
  private paymentGateways = new Array<PaymentGateway>();
  private cartItems: Array<CartItem>;
  private selectedPaymentGateway;
  private selectedAddress: Address;
  private orderRequest: OrderRequest;
  private orderResponse: Order;
  private user: UserResponse;
  private totalItems = 0;
  private total = 0;
  private couponApplied = false;
  private coupon: Coupon;
  private servicefee = 0;
  private shippingMethod: ShippingMethod;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private translate: TranslateService, private iab: InAppBrowser,
    private toastCtrl: ToastController, private navCtrl: NavController, private navParams: NavParams, private service: WordpressClient,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, private appCtrl: App) {
    this.cartItems = this.navParams.get('cart');
    this.totalItems = this.navParams.get('totalItems');
    this.total = this.navParams.get('total');
    this.coupon = this.navParams.get("coupon");
    let paymentGateways = JSON.parse(window.localStorage.getItem(Constants.PAYMENT_GATEWAYS));
    this.selectedAddress = JSON.parse(window.localStorage.getItem(Constants.SELECTED_ADDRESS));
    this.shippingMethod = JSON.parse(window.localStorage.getItem(Constants.SELECTED_SHIPPING_METHOD));

    this.total = Number(this.total + Number(this.shippingMethod ? this.shippingMethod.cost : 0));

    if (paymentGateways != null) {
      for (let pg of paymentGateways) {
        if (pg.enabled && this.paymentImplemented(pg.id)) {
          this.paymentGateways.push(pg);
        }
      }
    }
    let serviceFee = Helper.getSetting("mobile_ecommerce_service_fee");
    if (serviceFee) {
      this.servicefee = Number(Number(serviceFee).toFixed());
    }
  }

  paymentImplemented(id) {
    //return id === "paypal" || id === "ppec_paypal" || id === "pumcp" || id === "payuindia" || id === "cod";
    return id === "payu" || id === "payuindia" || id === "cod" || id === "alg_custom_gateway_1" || id === "cheque";
  }

  paymentMethod(paymentGateway) {
    this.selectedPaymentGateway = paymentGateway;
  }

  ionViewWillLeave() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.dismissLoading();
  }

  placedPage() {
    if (this.selectedPaymentGateway == null) {
      this.translate.get('field_error_payment_method').subscribe(value => this.showToast(value));
    } else {
      this.orderRequest = new OrderRequest();
      this.orderRequest.payment_method = this.selectedPaymentGateway.id;
      this.orderRequest.payment_method_title = this.selectedPaymentGateway.title;
      this.orderRequest.set_paid = false;
      this.orderRequest.billing = this.selectedAddress;
      this.orderRequest.shipping = this.selectedAddress;
      this.user = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
      this.orderRequest.customer_id = String(this.user.id);
      if (this.servicefee && this.servicefee > 0) {
        this.orderRequest.fee_lines = new Array();
        this.orderRequest.fee_lines.push({ name: "Service Fee", total: String(this.servicefee), tax_status: "none" });
      }
      if (this.shippingMethod) {
        this.orderRequest.shipping_lines = new Array<ShippingLine>();
        this.orderRequest.shipping_lines.push(new ShippingLine(this.shippingMethod.method_id, this.shippingMethod.method_title, String(this.shippingMethod.cost)));
      }
      this.orderRequest.line_items = this.cartItems;
      for (let item of this.orderRequest.line_items) {
        item.product = null;
      }

      this.translate.get('order_creating').subscribe(value => {
        this.presentLoading(value);
        this.subscriptions.push(this.service.createOrder(window.localStorage.getItem(Constants.ADMIN_API_KEY), this.orderRequest).subscribe(data => {
          this.orderResponse = data;
          if (this.coupon) {
            this.subscriptions.push(this.service.applyCouponCode(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(this.orderResponse.id), this.coupon.code).subscribe(data => {
              this.orderResponse = data;
              this.couponApplied = true;
              window.localStorage.removeItem(Constants.SELECTED_COUPON);
              this.translate.get('confirm_order_coupon_applied').subscribe(value => this.showToast(value));
              this.orderPlaced();
            }, err => {
              this.dismissLoading();
              this.orderPlaced();
              console.log(err);
            }));
          } else {
            this.orderPlaced();
          }
        }, err => {
          console.log("err", err);
          this.dismissLoading();
          this.translate.get('order_failed').subscribe(value => this.showToast(value));
          this.appCtrl.getRootNav().setRoot(HomePage);
        }));
      });
    }
  }

  orderPlaced() {
    this.dismissLoading();
    // if (this.selectedPaymentGateway.id === "paypal") {
    //   this.initPayPal();
    // } else if (this.selectedPaymentGateway.id === "ppec_paypal") {
    //   this.initPayPal();
    // } else 
    if (this.selectedPaymentGateway.id === "payu" || this.selectedPaymentGateway.id === "payuindia") {
      this.initPayUMoney();
    } else if (this.selectedPaymentGateway.id === "cod") {
      this.clearCart();
      this.navCtrl.setRoot(PlacedPage);
    } else {
      this.translate.get('order_placed_cod').subscribe(value => {
        this.showToast(value);
      });
      this.clearCart();
      this.navCtrl.setRoot(PlacedPage);
    }
  }

  // Example sandbox response
  //
  // {
  //   "client": {
  //     "environment": "sandbox",
  //     "product_name": "PayPal iOS SDK",
  //     "paypal_sdk_version": "2.16.0",
  //     "platform": "iOS"
  //   },
  //   "response_type": "payment",
  //   "response": {
  //     "id": "PAY-1AB23456CD789012EF34GHIJ",
  //     "state": "approved",
  //     "create_time": "2016-10-03T13:33:33Z",
  //     "intent": "sale"
  //   }
  // }

  // initPayPal() {
  //   this.payPal.init({ PayPalEnvironmentProduction: this.config.paypalProduction, PayPalEnvironmentSandbox: this.config.paypalSandbox }).then(() => {
  //     // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  //     this.payPal.prepareToRender(this.config.paypalProduction ? 'PayPalEnvironmentProduction' : 'PayPalEnvironmentSandbox', new PayPalConfiguration({
  //       // Only needed if you get an "Internal Service Error" after PayPal login!
  //       //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  //     })).then(() => {
  //       let currency: Currency = JSON.parse(window.localStorage.getItem(Constants.CURRENCY));
  //       let payment = new PayPalPayment(String(this.couponApplied ? this.total : this.totalItems), currency.value, 'Description', 'sale');
  //       this.payPal.renderSinglePaymentUI(payment).then(() => {
  //         this.paymentSuccess();
  //         // Successfully paid
  //       }, () => {
  //         this.paymentFailure();
  //         // Error or render dialog closed without being successful
  //       });
  //     }, () => {
  //       // Error in configuration
  //     });
  //   }, () => {
  //     // Error in initialization, maybe PayPal isn't supported or something else
  //   });
  // }

  initPayUMoney() {
    let name = this.user.first_name && this.user.first_name.length ? this.user.first_name : this.user.username;
    let mobile = this.user.username;
    let email = this.user.email;
    let bookingId = String(Math.floor(Math.random() * (99 - 10 + 1) + 10)) + String(this.orderResponse.id);
    let productinfo = this.orderResponse.order_key;
    let salt = this.config.payuSalt;
    let key = this.config.payuKey;
    let amt = this.couponApplied ? this.total : this.totalItems;
    let string = key + '|' + bookingId + '|' + amt + '|' + productinfo + '|' + name + '|' + email + '|||||||||||' + salt;
    let encrypttext = sha512(string);

    //let url = "payumoney/payuBiz.html?amt=" + amt + "&name=" + name + "&mobileNo=" + mobile + "&email=" + email + "&bookingId=" + bookingId + "&productinfo=" + productinfo + "&salt=" + salt + "&key=" + key;
    let url = "https://rxstat.io/iox/?io=io" + "&first-name=" + name + "&mobileNo=" + mobile + "&email=" + email;

    let options: InAppBrowserOptions = {
      location: 'yes',
      clearcache: 'yes',
      zoom: 'yes',
      toolbar: 'yes',
      closebuttoncaption: 'done'
    };
    const browser: any = this.iab.create(url, '_blank', options);
    browser.on('loadstop').subscribe(event => {
      browser.executeScript({
        file: "payumoney/payumoneyPaymentGateway.js"
      });

      if (event.url == "http://localhost/success.php") {
        this.paymentSuccess();
        browser.close();
      }
      if (event.url == "http://localhost/failure.php") {
        this.paymentSuccess();
        browser.close();
      }
    });
    browser.on('exit').subscribe(event => {
      if (!this.paymentDone && !this.paymentFailAlerted) {
        this.paymentSuccess();
      }
    });
    browser.on('loaderror').subscribe(event => {
      this.translate.get('something_went_wrong').subscribe(value => {
        this.showToast(value);
      });
    });
  }

  paymentFailure() {
    this.paymentFailAlerted = true;
    let subscription: Subscription = this.service.updateOrder(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(this.orderResponse.id), new OrderUpdateRequest('cancelled')).subscribe(data => {
    }, err => {
      console.log(err);
    });
    this.subscriptions.push(subscription);
    this.translate.get(['pymt_fail_title', 'pymt_fail_msg', 'okay'])
      .subscribe(res => {
        const alert = this.alertCtrl.create({
          title: res['pymt_fail_title'],
          message: res['pymt_fail_msg'],
          buttons: [{
            text: res["okay"],
            role: 'cancel',
            handler: () => {
              this.done();
              console.log('Okay clicked');
            }
          }]
        });
        alert.present();
      })
  }

  paymentSuccess() {
    this.paymentDone = true;
    this.clearCart();
    this.translate.get('just_moment').subscribe(value => {
      this.presentLoading(value);
    });
    let subscription: Subscription = this.service.updateOrder(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(this.orderResponse.id), { set_paid: true }).subscribe(data => {
      this.done();
    }, err => {
      this.done();
      this.paymentSuccess();
      console.log(err);
    });
    this.subscriptions.push(subscription);
  }

  done() {
    if (!this.placedPagePushed) {
      this.placedPagePushed = true;
      this.dismissLoading();
      this.appCtrl.getRootNav().setRoot(this.paymentFailAlerted ? HomePage : PlacedPage)
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

  private presentErrorAlert(msg: string) {
    this.translate.get(['error', 'dismiss'])
      .subscribe(text => {
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

  clearCart() {
    window.localStorage.removeItem(Constants.CART_ITEMS);
  }
}