import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concatMap';
import { Observable } from "rxjs/Observable";

import { APP_CONFIG, AppConfig } from "../app/app.config";
import { Category } from "../models/category.models";
import { AuthResponse } from "../models/auth-response.models";
import { AuthCredential } from "../models/auth-credential.models";
import { RegisterRequest } from "../models/register-request.models";
import { RegisterResponse } from "../models/register-response.models";
import { UserResponse } from "../models/user-response.models";
import { Product } from "../models/product.models";
import { Review } from "../models/review.models";
import { PaymentGateway } from "../models/payment-gateway.models";
import { OrderRequest } from "../models/order-request.models";
import { PrescriptionResponse } from "../models/prescription-response.models";
import { Order } from "../models/order.models";
import { ShippingLine } from "../models/shipping-line.models";
import { Currency } from "../models/currency.models";
import { Coupon } from '../models/coupon.models';
import { Banner } from '../models/banner.models';
import { ResetPasswordResponse } from '../models/reset-password-response.models';
import { Helper } from '../models/helper.models';
import { SettingResponse } from '../models/setting-response.models';
import { Constants } from '../models/constants.models';
import { ShippingZone } from '../models/shipping-zone.models';
import { ShippingZoneLocation } from '../models/shipping-zone-location.models';
import { ShippingMethod } from '../models/shipping-method.models';

interface SocialToken {
	token: string
}
interface Country {
	name: string;
	callingCodes: any;
	code: string;
	alpha2Code: string;
}

@Injectable()
export class WordpressClient {

	constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {

	}

	convertToParams(data) {
		var p = [];
		for (var key in data) {
			p.push(key + '=' + encodeURIComponent(data[key]));
		}
		return p.join('&');
	}

	public checkToken(adminToken, idToken: any): Observable<SocialToken> {
		const data = this.convertToParams({ token: idToken })
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				// 'Content-Type':  'application/x-www-form-urlencoded',
				'Authorization': adminToken
			})
		}
		let token = this.http.post<SocialToken>(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/jwt/token/firebase', { token: idToken }, httpOptions);
		return token.concatMap(data => {
			return Observable.of(data);
		});
	}

	public getSettings(adminToken: string): Observable<SettingResponse> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<SettingResponse>(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/settings/list', { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public getCountries(): Observable<Array<Country>> {
		// return this.http
		// .get<Array<Country>>('https://restcountries.eu/rest/v2/all')
		return this.http.get<Array<Country>>('./assets/json/countries.json').concatMap((data) => {
			return Observable.of(data);
		});
	}

	public getUser(adminToken: string, userId: string): Observable<UserResponse> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<UserResponse>(this.config.apiBase + 'wp-json/wc/v2/customers/' + userId, { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public updateUser(adminToken: string, userId: string, userUpdateRequest: any): Observable<UserResponse> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.put<UserResponse>(this.config.apiBase + 'wp-json/wc/v2/customers/' + userId, JSON.stringify(userUpdateRequest), { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public createUser(adminToken: string, countryCode: string, credentials: RegisterRequest): Observable<RegisterResponse> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.post<RegisterResponse>(this.config.apiBase + 'wp-json/wp/v2/users', JSON.stringify(new RegisterRequest(credentials.email, countryCode + credentials.username, credentials.password, credentials.first_name, credentials.last_name, credentials.avatar_url)), { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public getAuthToken(credentials: AuthCredential): Observable<AuthResponse> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
		return this.http.post<AuthResponse>(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/jwt/token', JSON.stringify(credentials), { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public resetPassword(userName: string): Observable<ResetPasswordResponse> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
		return this.http.post<ResetPasswordResponse>(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/password/forgot', JSON.stringify({ user_login: userName }), { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public createPrescription(user_id: string, url: string): Observable<PrescriptionResponse> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
		return this.http.post<PrescriptionResponse>(this.config.apiBase + 'wp-json/medizone/v1/prescription/create', JSON.stringify({ user_id: user_id, url: url }), { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public createOrder(adminToken: string, createOrder: OrderRequest): Observable<Order> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.post<Order>(this.config.apiBase + 'wp-json/wc/v2/orders', JSON.stringify(createOrder), { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public myOrders(adminToken: string, customer_id: string, pageNo: string): Observable<Array<Order>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<Order>>(this.config.apiBase + 'wp-json/wc/v2/orders?customer=' + customer_id + '&page=' + pageNo, { headers: myHeaders }).concatMap(data => {
			let lc = Helper.getLocale();
			let currencyIcon: string = '';
            let currencyText: string = '';
            let currency: Currency = JSON.parse(window.localStorage.getItem(Constants.CURRENCY));
            if (currency) {
                currencyText = currency.value;
                let iconText = currency.options[currency.value];
                currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
            }
			for (let i = 0; i < data.length; i++) {
				let order = data[i];
				order.date_created = Helper.formatTimestampDate(order.date_created, lc);

				order.total_html = currencyIcon + " " + Number(order.total).toFixed(2);
				if (Number(order.discount_total) && Number(order.discount_total) > 0) order.discount_total_html = currencyIcon + ' ' + order.discount_total;
				if (Number(order.total_tax) && Number(order.total_tax) > 0) order.total_tax_html = currencyIcon + ' ' + order.total_tax;
				if (Number(order.shipping_total) && Number(order.shipping_total) > 0) order.shipping_total_html = currencyIcon + ' ' + order.shipping_total;
				if (order.line_items && order.line_items.length) {
					for (let line of order.line_items) {
						line.price_html = currencyIcon + ' ' + Number(line.price).toFixed(2);
						line.total_html = currencyIcon + ' ' + Number(line.total).toFixed(2);
						line.subtotal_html = currencyIcon + ' ' + Number(line.subtotal).toFixed(2);
					}
				}
			}
			return Observable.of(data);
		});
	}

	public updateOrder(adminToken: string, orderId: string, orderUpdateRequest: any): Observable<Order> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.put<Order>(this.config.apiBase + 'wp-json/wc/v2/orders/' + orderId, JSON.stringify(orderUpdateRequest), { headers: myHeaders }).concatMap(data => {
			let lc = Helper.getLocale();
			let currencyIcon: string = '';
            let currencyText: string = '';
            let currency: Currency = JSON.parse(window.localStorage.getItem(Constants.CURRENCY));
            if (currency) {
                currencyText = currency.value;
                let iconText = currency.options[currency.value];
                currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
            }
			let order = data;
			order.date_created = Helper.formatTimestampDate(order.date_created, lc);
			order.total_html = currencyIcon + " " + Number(order.total).toFixed(2);
				if (Number(order.discount_total) && Number(order.discount_total) > 0) order.discount_total_html = currencyIcon + ' ' + order.discount_total;
				if (Number(order.total_tax) && Number(order.total_tax) > 0) order.total_tax_html = currencyIcon + ' ' + order.total_tax;
				if (Number(order.shipping_total) && Number(order.shipping_total) > 0) order.shipping_total_html = currencyIcon + ' ' + order.shipping_total;
				if (order.line_items && order.line_items.length) {
					for (let line of order.line_items) {
						line.price_html = currencyIcon + ' ' + Number(line.price).toFixed(2);
						line.total_html = currencyIcon + ' ' + Number(line.total).toFixed(2);
						line.subtotal_html = currencyIcon + ' ' + Number(line.subtotal).toFixed(2);
					}
				}
			return Observable.of(data);
		});
	}


	public shippingLines(adminToken: string): Observable<Array<ShippingLine>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<ShippingLine>>(this.config.apiBase + 'wp-json/wc/v2/shipping_methods', { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public getCouponByCode(adminToken: string, cCode: string): Observable<Array<Coupon>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<Coupon>>(this.config.apiBase + 'wp-json/wc/v2/coupons?code=' + cCode, { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public applyCouponCode(adminToken: string, orderId: string, cCode: string): Observable<Order> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Order>(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/coupon/order/' + orderId + '/apply-coupon?code=' + cCode, { headers: myHeaders }).concatMap(data => {
			let lc = Helper.getLocale();
			let order = data;
			order.date_created = Helper.formatTimestampDate(order.date_created, lc);
			return Observable.of(data);
		});
	}

	public categoriesParent(adminToken: string): Observable<Array<Category>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<Category>>(this.config.apiBase + 'wp-json/wc/v2/products/categories?order=desc&orderby=count&parent=0&per_page=20&_embed', { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public categories(adminToken: string, pageNo: string): Observable<Array<Category>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<Category>>(this.config.apiBase + 'wp-json/wc/v2/products/categories?per_page=20&order=desc&orderby=count&page=' + pageNo + '&_embed', { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public productVariations(adminToken: string, productId: string): Observable<Array<Product>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<Product>>(this.config.apiBase + 'wp-json/wc/v2/products/' + productId + '/variations', { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public productsReviews(adminToken: string, productId: string): Observable<Array<Review>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<Review>>(this.config.apiBase + 'wp-json/wc/v2/products/' + productId + '/reviews', { headers: myHeaders }).concatMap(data => {
			let lc = Helper.getLocale();
			for (let i = 0; i < data.length; i++) {
				let review = data[i];
				review.date_created = Helper.formatTimestampDate(review.date_created, lc);
			}
			return Observable.of(data);
		});
	}

	public banners(): Observable<Array<Banner>> {
		return this.http.get<Array<Banner>>(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/banners/list').concatMap(data => {
			return Observable.of(data);
		});
	}

	public productsAll(adminToken: string, pageNo: string): Observable<Array<Product>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<Product>>(this.config.apiBase + 'wp-json/wc/v2/products?per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public productById(adminToken: string, proId: string): Observable<Product> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Product>(this.config.apiBase + 'wp-json/wc/v2/products/' + proId, { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public productsByQuery(adminToken: string, query: string, pageNo: string): Observable<Array<Product>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<Product>>(this.config.apiBase + 'wp-json/wc/v2/products?search=' + query + '&per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public productsByCategory(adminToken: string, catId: string, pageNo: string): Observable<Array<Product>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<Product>>(this.config.apiBase + 'wp-json/wc/v2/products?category=' + catId + '&per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public currencies(adminToken: string): Observable<Currency> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Currency>(this.config.apiBase + 'wp-json/wc/v2/settings/general/woocommerce_currency', { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public paymentGateways(adminToken: string): Observable<Array<PaymentGateway>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<PaymentGateway>>(this.config.apiBase + 'wp-json/wc/v2/payment_gateways', { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public registerForPushNotification(adminToken: string, userId: string, playerId: string): Observable<any> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.post<any>(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/notification/register/' + userId, JSON.stringify({ 'player_id': playerId }), { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public shippingZones(adminToken: string): Observable<Array<ShippingZone>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<ShippingZone>>(this.config.apiBase + 'wp-json/wc/v3/shipping/zones', { headers: myHeaders }).concatMap(data => {
			return Observable.of(data);
		});
	}

	public shippingZoneLocations(adminToken: string, zoneId: string): Observable<Array<ShippingZoneLocation>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<ShippingZoneLocation>>(this.config.apiBase + 'wp-json/wc/v3/shipping/zones/' + zoneId + '/locations', { headers: myHeaders }).concatMap(data => {
			for (let zl of data) {
				zl.zoneId = zoneId;
			}
			return Observable.of(data);
		});
	}

	public shippingZoneMethods(adminToken: string, zoneId: string): Observable<Array<ShippingMethod>> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<Array<ShippingMethod>>(this.config.apiBase + 'wp-json/wc/v2/shipping/zones/' + zoneId + '/methods', { headers: myHeaders }).concatMap(data => {
			for (let sm of data) {
				if (sm.settings && sm.settings.cost && sm.settings.cost.value && sm.settings.cost.value.length) {
					sm.cost = Number(sm.settings.cost.value);
				} else if (sm.settings && sm.settings.min_amount && sm.settings.min_amount.value && sm.settings.min_amount.value.length) {
					sm.cost = Number(sm.settings.min_amount.value);
				} else {
					sm.cost = -1;
				}
			}
			return Observable.of(data);
		});
	}

	public shippingMethod(adminToken: string, methodId: string): Observable<ShippingMethod> {
		const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': adminToken });
		return this.http.get<ShippingMethod>(this.config.apiBase + 'wp-json/wc/v3/shipping_methods/' + methodId, { headers: myHeaders }).concatMap(sm => {
			if (sm.settings && sm.settings.cost && sm.settings.cost.value && sm.settings.cost.value.length) {
				sm.cost = Number(sm.settings.cost.value);
			} else if (sm.settings && sm.settings.min_amount && sm.settings.min_amount.value && sm.settings.min_amount.value.length) {
				sm.cost = Number(sm.settings.min_amount.value);
			} else {
				sm.cost = -1;
			}
			return Observable.of(sm);
		});
	}
	public getWhatsappDetails() {
        const myHeaders = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get('https://dashboard.vtlabs.dev/whatsapp.php?product_name=medizone', { headers: myHeaders }).concatMap(data => {
            return Observable.of(data);
        });
    }
}