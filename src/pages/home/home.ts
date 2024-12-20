import { Component, Inject } from '@angular/core';
import { NavController, ToastController, MenuController, ModalController, Events, App, LoadingController } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';
import { UploadPage } from '../upload/upload';
import { Category } from "../../models/category.models";
import { Constants } from "../../models/constants.models";
import { Banner } from '../../models/banner.models';
import { AppConfig, APP_CONFIG } from '../../app/app.config';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { WordpressClient } from '../../providers/wordpress-client.service';
import { Global } from '../../providers/global';
import { Subscription } from "rxjs/Subscription";
import { ShirtsPage } from '../shirts/shirts';
import { LoginPage } from '../login/login';
import { Upload_prescriptionPage } from '../upload_prescription/upload_prescription';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BuyAppAlertPage } from '../buyappalert/buyappalert';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [WordpressClient]
})
export class HomePage {
  private products = 'nonprescriptions';
  private subscriptions: Array<Subscription> = [];
  private banners = new Array<Banner>();
  private categoriesAll = new Array<Category>();
  private cartTotal = 0;
  loading: any;
  loadingShown: boolean;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private toastCtrl: ToastController, private translate: TranslateService, private events: Events, private service: WordpressClient, public modalCtrl: ModalController,
    private navCtrl: NavController, private menu: MenuController, private global: Global, private appCtrl: App,
    private loadingCtrl: LoadingController, public inAppBrowser: InAppBrowser) {
    events.subscribe('category:setup', () => {
      this.setupCategories();
    });
    events.subscribe('open:cart', () => {
      this.cartPage();
    });
    this.setupCategories();
    this.loadBanners();
  }

  chooseTab(pos: number) {
    this.products = pos == 0 ? 'nonprescriptions' : 'prescriptions';
  }

  setupCategories() {
    let categories: Array<Category> = JSON.parse(window.localStorage.getItem(Constants.PRODUCT_CATEGORIES_PARENT));
    let cats = new Array<Category>();
    for (let cat of categories) {
      if (cats.length == 8) {
        break;
      }
      if (Number(cat.parent) == 0) {
        cats.push(cat);
      }
    }
    this.translate.get('more').subscribe(value => {
      let more = new Category();
      more.name = value;
      more.id = '-1';
      cats.push(more);
      this.categoriesAll = cats;
    });
  }

  ionViewDidEnter() {
    let tabpos = window.localStorage.getItem("tabpos");
    if (tabpos && tabpos.length && Number(tabpos)) { this.chooseTab(Number(tabpos)); window.localStorage.removeItem("tabpos"); }
    this.cartTotal = Number(this.global.getCartItemsCount());
  }

  loadBanners() {
    let savedBanners: Array<Banner> = JSON.parse(window.localStorage.getItem('banners'));
    if (savedBanners && savedBanners.length) {
      this.banners = savedBanners;
    }
    let subscription: Subscription = this.service.banners().subscribe(data => {
      this.banners = data;
      window.localStorage.setItem('banners', JSON.stringify(this.banners));
    }, err => {
    });
    this.subscriptions.push(subscription);
  }

  menuToggle() {
    if (!this.menu.isEnabled()) {
      this.menu.enable(true);
      this.menu.swipeEnable(true);
    }
    if (this.menu.isOpen()) {
      this.menu.close();
    } else {
      this.menu.open();
    }
  }

  categoryPageId(catId) {
    this.navCtrl.push(ShirtsPage, { catId: catId });
  }

  categoryPage(cat) {
    if (cat && cat.id != '-1') {
      this.navCtrl.push(ShirtsPage, { cat: cat });
    } else {
      this.navCtrl.push(CategoryPage);
    }
  }

  searchPage() {
    this.navCtrl.push(SearchPage);
    // let modal = this.modalCtrl.create(SearchPage);
    // modal.present();
  }

  cartPage() {
    /*this.navCtrl.push(CartPage);*/
    let modal = this.modalCtrl.create(CartPage);
    modal.onDidDismiss(() => {
      this.cartTotal = Number(this.global.getCartItemsCount());
    });
    modal.present();
  }

  uploadPage() {
    let user = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
    if (user) {
      let modal = this.modalCtrl.create(UploadPage);
      modal.present();
      modal.onDidDismiss(url => { if (url && url.length) this.navCtrl.push(Upload_prescriptionPage) });
    } else {
      this.translate.get('auth_required').subscribe(value => {
        this.showToast(value);
      });
      this.appCtrl.getRootNav().push(LoginPage);
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
  presentLoading(message: string) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.onDidDismiss(() => { });
    this.loading.present();
    this.loadingShown = true;
  }

  dismissLoading() {
    if (this.loadingShown) {
      this.loadingShown = false;
      this.loading.dismiss();
    }
  }
  // buyThisApp() {
  //   let profileModal = this.modalCtrl.create(BuyAppAlertPage);
  //   profileModal.present();
  // }
  buyThisApp() {
    this.translate.get('opening_WhatsApp').subscribe(text => {
      this.presentLoading(text);
      this.service.getWhatsappDetails().subscribe((res) => {
        this.dismissLoading();
        return this.inAppBrowser.create(res['link'], '_system');
      }, (err) => {
        console.log("Error rating:", JSON.stringify(err));
        this.dismissLoading();
      });
    });
  }

}
