import { Component } from '@angular/core';
import { NavController, AlertController, Loading, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Global } from '../../providers/global';
import { WordpressClient } from '../../providers/wordpress-client.service';
import { Subscription } from "rxjs/Subscription";
import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';
import { Vendor_profilePage } from '../vendor_profile/vendor_profile';
import { ShippiningPage } from '../shippining/shippining';
import { Product } from "../../models/product.models";
import { Review } from "../../models/review.models";
import { Constants } from "../../models/constants.models";
import { SocialSharing } from '@ionic-native/social-sharing';
import { UserResponse } from '../../models/user-response.models';
import { LoginPage } from '../login/login';
import { Currency } from '../../models/currency.models';
import { Image } from '../../models/image.models';
import { ShirtsPage } from '../shirts/shirts';
import { CategoryPage } from '../category/category';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

@Component({
  selector: 'page-itemdetail ',
  templateUrl: 'itemdetail.html',
  providers: [WordpressClient]
})
export class ItemdetailPage {
  private loading: Loading;
  private loadingShown: Boolean = false;
  private subscriptions: Array<Subscription> = [];
  private product: Product;
  private details: boolean = false;
  private reviews: Array<Review>;
  private productsResponse = new Array<Product>();
  private productVariations = new Array<Product>();
  private imageToDisplay: string;
  private currencyIcon: string;
  private currencyText: string;
  private cartTotal = 0;

  constructor(private translate: TranslateService, private socialSharing: SocialSharing, private navCtrl: NavController,
    private toastCtrl: ToastController, private modalCtrl: ModalController, private global: Global,
    private navParams: NavParams, private service: WordpressClient, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.product = this.navParams.get('pro');
    if (this.product) {
      this.product.favorite = global.isFavorite(this.product);
      let productsResponse: Array<Product> = this.navParams.get('pros');
      if (productsResponse && productsResponse.length) {
        for (let i = productsResponse.length - 1; i >= 0; i--) {
          if (productsResponse[i].id != this.product.id) {
            productsResponse[i].favorite = global.isFavorite(productsResponse[i]);
            this.productsResponse.push(productsResponse[i]);
          }
        }
      }
      if (this.product.images && this.product.images.length) {
        this.imageToDisplay = this.product.images[0].src;
      }
      this.loadReviews();
      if (this.product.type == 'variable') {
        this.loadVariations();
      }
    } else {
      this.loadProductById(this.navParams.get('pro_id'));
    }
  }

  ionViewWillLeave() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.dismissLoading();
  }

  ionViewDidEnter() {
    this.cartTotal = Number(this.global.getCartItemsCount());
  }

  loadProductById(proId) {
    this.translate.get('loading_products').subscribe(value => {
      this.presentLoading(value);
    });
    let subscription: Subscription = this.service.productById(window.localStorage.getItem(Constants.ADMIN_API_KEY), proId).subscribe(data => {
      this.product = data;
      this.product.favorite = this.global.isFavorite(this.product);
      if (this.product.images && this.product.images.length) {
        this.imageToDisplay = this.product.images[0].src;
      }
      if (!this.currencyText) {
        let currency: Currency = JSON.parse(window.localStorage.getItem(Constants.CURRENCY));
        if (currency) {
          this.currencyText = currency.value;
          let iconText = currency.options[currency.value];
          this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
        }
      }
      if (!this.product.sale_price) {
        this.product.sale_price = this.product.regular_price;
      }
      if (this.currencyIcon) {
        this.product.regular_price_html = this.currencyIcon + ' ' + this.product.regular_price;
        this.product.sale_price_html = this.currencyIcon + ' ' + this.product.sale_price;
      } else if (this.currencyText) {
        this.product.regular_price_html = this.currencyText + ' ' + this.product.regular_price;
        this.product.sale_price_html = this.currencyText + ' ' + this.product.sale_price;
      }
      this.loadReviews();
      if (this.product.type == 'variable') {
        this.loadVariations();
      }
      this.dismissLoading();
    }, err => {
    });
    this.subscriptions.push(subscription);
  }

  loadVariations() {
    this.translate.get('loading_versions').subscribe(value => {
      this.presentLoading(value);
    });
    // this.presentLoading('Loading variations');
    let subscription: Subscription = this.service.productVariations(window.localStorage.getItem(Constants.ADMIN_API_KEY), this.product.id).subscribe(data => {
      let variations: Array<Product> = data;
      for (let vari of variations) {
        let variAttris = '';
        for (let i = 0; i < vari.attributes.length; i++) {
          let attri = vari.attributes[i].name + ' ' + vari.attributes[i].option + (i < vari.attributes.length - 1 ? ', ' : '');
          variAttris = variAttris + attri;
        }

        vari.name = this.product.name + ' - ' + variAttris;
        vari.type = 'variable';
        vari.images = new Array<Image>();
        vari.images.push(vari.image);

        if (!this.currencyText) {
          let currency: Currency = JSON.parse(window.localStorage.getItem(Constants.CURRENCY));
          if (currency) {
            this.currencyText = currency.value;
            let iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
          }
        }
        if (!vari.sale_price) {
          vari.sale_price = vari.regular_price;
        }
        if (this.currencyIcon) {
          vari.regular_price_html = this.currencyIcon + ' ' + vari.regular_price;
          vari.sale_price_html = this.currencyIcon + ' ' + vari.sale_price;
        } else if (this.currencyText) {
          vari.regular_price_html = this.currencyText + ' ' + vari.regular_price;
          vari.sale_price_html = this.currencyText + ' ' + vari.sale_price;
        }
      }
      this.productVariations = variations;
      this.dismissLoading();
    }, err => {
    });
    this.subscriptions.push(subscription);
  }

  showImage(src) {
    this.imageToDisplay = src;
  }

  // presentImage(myImage) {
  //   const imageViewer = this.imageViewerCtrl.create(myImage);
  //   imageViewer.present();
  // }

  loadReviews() {
    let subscription: Subscription = this.service.productsReviews(window.localStorage.getItem(Constants.ADMIN_API_KEY), this.product.id).subscribe(data => {
      let reviews: Array<Review> = data;
      let approved = new Array<Review>();
      for (let rev of reviews) {
        if (rev.verified) {
          approved.push(rev);
        }
      }
      this.reviews = approved;
    }, err => {
    });
    this.subscriptions.push(subscription);
  }

  viewMoreSimilar() {
    let cat = this.product && this.product.categories.length ? this.product.categories[0] : null;
    if (cat && cat.id != '-1') {
      this.navCtrl.push(ShirtsPage, { cat: cat });
    } else {
      this.navCtrl.push(CategoryPage);
    }
  }

  itemdetailPage(pro) {
    this.navCtrl.push(ItemdetailPage, { pro: pro, pros: this.productsResponse });
  }

  viewMore() {
    this.details = true;
  }

  viewLess() {
    this.details = false;
  }

  toggleFavorite(pro) {
    pro.favorite = this.global.toggleFavorite(pro);
  }

  shareProduct(pro) {
    this.translate.get('share_msg').subscribe(value => {
      this.socialSharing.share(value, pro.name, null, pro.permalink).then((data) => {
        console.log(data);
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  addVariation(variation) {
    if (variation.in_stock && variation.purchasable) {
      let added: boolean = this.global.addCartItem(variation);
      if (added) {
        this.cartTotal = this.cartTotal + 1;
      }
      this.translate.get(added ? 'card_update1' : 'card_update2').subscribe(value => {
        this.showToast(value);
      });
    } else {
      this.translate.get("item_empty").subscribe(value => {
        this.showToast(value);
      });
    }
  }

  buyVariation(variation) {
    let user: UserResponse = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
    if (user != null) {
      let added: boolean = this.global.addCartItem(variation);
      if (added) {
        this.cartTotal = this.cartTotal + 1;
      }
      this.navCtrl.push(ShippiningPage);
    } else {
      this.translate.get("no_sign_in").subscribe(value => {
        this.showToast(value);
      });
      // this.showToast('Sign in to continue');
      this.navCtrl.push(LoginPage);
    }
  }

  addToCart() {
    if (this.product.in_stock && this.product.purchasable) {
      let added: boolean = this.global.addCartItem(this.product);
      if (added) {
        this.cartTotal = this.cartTotal + 1;
      }
      this.translate.get(added ? 'card_update1' : 'card_update2').subscribe(value => {
        this.showToast(value);
      });
    } else {
      this.translate.get("item_empty").subscribe(value => {
        this.showToast(value);
      });
    }
  }

  buyNow() {
    let user: UserResponse = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
    if (user != null) {
      let added: boolean = this.global.addCartItem(this.product);
      if (added) {
        this.cartTotal = this.cartTotal + 1;
      }
      this.navCtrl.push(ShippiningPage);
    } else {
      this.translate.get("no_sign_in").subscribe(value => {
        this.showToast(value);
      });
      this.navCtrl.push(LoginPage);
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

  searchPage() {
    let modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }

  cartPage() {
    let modal = this.modalCtrl.create(CartPage);
    modal.onDidDismiss(() => {
      this.cartTotal = Number(this.global.getCartItemsCount());
    });
    modal.present();
  }
  vendor_profile() {
    this.navCtrl.push(Vendor_profilePage)
  }
	
	
}