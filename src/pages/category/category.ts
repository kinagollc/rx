import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { WordpressClient } from '../../providers/wordpress-client.service';
import { Category } from '../../models/category.models';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../../models/constants.models';
import { ShirtsPage } from '../shirts/shirts';
import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';

@Component({
	selector: 'page-category ',
	templateUrl: 'category.html',
	providers: [WordpressClient]
})
export class CategoryPage {
	private categoriesAllNew = new Array<Category>();
	private categoriesAll: Array<Array<Category>>;
	private catsToShow: Array<Category>;
	private subscriptions: Array<Subscription> = [];
	private pageCategory: number = 1;
	private firstTime: boolean;

	constructor(private translate: TranslateService, private navCtrl: NavController,
		private toastCtrl: ToastController, private service: WordpressClient, private modalCtrl: ModalController) {
		let categoriesAll: Array<Category> = JSON.parse(window.localStorage.getItem(Constants.PRODUCT_CATEGORIES));
		this.firstTime = categoriesAll == null;
		this.setupCategories(categoriesAll);
		this.translate.get('refreshing').subscribe(value => {
			this.showToast(value);
		});
		this.refreshCategories();
	}

	ionViewWillLeave() {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
	}

	refreshCategories() {
		let subscription: Subscription = this.service.categories(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(this.pageCategory)).subscribe(data => {
			let categories: Array<Category> = data;
			if (categories.length == 0) {
				window.localStorage.setItem(Constants.PRODUCT_CATEGORIES, JSON.stringify(this.categoriesAllNew));
				console.log('categories setup success');
				this.setupCategories(this.categoriesAllNew);
			} else {
				this.categoriesAllNew = this.categoriesAllNew.concat(categories);
				if (this.firstTime) {
					this.setupCategories(this.categoriesAllNew);
				}
				this.pageCategory++;
				this.refreshCategories();
			}
		}, err => {
			console.log('categories setup error');
		});
		this.subscriptions.push(subscription);
	}

	setupCategories(savedCats: Array<Category>) {
		if (savedCats && savedCats.length) {
			this.categoriesAll = new Array<Array<Category>>();
			let parentWithChild: Array<Category>;
			for (let catP of savedCats) {
				if (Number(catP.parent) == 0) {
					parentWithChild = new Array<Category>();
					for (let catC of savedCats) {
						if (Number(catP.id) == Number(catC.parent)) {
							parentWithChild.push(catC);
						}
					}
					if (parentWithChild.length == 0) {
						continue;
					}
					parentWithChild.unshift(catP);
					this.categoriesAll.push(parentWithChild);
				}
			}
			this.catsToShow = this.categoriesAll[0];
		}
	}

	showCats(cats) {
		this.catsToShow = cats;
	}

	shirtsPage(cat: Category) {
		if (cat.id != '-1') {
			this.navCtrl.push(ShirtsPage, { cat: cat });
		}
	}

	searchPage() {
		let modal = this.modalCtrl.create(SearchPage);
		modal.present();
	}

	cartPage() {
		let modal = this.modalCtrl.create(CartPage);
		modal.present();
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

}