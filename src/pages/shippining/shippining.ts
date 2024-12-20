import { Component } from '@angular/core';
import { ModalController, Loading, LoadingController } from 'ionic-angular';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { CodePage } from '../code/code';
import { AddressSelectPage } from '../addressselect/addressselect';
import { Product } from "../../models/product.models";
import { Global } from '../../providers/global';
import { Address } from "../../models/address.models";
import { Constants } from "../../models/constants.models";
import { CartItem } from "../../models/cart-item.models";
import { Currency } from "../../models/currency.models";
import { Coupon } from '../../models/coupon.models';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { Helper } from '../../models/helper.models';
import { ShippingZoneLocation } from '../../models/shipping-zone-location.models';
import { SelectShippingPage } from '../selectshipping/selectshipping';
import { Subscription } from 'rxjs/Subscription';
import { WordpressClient } from '../../providers/wordpress-client.service';

@Component({
  selector: 'page-shippining ',
  templateUrl: 'shippining.html',
  providers: [WordpressClient]
})
export class ShippiningPage {
  private cartItems: Array<CartItem>;
  private selectedAddress: Address;
  private editMainCart: boolean = false;
  private total: number = 0;
  private total_items = 0;
  private total_items_html: string = '0';
  private total_html: string = '0';
  private deliveryPayble: string = '0';
  private couponAmount: string = '0';
  private addressChangeText = 'Change';
  private currencyIcon: string = '';
  private currencyText: string = '';
  private coupon: Coupon;
  private servicefee: number = 0;
  private cartTotal = 0;
  private serviceHtml: string;
  private loading: Loading;
  private loadingShown: Boolean = false;
  private subscriptions: Array<Subscription> = [];

  constructor(private translate: TranslateService, private modalCtrl: ModalController, private navCtrl: NavController,
    private navParams: NavParams, private global: Global, private toastCtrl: ToastController,
    private loadingCtrl: LoadingController, private service: WordpressClient) {
    let product: Product = this.navParams.get('pro');
    if (product == null) {
      this.cartItems = global.getCartItems();
      this.editMainCart = true;
    } else {
      let cartItems = new Array<CartItem>();
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.product_id = product.id;
      cartItem.quantity = 1;
      cartItems.push(cartItem);
      this.cartItems = cartItems;
    }
    let currency: Currency = JSON.parse(window.localStorage.getItem(Constants.CURRENCY));
    if (currency) {
      this.currencyText = currency.value;
      let iconText = currency.options[currency.value];
      this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
    }
    this.deliveryPayble = this.currencyIcon + ' ' + this.deliveryPayble;
    let serviceFee = Helper.getSetting("mobile_ecommerce_service_fee");
    if (serviceFee) {
      this.servicefee = Number(Number(serviceFee).toFixed());
      if (this.currencyIcon) {
        this.serviceHtml = this.currencyIcon + " " + this.servicefee.toFixed(2);
      } else if (this.currencyText) {
        this.serviceHtml = this.currencyText + " " + this.servicefee.toFixed(2);
      } else {
        this.serviceHtml = this.servicefee.toFixed(2);
      }
    }
    this.calculateTotal();
    window.localStorage.removeItem(Constants.SELECTED_COUPON);
  }

  ionViewDidEnter() {
    this.selectedAddress = JSON.parse(window.localStorage.getItem(Constants.SELECTED_ADDRESS));
    this.translate.get(this.selectedAddress == null ? "add" : "change").subscribe(value => this.addressChangeText = value);
  }

  addressPage() {
    this.navCtrl.push(AddressSelectPage, { action: 'choose' });
  }

  removeItem(product) {
    if (this.editMainCart) {
      this.global.removeCartItem(product);
      this.cartItems = this.global.getCartItems();
      this.calculateTotal();
    } else {
      let pos: number = -1;
      for (let i = 0; i < this.cartItems.length; i++) {
        if (product.id == this.cartItems[i].product_id) {
          pos = i;
          break;
        }
      }
      if (pos != -1) {
        this.cartItems.splice(pos, 1);
        this.cartItems = this.cartItems;
      }
    }

    if (this.cartItems.length == 0) {
      this.navCtrl.pop();
    }
  }

  decrementItem(product) {
    if (this.editMainCart) {
      var decremented: boolean = this.global.decrementCartItem(product);
      if (!decremented) {
        this.cartItems = this.global.getCartItems();
      }
      this.calculateTotal();
    } else {
      let pos: number = -1;
      for (let i = 0; i < this.cartItems.length; i++) {
        if (product.id == this.cartItems[i].product_id) {
          pos = i;
          break;
        }
      }
      if (pos != -1) {
        if (this.cartItems[pos].quantity > 1) {
          this.cartItems[pos].quantity = this.cartItems[pos].quantity - 1;
          this.cartItems = this.cartItems;
        } else {
          this.cartItems.splice(pos, 1);
          this.cartItems = this.cartItems;
        }
        this.calculateTotal();
      }
    }

    if (this.cartItems.length == 0) {
      this.navCtrl.pop();
    }
  }

  incrementItem(product) {
    if (this.editMainCart) {
      var incremented: boolean = this.global.incrementCartItem(product);
      if (incremented) {
        this.calculateTotal();
      }
    } else {
      let pos: number = -1;
      for (let i = 0; i < this.cartItems.length; i++) {
        if (product.id == this.cartItems[i].product_id) {
          pos = i;
          break;
        }
      }
      if (pos != -1) {
        this.cartItems[pos].quantity = this.cartItems[pos].quantity + 1;
        this.cartItems = this.cartItems;
        this.calculateTotal();
      }
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

  calculateTotal() {
    this.cartTotal = 0;
    let sum: number = 0;
    for (let item of this.cartItems) {
      sum = sum + Number(item.product.sale_price) * item.quantity;
    }
    this.cartTotal = this.cartTotal + sum;
    this.total_items = sum;
    this.total = (sum - (this.coupon ? this.coupon.discount_type == 'percent' ? (sum * Number(this.coupon.amount) / 100) : Number(this.coupon.amount) : 0));
    this.total_items_html = this.currencyIcon + ' ' + this.total_items.toFixed(2);
    this.total_html = this.currencyIcon + ' ' + this.total.toFixed(2);
  }

  paymentPage() {
    if (this.selectedAddress == null) {
      this.translate.get('field_error_address').subscribe(value => this.showToast(value));
    } else {
      let shippingZoneLocation = this.matchZone();
      console.log('szl match', shippingZoneLocation);
      if (shippingZoneLocation) {
        this.translate.get('fetch_shipping_methods').subscribe(value => {
          this.presentLoading(value);
          this.subscriptions.push(this.service.shippingZoneMethods(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(shippingZoneLocation.zoneId)).subscribe(data => {
            for (let d of data) d.costToShow = this.currencyIcon + ' ' + d.cost;
            this.dismissLoading();
            if (!this.coupon) window.localStorage.removeItem(Constants.SELECTED_COUPON);
            this.navCtrl.push(data && data.length ? SelectShippingPage : PaymentPage, { cart: this.cartItems, totalItems: this.total_items, total: this.total, coupon: this.coupon, shipping_methods: data });
          }, err => {
            this.dismissLoading();
            console.log('ErrShippingZoneLocation', err);
            if (!this.coupon) window.localStorage.removeItem(Constants.SELECTED_COUPON);
            this.navCtrl.push(PaymentPage, { cart: this.cartItems, totalItems: this.total_items, total: this.total, coupon: this.coupon });
          }));
        });
      } else {
        if (!this.coupon) window.localStorage.removeItem(Constants.SELECTED_COUPON);
        this.navCtrl.push(PaymentPage, { cart: this.cartItems, totalItems: this.total_items, total: this.total, coupon: this.coupon });
      }
    }
  }

  matchZone(): ShippingZoneLocation {
    let matched: ShippingZoneLocation;
    let shippingZoneLocations: Array<ShippingZoneLocation> = JSON.parse(window.localStorage.getItem(Constants.SHIPPING_ZONE_LOCATIONS));
    if (shippingZoneLocations) {
      for (let szl of shippingZoneLocations) {
        if (szl.type == "postcode") {
          if (szl.code.toLocaleLowerCase().includes(this.selectedAddress.postcode.toLocaleLowerCase()) || this.selectedAddress.postcode.toLocaleLowerCase().includes(szl.code.toLocaleLowerCase())) {
            matched = szl;
            break;
          }
          if (szl.code.toLocaleLowerCase().includes(".")) {
            let code = szl.code.split(".");
            if (code && code.length >= 4) {
              let min = code[0];
              let max = code[3].trim();
              if (Number(this.selectedAddress.postcode) >= Number(min) && Number(this.selectedAddress.postcode) <= Number(max)) {
                matched = szl;
                break;
              }
            }
          }
        }
      }
      if (!matched && this.selectedAddress.country && this.selectedAddress.state) {
        for (let szl of shippingZoneLocations) {
          if (szl.code == (this.selectedAddress.country + ":" + this.selectedAddress.state)) {
            matched = szl;
            break;
          }
        }
      }
      if (!matched && this.selectedAddress.country) {
        for (let szl of shippingZoneLocations) {
          if (szl.code == this.selectedAddress.country) {
            matched = szl;
            break;
          }
        }
      }
    }
    return matched;
  }

  removeCoupon() {
    this.coupon = null;
    this.calculateTotal();
    window.localStorage.removeItem(Constants.SELECTED_COUPON);
  }

  codePage() {
    let modal = this.modalCtrl.create(CodePage);
    modal.onDidDismiss(() => {
      let coupon: Coupon = JSON.parse(window.localStorage.getItem(Constants.SELECTED_COUPON));
      if (coupon) {
        let allowed = true;
        if (coupon.discount_type == 'fixed_product') {
          allowed = false;
          for (let itemCA of coupon.product_ids) {
            for (let item of this.cartItems) {
              if (itemCA == Number(item.product.id)) {
                allowed = true;
                break;
              }
            }
            if (allowed) { break; }
          }
        }
        if (!allowed) {
          this.translate.get('field_error_invalid_couponcodecart').subscribe(value => this.showToast(value));
        } else {
          if (this.cartTotal < Number(coupon.minimum_amount)) {
            this.translate.get('field_error_minimum_amount_coupon').subscribe(value => this.showToast(value + " " + coupon.minimum_amount));
            return;
          }
          if (this.cartTotal > Number(coupon.maximum_amount)) {
            this.translate.get('field_error_maximum_amount_coupon').subscribe(value => this.showToast(value + " " + coupon.minimum_amount));
            return;
          }
          this.coupon = coupon;
          this.couponAmount = this.currencyIcon + ' ' + this.coupon.amount + (this.coupon.discount_type == 'percent' ? '%' : '');
          this.calculateTotal();
        }
      }
    });
    modal.present();
  }

  goBack() {
    this.navCtrl.pop();
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

}
