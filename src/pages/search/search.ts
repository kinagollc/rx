import { Component } from '@angular/core';
import { Events, NavController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { WordpressClient } from '../../providers/wordpress-client.service';
import { Global } from '../../providers/global';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product.models';
import { TranslateService } from '@ngx-translate/core';
import { Currency } from '../../models/currency.models';
import { Constants } from '../../models/constants.models';
import { ItemdetailPage } from '../itemdetail/itemdetail';

@Component({
  selector: 'page-search ',
  templateUrl: 'search.html',
  providers: [WordpressClient]
})
export class SearchPage {
  private loading: any;
  private loadingShown: boolean = false;
  private query: string;
  private currencyIcon: string;
  private currencyText: string;
  private subscriptions: Array<Subscription> = [];
  private productsAll = new Array<Array<Product>>();
  private productsResponse = new Array<Product>();
  private productsAllPage: number = 1;
  private queryHistory = new Array<string>();
  private cartTotal = 0;

  constructor(private events: Events, private translate: TranslateService, private viewCtrl: ViewController,
    private toastCtrl: ToastController, private navCtrl: NavController, private service: WordpressClient, private global: Global, private loadingCtrl: LoadingController) {
    let currency: Currency = JSON.parse(window.localStorage.getItem(Constants.CURRENCY));
    if (currency) {
      this.currencyText = currency.value;
      let iconText = currency.options[currency.value];
      this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
    }
    this.queryHistory = global.getSearchHistory();
  }

  ionViewDidEnter() {
    this.cartTotal = Number(this.global.getCartItemsCount());
  }

  ionViewWillLeave() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  addToCart(product) {
    if (product.in_stock && product.purchasable) {
      let added: boolean = this.global.addCartItem(product);
      if (added) {
        this.cartTotal = this.cartTotal + 1;
      }
      this.translate.get(added ? 'item_added' : 'item_updated').subscribe(value => {
        this.showToast(value);
      });
    } else {
      this.translate.get('item_unavailable').subscribe(value => {
        this.showToast(value);
      });
    }
  }

  doSearch() {
    let subscription: Subscription = this.service.productsByQuery(window.localStorage.getItem(Constants.ADMIN_API_KEY), this.query, String(this.productsAllPage))
      .subscribe(data => {
        let products: Array<Product> = data;
        this.productsResponse = products;
        let proSplit = new Array<Product>();
        let productsAll = new Array<Array<Product>>();
        for (let pro of products) {
          if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
            continue;
          if (proSplit.length == 2) {
            productsAll.push(proSplit);
            proSplit = new Array<Product>();
          }
          if (!pro.sale_price) {
            pro.sale_price = pro.regular_price;
          }
          if (this.currencyIcon) {
            pro.regular_price_html = this.currencyIcon + ' ' + pro.regular_price;
            pro.sale_price_html = this.currencyIcon + ' ' + pro.sale_price;
          } else if (this.currencyText) {
            pro.regular_price_html = this.currencyText + ' ' + pro.regular_price;
            pro.sale_price_html = this.currencyText + ' ' + pro.sale_price;
          }
          pro.favorite = this.global.isFavorite(pro);
          proSplit.push(pro);
        }
        if (proSplit.length > 0) {
          productsAll.push(proSplit);
        }
        this.productsAll = productsAll;
        // this.dismissLoading();
      }, err => {
      });
    this.subscriptions.push(subscription);
  }

  doInfinite(infiniteScroll: any) {
    this.productsAllPage++;
    let subscription: Subscription = this.service.productsByQuery(window.localStorage.getItem(Constants.ADMIN_API_KEY), this.query, String(this.productsAllPage)).subscribe(data => {
      let products: Array<Product> = data;
      this.productsResponse = products;
      let proSplit = new Array<Product>();
      for (let pro of products) {
        if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
          continue;
        if (proSplit.length == 2) {
          this.productsAll.push(proSplit);
          proSplit = new Array<Product>();
        }
        if (!pro.sale_price) {
          pro.sale_price = pro.regular_price;
        }
        if (this.currencyIcon) {
          pro.regular_price_html = this.currencyIcon + ' ' + pro.regular_price;
          pro.sale_price_html = this.currencyIcon + ' ' + pro.sale_price;
        } else if (this.currencyText) {
          pro.regular_price_html = this.currencyText + ' ' + pro.regular_price;
          pro.sale_price_html = this.currencyText + ' ' + pro.sale_price;
        }
        pro.favorite = this.global.isFavorite(pro);
        if (this.productsAll && this.productsAll.length && this.productsAll[this.productsAll.length - 1].length == 1) {
					this.productsAll[this.productsAll.length - 1].push(pro);
				} else {
					proSplit.push(pro);
				}
      }
      if (proSplit.length > 0) {
        this.productsAll.push(proSplit);
      }
      infiniteScroll.complete();
    }, err => {
      infiniteScroll.complete();
      console.log(err);
    });
    this.subscriptions.push(subscription);
  }

  itemdetailPage(pro) {
    this.navCtrl.push(ItemdetailPage, { pro: pro, pros: this.productsResponse });
  }

  clearHistory() {
    this.global.clearSearchHistory();
    this.queryHistory = new Array<string>();
  }

  search(q) {
    this.query = q;
    this.productsAllPage = 1;
    this.doSearch();
    this.global.addInSearchHistory(q);
    this.translate.get('searching').subscribe(value => {
      this.showToast(value);
    });
  }

  getItems(searchbar: any) {
    var q = searchbar.srcElement.value;
    if (!q) { return; }
    this.search(q);
  }

  toggleFavorite(pro) {
    pro.favorite = this.global.toggleFavorite(pro);
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  cartPage() {
    this.navCtrl.pop();
    this.events.publish("open:cart");
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