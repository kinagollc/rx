import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { Global } from '../../providers/global';
import { Product } from "../../models/product.models";
import { ItemdetailPage } from '../itemdetail/itemdetail';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-wishlist ',
  templateUrl: 'wishlist.html'
})
export class WishlistPage {
  private productsAll = new Array<Array<Product>>();
  private favorites = new Array<Product>();
  private cartTotal = 0;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    private global: Global, private translate: TranslateService, private toastCtrl: ToastController) {
    this.favorites = global.getFavorites();
    this.listFavorites();
  }

  listFavorites() {
    let proSplit = new Array<Product>();
    let productsAll = new Array<Array<Product>>();
    for (let pro of this.favorites) {
      if (proSplit.length == 2) {
        productsAll.push(proSplit);
        proSplit = new Array<Product>();
      }
      pro.favorite = true;
      proSplit.push(pro);
    }
    if (proSplit.length > 0) {
      productsAll.push(proSplit);
    }
    this.productsAll = productsAll;
  }

  toggleFavorite(pro) {
    pro.favorite = this.global.toggleFavorite(pro);
    this.listFavorites();
  }

  itemdetailPage(pro) {
    this.navCtrl.push(ItemdetailPage, { pro: pro, pros: this.favorites });
  }

  ionViewDidEnter() {
    this.cartTotal = Number(this.global.getCartItemsCount());
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

  cartPage() {
    let modal = this.modalCtrl.create(CartPage);
    modal.onDidDismiss(() => {
      //this.listFavorites();
      this.cartTotal = Number(this.global.getCartItemsCount());
    });
    modal.present();
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}