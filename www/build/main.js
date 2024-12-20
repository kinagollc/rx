webpackJsonp([0],{

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_register_request_models__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_helper_models__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_constants_models__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var WordpressClient = /** @class */ (function () {
    function WordpressClient(config, http) {
        this.config = config;
        this.http = http;
    }
    WordpressClient.prototype.convertToParams = function (data) {
        var p = [];
        for (var key in data) {
            p.push(key + '=' + encodeURIComponent(data[key]));
        }
        return p.join('&');
    };
    WordpressClient.prototype.checkToken = function (adminToken, idToken) {
        var data = this.convertToParams({ token: idToken });
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                // 'Content-Type':  'application/x-www-form-urlencoded',
                'Authorization': adminToken
            })
        };
        var token = this.http.post(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/jwt/token/firebase', { token: idToken }, httpOptions);
        return token.concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.getSettings = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/settings/list', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.getCountries = function () {
        // return this.http
        // .get<Array<Country>>('https://restcountries.eu/rest/v2/all')
        return this.http.get('./assets/json/countries.json').concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.getUser = function (adminToken, userId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/customers/' + userId, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.updateUser = function (adminToken, userId, userUpdateRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.put(this.config.apiBase + 'wp-json/wc/v2/customers/' + userId, JSON.stringify(userUpdateRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.createUser = function (adminToken, countryCode, credentials) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.post(this.config.apiBase + 'wp-json/wp/v2/users', JSON.stringify(new __WEBPACK_IMPORTED_MODULE_7__models_register_request_models__["a" /* RegisterRequest */](credentials.email, countryCode + credentials.username, credentials.password, credentials.first_name, credentials.last_name, credentials.avatar_url)), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.getAuthToken = function (credentials) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/jwt/token', JSON.stringify(credentials), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.resetPassword = function (userName) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/password/forgot', JSON.stringify({ user_login: userName }), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.createPrescription = function (user_id, url) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + 'wp-json/medizone/v1/prescription/create', JSON.stringify({ user_id: user_id, url: url }), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.createOrder = function (adminToken, createOrder) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.post(this.config.apiBase + 'wp-json/wc/v2/orders', JSON.stringify(createOrder), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.myOrders = function (adminToken, customer_id, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/orders?customer=' + customer_id + '&page=' + pageNo, { headers: myHeaders }).concatMap(function (data) {
            var lc = __WEBPACK_IMPORTED_MODULE_8__models_helper_models__["a" /* Helper */].getLocale();
            var currencyIcon = '';
            var currencyText = '';
            var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_9__models_constants_models__["a" /* Constants */].CURRENCY));
            if (currency) {
                currencyText = currency.value;
                var iconText = currency.options[currency.value];
                currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
            }
            for (var i = 0; i < data.length; i++) {
                var order = data[i];
                order.date_created = __WEBPACK_IMPORTED_MODULE_8__models_helper_models__["a" /* Helper */].formatTimestampDate(order.date_created, lc);
                order.total_html = currencyIcon + " " + Number(order.total).toFixed(2);
                if (Number(order.discount_total) && Number(order.discount_total) > 0)
                    order.discount_total_html = currencyIcon + ' ' + order.discount_total;
                if (Number(order.total_tax) && Number(order.total_tax) > 0)
                    order.total_tax_html = currencyIcon + ' ' + order.total_tax;
                if (Number(order.shipping_total) && Number(order.shipping_total) > 0)
                    order.shipping_total_html = currencyIcon + ' ' + order.shipping_total;
                if (order.line_items && order.line_items.length) {
                    for (var _i = 0, _a = order.line_items; _i < _a.length; _i++) {
                        var line = _a[_i];
                        line.price_html = currencyIcon + ' ' + Number(line.price).toFixed(2);
                        line.total_html = currencyIcon + ' ' + Number(line.total).toFixed(2);
                        line.subtotal_html = currencyIcon + ' ' + Number(line.subtotal).toFixed(2);
                    }
                }
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.updateOrder = function (adminToken, orderId, orderUpdateRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.put(this.config.apiBase + 'wp-json/wc/v2/orders/' + orderId, JSON.stringify(orderUpdateRequest), { headers: myHeaders }).concatMap(function (data) {
            var lc = __WEBPACK_IMPORTED_MODULE_8__models_helper_models__["a" /* Helper */].getLocale();
            var currencyIcon = '';
            var currencyText = '';
            var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_9__models_constants_models__["a" /* Constants */].CURRENCY));
            if (currency) {
                currencyText = currency.value;
                var iconText = currency.options[currency.value];
                currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
            }
            var order = data;
            order.date_created = __WEBPACK_IMPORTED_MODULE_8__models_helper_models__["a" /* Helper */].formatTimestampDate(order.date_created, lc);
            order.total_html = currencyIcon + " " + Number(order.total).toFixed(2);
            if (Number(order.discount_total) && Number(order.discount_total) > 0)
                order.discount_total_html = currencyIcon + ' ' + order.discount_total;
            if (Number(order.total_tax) && Number(order.total_tax) > 0)
                order.total_tax_html = currencyIcon + ' ' + order.total_tax;
            if (Number(order.shipping_total) && Number(order.shipping_total) > 0)
                order.shipping_total_html = currencyIcon + ' ' + order.shipping_total;
            if (order.line_items && order.line_items.length) {
                for (var _i = 0, _a = order.line_items; _i < _a.length; _i++) {
                    var line = _a[_i];
                    line.price_html = currencyIcon + ' ' + Number(line.price).toFixed(2);
                    line.total_html = currencyIcon + ' ' + Number(line.total).toFixed(2);
                    line.subtotal_html = currencyIcon + ' ' + Number(line.subtotal).toFixed(2);
                }
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.shippingLines = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/shipping_methods', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.getCouponByCode = function (adminToken, cCode) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/coupons?code=' + cCode, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.applyCouponCode = function (adminToken, orderId, cCode) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/coupon/order/' + orderId + '/apply-coupon?code=' + cCode, { headers: myHeaders }).concatMap(function (data) {
            var lc = __WEBPACK_IMPORTED_MODULE_8__models_helper_models__["a" /* Helper */].getLocale();
            var order = data;
            order.date_created = __WEBPACK_IMPORTED_MODULE_8__models_helper_models__["a" /* Helper */].formatTimestampDate(order.date_created, lc);
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.categoriesParent = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/products/categories?order=desc&orderby=count&parent=0&per_page=20&_embed', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.categories = function (adminToken, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/products/categories?per_page=20&order=desc&orderby=count&page=' + pageNo + '&_embed', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productVariations = function (adminToken, productId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/products/' + productId + '/variations', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsReviews = function (adminToken, productId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/products/' + productId + '/reviews', { headers: myHeaders }).concatMap(function (data) {
            var lc = __WEBPACK_IMPORTED_MODULE_8__models_helper_models__["a" /* Helper */].getLocale();
            for (var i = 0; i < data.length; i++) {
                var review = data[i];
                review.date_created = __WEBPACK_IMPORTED_MODULE_8__models_helper_models__["a" /* Helper */].formatTimestampDate(review.date_created, lc);
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.banners = function () {
        return this.http.get(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/banners/list').concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsAll = function (adminToken, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/products?per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productById = function (adminToken, proId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/products/' + proId, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsByQuery = function (adminToken, query, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/products?search=' + query + '&per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsByCategory = function (adminToken, catId, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/products?category=' + catId + '&per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.currencies = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/settings/general/woocommerce_currency', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.paymentGateways = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/payment_gateways', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.registerForPushNotification = function (adminToken, userId, playerId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.post(this.config.apiBase + 'wp-json/mobile-ecommerce/v1/notification/register/' + userId, JSON.stringify({ 'player_id': playerId }), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.shippingZones = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v3/shipping/zones', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.shippingZoneLocations = function (adminToken, zoneId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v3/shipping/zones/' + zoneId + '/locations', { headers: myHeaders }).concatMap(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var zl = data_1[_i];
                zl.zoneId = zoneId;
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.shippingZoneMethods = function (adminToken, zoneId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v2/shipping/zones/' + zoneId + '/methods', { headers: myHeaders }).concatMap(function (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var sm = data_2[_i];
                if (sm.settings && sm.settings.cost && sm.settings.cost.value && sm.settings.cost.value.length) {
                    sm.cost = Number(sm.settings.cost.value);
                }
                else if (sm.settings && sm.settings.min_amount && sm.settings.min_amount.value && sm.settings.min_amount.value.length) {
                    sm.cost = Number(sm.settings.min_amount.value);
                }
                else {
                    sm.cost = -1;
                }
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.shippingMethod = function (adminToken, methodId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http.get(this.config.apiBase + 'wp-json/wc/v3/shipping_methods/' + methodId, { headers: myHeaders }).concatMap(function (sm) {
            if (sm.settings && sm.settings.cost && sm.settings.cost.value && sm.settings.cost.value.length) {
                sm.cost = Number(sm.settings.cost.value);
            }
            else if (sm.settings && sm.settings.min_amount && sm.settings.min_amount.value && sm.settings.min_amount.value.length) {
                sm.cost = Number(sm.settings.min_amount.value);
            }
            else {
                sm.cost = -1;
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(sm);
        });
    };
    WordpressClient.prototype.getWhatsappDetails = function () {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get('https://dashboard.vtlabs.dev/whatsapp.php?product_name=medizone', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], WordpressClient);
    return WordpressClient;
}());

//# sourceMappingURL=wordpress-client.service.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressSelectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectarea_selectarea__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddressSelectPage = /** @class */ (function () {
    function AddressSelectPage(translate, navCtrl, navParam, toastCtrl, service, loadingCtrl) {
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.addresses = new Array();
        this.loadingShown = false;
        this.subscriptions = [];
        this.select = (navParam.get('action') != null);
    }
    AddressSelectPage.prototype.ionViewDidEnter = function () {
        var addresses = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST));
        if (addresses != null) {
            for (var _i = 0, addresses_1 = addresses; _i < addresses_1.length; _i++) {
                var ad = addresses_1[_i];
                if (!ad.type)
                    ad.type = 1;
            }
            this.addresses = addresses;
        }
    };
    AddressSelectPage.prototype.addressNew = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__selectarea_selectarea__["a" /* SelectareaPage */]);
    };
    AddressSelectPage.prototype.addressEditSelect = function (address) {
        var _this = this;
        if (this.select) {
            for (var _i = 0, _a = this.addresses; _i < _a.length; _i++) {
                var add = _a[_i];
                if (add.id == -100) {
                    add.id = address.id;
                    break;
                }
            }
            address.id = -100;
            var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].USER_KEY));
            user.billing = address;
            user.shipping = address;
            user.first_name = address.first_name;
            //user.last_name = address.last_name;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(user));
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS, JSON.stringify(address));
            this.translate.get('just_moment').subscribe(function (value) {
                _this.presentLoading(value);
            });
            var subscription = this.service.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(user.id), user).subscribe(function (data) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            }, function (err) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            });
            this.subscriptions.push(subscription);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__selectarea_selectarea__["a" /* SelectareaPage */], { address: address });
        }
    };
    AddressSelectPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    AddressSelectPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    AddressSelectPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AddressSelectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addressselect ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/addressselect/addressselect.html"*/'<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<ion-icon class="menu-icon">\n				<img src="assets/imgs/ic_menu.png">\n			</ion-icon>\n		</button>\n		<ion-title>{{\'my_address\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding class="bg-light">\n	<div class="address-section">\n		<p *ngIf="select" text-center>\n			{{\'my_address_heading_select\' | translate}}\n		</p>\n		<p *ngIf="!select" text-center>\n			{{\'my_address_heading_edit\' | translate}}\n		</p>\n\n		<div class="empty-view" *ngIf="!addresses || !addresses.length">\n			<div style="text-align:center">\n				<img src="assets/imgs/ic_home.png" alt="no offers" />\n				<span style="color:#9E9E9E; font-weight:bold;">{{\'address_empty\' | translate}}</span>\n			</div>\n		</div>\n\n		<ion-list no-lines>\n			<ion-item *ngFor="let address of addresses" (click)="addressEditSelect(address)">\n				<ion-label>\n					<div class="img_box">\n						<img *ngIf="address.type == 1" src="assets/imgs/ic_home_active.png">\n						<img *ngIf="address.type == 1" src="assets/imgs/ic_home_active.png">\n						<h3 *ngIf="address.type == 1">{{"address_type_home" | translate}}</h3>\n						<img *ngIf="address.type == 2" src="assets/imgs/ic_office_active.png">\n						<img *ngIf="address.type == 2" src="assets/imgs/ic_office_active.png">\n						<h3 *ngIf="address.type == 2">{{"address_type_office" | translate}}</h3>\n						<img *ngIf="address.type == 3" src="assets/imgs/ic_location_active.png">\n						<img *ngIf="address.type == 3" src="assets/imgs/ic_location_active.png">\n						<h3 *ngIf="address.type == 3">{{"address_type_other" | translate}}</h3>\n					</div>\n					<p>{{address.address_1}}</p>\n				</ion-label>\n				<!-- <ion-radio value="{{address.id}}"></ion-radio> -->\n			</ion-item>\n		</ion-list>\n	</div>\n</ion-content>\n<ion-footer no-border>\n	<button ion-button block outline (click)="addressNew()" class="add_new_location">\n		<ion-icon name="md-add" icon-start></ion-icon>\n		{{\'my_address_add_new\' | translate}}\n	</button>\n</ion-footer>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/addressselect/addressselect.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__node_modules_ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], AddressSelectPage);
    return AddressSelectPage;
}());

//# sourceMappingURL=addressselect.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectareaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_google_maps__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_my_location_models__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_address_title_add_address_title__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_address_models__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SelectareaPage = /** @class */ (function () {
    function SelectareaPage(navCtrl, menuCtrl, loadingCtrl, modalCtrl, navparam, zone, maps, translate, geolocation, toastCtrl, events) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.zone = zone;
        this.maps = maps;
        this.translate = translate;
        this.geolocation = geolocation;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.query = '';
        this.places = [];
        this.modalPresented = false;
        this.subscriptions = [];
        this.loadingShown = false;
        this.menuCtrl.enable(false, 'myMenu');
        this.searchDisabled = true;
        this.saveDisabled = true;
        this.address = navparam.get("address");
    }
    SelectareaPage.prototype.ionViewWillLeave = function () {
        if (this.addressSaveModal)
            this.addressSaveModal.dismiss();
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    SelectareaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (!this.initialized) {
            var mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(function () {
                _this.autocompleteService = new google.maps.places.AutocompleteService();
                _this.placesService = new google.maps.places.PlacesService(_this.maps.map);
                _this.searchDisabled = false;
                _this.maps.map.addListener('click', function (event) {
                    if (event && event.latLng) {
                        _this.onMapClick(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
                    }
                });
                _this.initialized = true;
                if (_this.address && _this.address.address_2) {
                    var address2split = _this.address.address_2.split(",");
                    if (address2split && address2split.length >= 2 && Number(address2split[0]) && Number(address2split[1])) {
                        _this.location = new __WEBPACK_IMPORTED_MODULE_5__models_my_location_models__["a" /* MyLocation */]();
                        _this.location.name = _this.address.address_1;
                        _this.location.lat = address2split[0];
                        _this.location.lng = address2split[1];
                        _this.location.postal_code = _this.address.postcode;
                        _this.onMapClick(new google.maps.LatLng(Number(address2split[0]), Number(address2split[1])));
                    }
                    else {
                        _this.detect();
                    }
                }
                else {
                    _this.detect();
                }
            }).catch(function (err) {
                console.log(err);
                _this.close();
            });
            mapLoaded.catch(function (err) {
                console.log(err);
                _this.close();
            });
        }
    };
    SelectareaPage.prototype.onMapClick = function (pos) {
        var _this = this;
        if (pos) {
            if (!this.marker) {
                this.marker = new google.maps.Marker({ position: pos, map: this.maps.map });
                this.marker.setClickable(true);
                this.marker.addListener('click', function (event) {
                    console.log("markerevent", event);
                    _this.showToast(_this.location.name);
                });
            }
            else {
                this.marker.setPosition(pos);
            }
            this.maps.map.panTo(pos);
            var geocoder = new google.maps.Geocoder();
            var request = { location: pos };
            geocoder.geocode(request, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    console.log("geocode", results[0]);
                    _this.saveDisabled = false;
                    _this.location = new __WEBPACK_IMPORTED_MODULE_5__models_my_location_models__["a" /* MyLocation */]();
                    _this.location.name = results[0].formatted_address;
                    _this.location.lat = String(pos.lat());
                    _this.location.lng = String(pos.lng());
                    _this.location.postal_code = _this.getAddressComponents("postal_code", results[0].address_components);
                    var keyToFind = "administrative_area_level_1";
                    for (var i = 1; i <= 10; i++) {
                        var administrative_area = _this.getAddressComponents(("administrative_area_level_" + i), results[0].address_components);
                        if (administrative_area && administrative_area.length == 2) {
                            keyToFind = ("administrative_area_level_" + i);
                            break;
                        }
                    }
                    console.log("keyToFind", keyToFind);
                    _this.location.state = _this.getAddressComponents(keyToFind, results[0].address_components);
                    _this.location.country = _this.getAddressComponents("country", results[0].address_components);
                    console.log("gen", _this.location);
                    _this.showToast(_this.location.name);
                }
            });
        }
    };
    SelectareaPage.prototype.selectPlace = function (place) {
        var _this = this;
        this.query = place.description;
        setTimeout(function () {
            console.log(_this.query);
        }, 2000);
        this.places = [];
        var myLocation = new __WEBPACK_IMPORTED_MODULE_5__models_my_location_models__["a" /* MyLocation */]();
        myLocation.name = place.name;
        this.placesService.getDetails({ placeId: place.place_id }, function (details) {
            _this.zone.run(function () {
                _this.onMapClick(new google.maps.LatLng(Number(details.geometry.location.lat()), Number(details.geometry.location.lng())));
                // myLocation.name = (details.formatted_address && details.formatted_address.length) ? details.formatted_address : details.name;
                // myLocation.lat = details.geometry.location.lat();
                // myLocation.lng = details.geometry.location.lng();
                // myLocation.postal_code = this.getAddressComponents("postal_code", details.address_components);
                // myLocation.locality = this.getAddressComponents("locality", details.address_components);
                // myLocation.state = this.getAddressComponents("administrative_area_level_1", details.address_components);
                // myLocation.country = this.getAddressComponents("country", details.address_components);
                // this.saveDisabled = false;
                // let lc = { lat: myLocation.lat, lng: myLocation.lng };
                // this.maps.map.setCenter(lc);
                // this.location = myLocation;
                // let pos = new google.maps.LatLng(Number(lc.lat), Number(lc.lng));
                // if (!this.marker)
                //   this.marker = new google.maps.Marker({ position: pos, map: this.maps.map });
                // else
                //   this.marker.setPosition(pos);
                // this.maps.map.panTo(pos);
            });
        });
    };
    SelectareaPage.prototype.getAddressComponents = function (what, addressComponents) {
        var toReturn = "";
        if (addressComponents && addressComponents.length) {
            for (var _i = 0, addressComponents_1 = addressComponents; _i < addressComponents_1.length; _i++) {
                var ac = addressComponents_1[_i];
                if (toReturn.length)
                    break;
                if (ac.types && ac.types.length) {
                    for (var _a = 0, _b = ac.types; _a < _b.length; _a++) {
                        var t = _b[_a];
                        if (t == what) {
                            toReturn = ac.short_name;
                            break;
                        }
                    }
                }
            }
        }
        return toReturn;
    };
    SelectareaPage.prototype.searchPlace = function () {
        var _this = this;
        this.saveDisabled = true;
        if (this.query.length > 0 && !this.searchDisabled) {
            var config = {
                //types: ['geocode'],
                input: this.query
            };
            this.autocompleteService.getPlacePredictions(config, function (predictions, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
                    _this.places = [];
                    predictions.forEach(function (prediction) {
                        _this.places.push(prediction);
                    });
                }
            });
        }
        else {
            this.places = [];
        }
    };
    SelectareaPage.prototype.detect = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            _this.onMapClick(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        }).catch(function (err) {
            console.log("getCurrentPosition", err);
            _this.showToast("Location detection failed");
        });
    };
    SelectareaPage.prototype.save = function () {
        var _this = this;
        if (this.location) {
            var addresses_1 = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST));
            if (!addresses_1)
                addresses_1 = new Array();
            if (!this.address) {
                this.address = new __WEBPACK_IMPORTED_MODULE_7__models_address_models__["a" /* Address */]();
                this.address.id = -1;
                var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].USER_KEY));
                if (user != null) {
                    this.address.first_name = user.first_name;
                    //this.address.last_name = user.last_name;
                    this.address.email = user.email;
                    this.address.phone = user.username;
                }
            }
            this.address.address_1 = this.location.name;
            this.address.address_2 = this.location.lat + "," + this.location.lng;
            this.address.state = this.location.state;
            this.address.country = this.location.country;
            this.address.postcode = this.location.postal_code;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_LOCATION, JSON.stringify(this.location));
            this.addressSaveModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__add_address_title_add_address_title__["a" /* Add_address_titlePage */], { address: this.address });
            this.addressSaveModal.present();
            this.addressSaveModal.onDidDismiss(function (data) {
                _this.modalPresented = false;
                if (data) {
                    _this.address = data;
                    if (_this.address.id == -1) {
                        _this.address.id = addresses_1.length + 1;
                        addresses_1.push(_this.address);
                    }
                    else {
                        var index = -1;
                        for (var i = 0; i < addresses_1.length; i++) {
                            if (_this.address.id == addresses_1[i].id) {
                                index = i;
                                break;
                            }
                        }
                        if (index != -1) {
                            addresses_1[index] = _this.address;
                        }
                    }
                    if (addresses_1.length == 1)
                        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS, JSON.stringify(_this.address));
                    window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST, JSON.stringify(addresses_1));
                    _this.events.publish('address:saved');
                    _this.close();
                }
            });
            this.modalPresented = true;
        }
        else {
            this.translate.get("select_location").subscribe(function (value) { return _this.showToast(value); });
        }
    };
    SelectareaPage.prototype.close = function () {
        console.log("saved", this.location);
        this.navCtrl.pop();
    };
    SelectareaPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SelectareaPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    SelectareaPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], SelectareaPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], SelectareaPage.prototype, "pleaseConnect", void 0);
    SelectareaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-selectarea',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/selectarea/selectarea.html"*/'<ion-header>\n	<ion-navbar color="primary">\n		<ion-title>\n			<span *ngIf="!modalPresented" (click)="close()">{{\'cancel\' | translate}}</span>\n			<button [disabled]="modalPresented" style="font-size: 1.3rem !important;" ion-button class="end"\n				(click)="save()">\n				{{\'continue\' | translate}}\n			</button>\n		</ion-title>\n	</ion-navbar>\n	<ion-toolbar>\n		<ion-row>\n			<ion-col col-11>\n				<ion-searchbar [(ngModel)]="query" (ionInput)="searchPlace()"\n					placeholder="{{\'search_location\' | translate}}"></ion-searchbar>\n			</ion-col>\n			<ion-col col-1>\n				<ion-icon name="md-locate" (click)="detect()"></ion-icon>\n			</ion-col>\n		</ion-row>\n	</ion-toolbar>\n	<ion-list>\n		<ion-item *ngFor="let place of places" (click)="selectPlace(place)">{{place.description}}</ion-item>\n	</ion-list>\n</ion-header>\n<ion-content>\n	<div #pleaseConnect id="please-connect">\n		<p>{{\'please_connect_to_the_internet\' | translate}}</p>\n	</div>\n	<div #map id="map">\n		<ion-spinner></ion-spinner>\n	</div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/selectarea/selectarea.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_3__providers_google_maps__["a" /* GoogleMaps */], __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Events */]])
    ], SelectareaPage);
    return SelectareaPage;
}());

//# sourceMappingURL=selectarea.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShippiningPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment_payment__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__code_code__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__addressselect_addressselect__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_cart_item_models__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_helper_models__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__selectshipping_selectshipping__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_wordpress_client_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ShippiningPage = /** @class */ (function () {
    function ShippiningPage(translate, modalCtrl, navCtrl, navParams, global, toastCtrl, loadingCtrl, service) {
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.service = service;
        this.editMainCart = false;
        this.total = 0;
        this.total_items = 0;
        this.total_items_html = '0';
        this.total_html = '0';
        this.deliveryPayble = '0';
        this.couponAmount = '0';
        this.addressChangeText = 'Change';
        this.currencyIcon = '';
        this.currencyText = '';
        this.servicefee = 0;
        this.cartTotal = 0;
        this.loadingShown = false;
        this.subscriptions = [];
        var product = this.navParams.get('pro');
        if (product == null) {
            this.cartItems = global.getCartItems();
            this.editMainCart = true;
        }
        else {
            var cartItems = new Array();
            var cartItem = new __WEBPACK_IMPORTED_MODULE_7__models_cart_item_models__["a" /* CartItem */]();
            cartItem.product = product;
            cartItem.product_id = product.id;
            cartItem.quantity = 1;
            cartItems.push(cartItem);
            this.cartItems = cartItems;
        }
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
        }
        this.deliveryPayble = this.currencyIcon + ' ' + this.deliveryPayble;
        var serviceFee = __WEBPACK_IMPORTED_MODULE_9__models_helper_models__["a" /* Helper */].getSetting("mobile_ecommerce_service_fee");
        if (serviceFee) {
            this.servicefee = Number(Number(serviceFee).toFixed());
            if (this.currencyIcon) {
                this.serviceHtml = this.currencyIcon + " " + this.servicefee.toFixed(2);
            }
            else if (this.currencyText) {
                this.serviceHtml = this.currencyText + " " + this.servicefee.toFixed(2);
            }
            else {
                this.serviceHtml = this.servicefee.toFixed(2);
            }
        }
        this.calculateTotal();
        window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
    }
    ShippiningPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.selectedAddress = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS));
        this.translate.get(this.selectedAddress == null ? "add" : "change").subscribe(function (value) { return _this.addressChangeText = value; });
    };
    ShippiningPage.prototype.addressPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__addressselect_addressselect__["a" /* AddressSelectPage */], { action: 'choose' });
    };
    ShippiningPage.prototype.removeItem = function (product) {
        if (this.editMainCart) {
            this.global.removeCartItem(product);
            this.cartItems = this.global.getCartItems();
            this.calculateTotal();
        }
        else {
            var pos = -1;
            for (var i = 0; i < this.cartItems.length; i++) {
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
    };
    ShippiningPage.prototype.decrementItem = function (product) {
        if (this.editMainCart) {
            var decremented = this.global.decrementCartItem(product);
            if (!decremented) {
                this.cartItems = this.global.getCartItems();
            }
            this.calculateTotal();
        }
        else {
            var pos = -1;
            for (var i = 0; i < this.cartItems.length; i++) {
                if (product.id == this.cartItems[i].product_id) {
                    pos = i;
                    break;
                }
            }
            if (pos != -1) {
                if (this.cartItems[pos].quantity > 1) {
                    this.cartItems[pos].quantity = this.cartItems[pos].quantity - 1;
                    this.cartItems = this.cartItems;
                }
                else {
                    this.cartItems.splice(pos, 1);
                    this.cartItems = this.cartItems;
                }
                this.calculateTotal();
            }
        }
        if (this.cartItems.length == 0) {
            this.navCtrl.pop();
        }
    };
    ShippiningPage.prototype.incrementItem = function (product) {
        if (this.editMainCart) {
            var incremented = this.global.incrementCartItem(product);
            if (incremented) {
                this.calculateTotal();
            }
        }
        else {
            var pos = -1;
            for (var i = 0; i < this.cartItems.length; i++) {
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
    };
    ShippiningPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ShippiningPage.prototype.calculateTotal = function () {
        this.cartTotal = 0;
        var sum = 0;
        for (var _i = 0, _a = this.cartItems; _i < _a.length; _i++) {
            var item = _a[_i];
            sum = sum + Number(item.product.sale_price) * item.quantity;
        }
        this.cartTotal = this.cartTotal + sum;
        this.total_items = sum;
        this.total = (sum - (this.coupon ? this.coupon.discount_type == 'percent' ? (sum * Number(this.coupon.amount) / 100) : Number(this.coupon.amount) : 0));
        this.total_items_html = this.currencyIcon + ' ' + this.total_items.toFixed(2);
        this.total_html = this.currencyIcon + ' ' + this.total.toFixed(2);
    };
    ShippiningPage.prototype.paymentPage = function () {
        var _this = this;
        if (this.selectedAddress == null) {
            this.translate.get('field_error_address').subscribe(function (value) { return _this.showToast(value); });
        }
        else {
            var shippingZoneLocation_1 = this.matchZone();
            console.log('szl match', shippingZoneLocation_1);
            if (shippingZoneLocation_1) {
                this.translate.get('fetch_shipping_methods').subscribe(function (value) {
                    _this.presentLoading(value);
                    _this.subscriptions.push(_this.service.shippingZoneMethods(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(shippingZoneLocation_1.zoneId)).subscribe(function (data) {
                        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                            var d = data_1[_i];
                            d.costToShow = _this.currencyIcon + ' ' + d.cost;
                        }
                        _this.dismissLoading();
                        if (!_this.coupon)
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
                        _this.navCtrl.push(data && data.length ? __WEBPACK_IMPORTED_MODULE_10__selectshipping_selectshipping__["a" /* SelectShippingPage */] : __WEBPACK_IMPORTED_MODULE_2__payment_payment__["a" /* PaymentPage */], { cart: _this.cartItems, totalItems: _this.total_items, total: _this.total, coupon: _this.coupon, shipping_methods: data });
                    }, function (err) {
                        _this.dismissLoading();
                        console.log('ErrShippingZoneLocation', err);
                        if (!_this.coupon)
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__payment_payment__["a" /* PaymentPage */], { cart: _this.cartItems, totalItems: _this.total_items, total: _this.total, coupon: _this.coupon });
                    }));
                });
            }
            else {
                if (!this.coupon)
                    window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__payment_payment__["a" /* PaymentPage */], { cart: this.cartItems, totalItems: this.total_items, total: this.total, coupon: this.coupon });
            }
        }
    };
    ShippiningPage.prototype.matchZone = function () {
        var matched;
        var shippingZoneLocations = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SHIPPING_ZONE_LOCATIONS));
        if (shippingZoneLocations) {
            for (var _i = 0, shippingZoneLocations_1 = shippingZoneLocations; _i < shippingZoneLocations_1.length; _i++) {
                var szl = shippingZoneLocations_1[_i];
                if (szl.type == "postcode") {
                    if (szl.code.toLocaleLowerCase().includes(this.selectedAddress.postcode.toLocaleLowerCase()) || this.selectedAddress.postcode.toLocaleLowerCase().includes(szl.code.toLocaleLowerCase())) {
                        matched = szl;
                        break;
                    }
                    if (szl.code.toLocaleLowerCase().includes(".")) {
                        var code = szl.code.split(".");
                        if (code && code.length >= 4) {
                            var min = code[0];
                            var max = code[3].trim();
                            if (Number(this.selectedAddress.postcode) >= Number(min) && Number(this.selectedAddress.postcode) <= Number(max)) {
                                matched = szl;
                                break;
                            }
                        }
                    }
                }
            }
            if (!matched && this.selectedAddress.country && this.selectedAddress.state) {
                for (var _a = 0, shippingZoneLocations_2 = shippingZoneLocations; _a < shippingZoneLocations_2.length; _a++) {
                    var szl = shippingZoneLocations_2[_a];
                    if (szl.code == (this.selectedAddress.country + ":" + this.selectedAddress.state)) {
                        matched = szl;
                        break;
                    }
                }
            }
            if (!matched && this.selectedAddress.country) {
                for (var _b = 0, shippingZoneLocations_3 = shippingZoneLocations; _b < shippingZoneLocations_3.length; _b++) {
                    var szl = shippingZoneLocations_3[_b];
                    if (szl.code == this.selectedAddress.country) {
                        matched = szl;
                        break;
                    }
                }
            }
        }
        return matched;
    };
    ShippiningPage.prototype.removeCoupon = function () {
        this.coupon = null;
        this.calculateTotal();
        window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
    };
    ShippiningPage.prototype.codePage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__code_code__["a" /* CodePage */]);
        modal.onDidDismiss(function () {
            var coupon = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON));
            if (coupon) {
                var allowed = true;
                if (coupon.discount_type == 'fixed_product') {
                    allowed = false;
                    for (var _i = 0, _a = coupon.product_ids; _i < _a.length; _i++) {
                        var itemCA = _a[_i];
                        for (var _b = 0, _c = _this.cartItems; _b < _c.length; _b++) {
                            var item = _c[_b];
                            if (itemCA == Number(item.product.id)) {
                                allowed = true;
                                break;
                            }
                        }
                        if (allowed) {
                            break;
                        }
                    }
                }
                if (!allowed) {
                    _this.translate.get('field_error_invalid_couponcodecart').subscribe(function (value) { return _this.showToast(value); });
                }
                else {
                    if (_this.cartTotal < Number(coupon.minimum_amount)) {
                        _this.translate.get('field_error_minimum_amount_coupon').subscribe(function (value) { return _this.showToast(value + " " + coupon.minimum_amount); });
                        return;
                    }
                    if (_this.cartTotal > Number(coupon.maximum_amount)) {
                        _this.translate.get('field_error_maximum_amount_coupon').subscribe(function (value) { return _this.showToast(value + " " + coupon.minimum_amount); });
                        return;
                    }
                    _this.coupon = coupon;
                    _this.couponAmount = _this.currencyIcon + ' ' + _this.coupon.amount + (_this.coupon.discount_type == 'percent' ? '%' : '');
                    _this.calculateTotal();
                }
            }
        });
        modal.present();
    };
    ShippiningPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ShippiningPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ShippiningPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    ShippiningPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shippining ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/shippining/shippining.html"*/'<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n		</button>\n		<ion-title>{{"confirm_order" | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n	<div class="address-section">\n		<ion-row text-center class="status">\n			<ion-col class="complate">\n				<ion-icon class="zmdi zmdi-check-circle"></ion-icon>\n				<span>{{"login" | translate}}</span>\n			</ion-col>\n			<ion-col class="processing">\n				<ion-icon class="zmdi zmdi-circle-o"></ion-icon>\n				<span>{{"shipping" | translate}}</span>\n			</ion-col>\n			<ion-col class="">\n				<ion-icon class="zmdi zmdi-circle"></ion-icon>\n				<span>{{"payment" | translate}}</span>\n			</ion-col>\n		</ion-row>\n		<ion-card>\n			<ion-card-header>\n				<p class="d-flex">\n					{{"your_dlvr_address" | translate}}\n					<span class="text-sky end" (click)="addressPage()">{{addressChangeText | translate}}\n						<ion-icon name="ios-arrow-forward" class="icon" text-end></ion-icon>\n					</span>\n				</p>\n			</ion-card-header>\n			<ion-item *ngIf="selectedAddress">\n				<ion-label>\n					<div class="img_box">\n						<img *ngIf="selectedAddress.type == 1" src="assets/imgs/ic_home_active.png">\n						<img *ngIf="selectedAddress.type == 1" src="assets/imgs/ic_home_active.png">\n						<h3 *ngIf="selectedAddress.type == 1">{{"address_type_home" | translate}}</h3>\n						<img *ngIf="selectedAddress.type == 2" src="assets/imgs/ic_office_active.png">\n						<img *ngIf="selectedAddress.type == 2" src="assets/imgs/ic_office_active.png">\n						<h3 *ngIf="selectedAddress.type == 2">{{"address_type_office" | translate}}</h3>\n						<img *ngIf="selectedAddress.type == 3" src="assets/imgs/ic_location_active.png">\n						<img *ngIf="selectedAddress.type == 3" src="assets/imgs/ic_location_active.png">\n						<h3 *ngIf="selectedAddress.type == 3">{{"address_type_other" | translate}}</h3>\n					</div>\n					<p>{{selectedAddress.address_1}}</p>\n				</ion-label>\n				<!-- <ion-radio value="{{address.id}}"></ion-radio> -->\n			</ion-item>\n		</ion-card>\n	</div>\n\n	<div class="your-items" *ngIf="cartItems && cartItems.length">\n		<ion-card>\n			<ion-card-header>\n				<p>{{"your_items" | translate}}</p>\n			</ion-card-header>\n			<ion-card-content *ngFor="let item of cartItems">\n				<ion-row>\n					<ion-col col-3>\n						<div *ngIf="item.product.images && item.product.images.length" class="img-box">\n							<img data-src="{{item.product.images[0].src}}">\n						</div>\n						<div *ngIf="!item.product.images || !item.product.images.length" class="img-box">\n							<img src="assets/imgs/suit_PNG8132.png">\n						</div>\n					</ion-col>\n\n					<ion-col col-9>\n						<h4 class="d-flex">{{item.product.name}}\n							<ion-icon text-end name="md-trash" class="icon end" (click)="removeItem(item.product)">\n							</ion-icon>\n						</h4>\n						<div class="rate d-flex">\n							<p text-right class="end add_remove d-flex">\n								<!-- <small>{{\'quantity\' | translate}}</small> -->\n								<span class="end">\n									<span class="add_remove_btn" (click)="decrementItem(item.product)">-</span>\n									<strong>{{item.quantity}}</strong>\n									<span class="add_remove_btn" (click)="incrementItem(item.product)"\n										style="position: relative; top: 2px; ">+</span>\n								</span>\n							</p>\n						</div>\n					</ion-col>\n				</ion-row>\n			</ion-card-content>\n		</ion-card>\n	</div>\n	<div class="spacebar-bottom"></div>\n</ion-content>\n<ion-footer no-border>\n	<div class="receipt btn-fisx-bottom">\n		<ion-card>\n			<ion-card-header>\n			</ion-card-header>\n			<ion-card-content>\n				<button ion-button full class="bg-thime btn-round green-shadow btn-text" text-uppercase\n					(click)="paymentPage()">\n					{{"continue" | translate}}\n				</button>\n			</ion-card-content>\n		</ion-card>\n	</div>\n</ion-footer>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/shippining/shippining.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_11__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__node_modules_ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_11__providers_wordpress_client_service__["a" /* WordpressClient */]])
    ], ShippiningPage);
    return ShippiningPage;
}());

//# sourceMappingURL=shippining.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__placed_placed__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_order_request_models__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_order_update_request_models__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_js_sha512__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_js_sha512___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_js_sha512__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_config__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_home__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__models_helper_models__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__models_shipping_line_models__ = __webpack_require__(630);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};














var PaymentPage = /** @class */ (function () {
    function PaymentPage(config, translate, iab, toastCtrl, navCtrl, navParams, service, loadingCtrl, alertCtrl, appCtrl) {
        this.config = config;
        this.translate = translate;
        this.iab = iab;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.appCtrl = appCtrl;
        this.loadingShown = false;
        this.placedPagePushed = false;
        this.paymentDone = false;
        this.paymentFailAlerted = false;
        this.subscriptions = [];
        this.paymentGateways = new Array();
        this.totalItems = 0;
        this.total = 0;
        this.couponApplied = false;
        this.servicefee = 0;
        this.cartItems = this.navParams.get('cart');
        this.totalItems = this.navParams.get('totalItems');
        this.total = this.navParams.get('total');
        this.coupon = this.navParams.get("coupon");
        var paymentGateways = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].PAYMENT_GATEWAYS));
        this.selectedAddress = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS));
        this.shippingMethod = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_SHIPPING_METHOD));
        this.total = Number(this.total + Number(this.shippingMethod ? this.shippingMethod.cost : 0));
        if (paymentGateways != null) {
            for (var _i = 0, paymentGateways_1 = paymentGateways; _i < paymentGateways_1.length; _i++) {
                var pg = paymentGateways_1[_i];
                if (pg.enabled && this.paymentImplemented(pg.id)) {
                    this.paymentGateways.push(pg);
                }
            }
        }
        var serviceFee = __WEBPACK_IMPORTED_MODULE_12__models_helper_models__["a" /* Helper */].getSetting("mobile_ecommerce_service_fee");
        if (serviceFee) {
            this.servicefee = Number(Number(serviceFee).toFixed());
        }
    }
    PaymentPage.prototype.paymentImplemented = function (id) {
        //return id === "paypal" || id === "ppec_paypal" || id === "pumcp" || id === "payuindia" || id === "cod";
        return id === "payu" || id === "payuindia" || id === "cod" || id === "alg_custom_gateway_1" || id === "cheque";
    };
    PaymentPage.prototype.paymentMethod = function (paymentGateway) {
        this.selectedPaymentGateway = paymentGateway;
    };
    PaymentPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    PaymentPage.prototype.placedPage = function () {
        var _this = this;
        if (this.selectedPaymentGateway == null) {
            this.translate.get('field_error_payment_method').subscribe(function (value) { return _this.showToast(value); });
        }
        else {
            this.orderRequest = new __WEBPACK_IMPORTED_MODULE_5__models_order_request_models__["a" /* OrderRequest */]();
            this.orderRequest.payment_method = this.selectedPaymentGateway.id;
            this.orderRequest.payment_method_title = this.selectedPaymentGateway.title;
            this.orderRequest.set_paid = false;
            this.orderRequest.billing = this.selectedAddress;
            this.orderRequest.shipping = this.selectedAddress;
            this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].USER_KEY));
            this.orderRequest.customer_id = String(this.user.id);
            if (this.servicefee && this.servicefee > 0) {
                this.orderRequest.fee_lines = new Array();
                this.orderRequest.fee_lines.push({ name: "Service Fee", total: String(this.servicefee), tax_status: "none" });
            }
            if (this.shippingMethod) {
                this.orderRequest.shipping_lines = new Array();
                this.orderRequest.shipping_lines.push(new __WEBPACK_IMPORTED_MODULE_13__models_shipping_line_models__["a" /* ShippingLine */](this.shippingMethod.method_id, this.shippingMethod.method_title, String(this.shippingMethod.cost)));
            }
            this.orderRequest.line_items = this.cartItems;
            for (var _i = 0, _a = this.orderRequest.line_items; _i < _a.length; _i++) {
                var item = _a[_i];
                item.product = null;
            }
            this.translate.get('order_creating').subscribe(function (value) {
                _this.presentLoading(value);
                _this.subscriptions.push(_this.service.createOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), _this.orderRequest).subscribe(function (data) {
                    _this.orderResponse = data;
                    if (_this.coupon) {
                        _this.subscriptions.push(_this.service.applyCouponCode(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(_this.orderResponse.id), _this.coupon.code).subscribe(function (data) {
                            _this.orderResponse = data;
                            _this.couponApplied = true;
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
                            _this.translate.get('confirm_order_coupon_applied').subscribe(function (value) { return _this.showToast(value); });
                            _this.orderPlaced();
                        }, function (err) {
                            _this.dismissLoading();
                            _this.orderPlaced();
                            console.log(err);
                        }));
                    }
                    else {
                        _this.orderPlaced();
                    }
                }, function (err) {
                    console.log("err", err);
                    _this.dismissLoading();
                    _this.translate.get('order_failed').subscribe(function (value) { return _this.showToast(value); });
                    _this.appCtrl.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_10__home_home__["a" /* HomePage */]);
                }));
            });
        }
    };
    PaymentPage.prototype.orderPlaced = function () {
        var _this = this;
        this.dismissLoading();
        // if (this.selectedPaymentGateway.id === "paypal") {
        //   this.initPayPal();
        // } else if (this.selectedPaymentGateway.id === "ppec_paypal") {
        //   this.initPayPal();
        // } else 
        if (this.selectedPaymentGateway.id === "payu" || this.selectedPaymentGateway.id === "payuindia") {
            this.initPayUMoney();
        }
        else if (this.selectedPaymentGateway.id === "cod") {
            this.clearCart();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__placed_placed__["a" /* PlacedPage */]);
        }
        else {
            this.translate.get('order_placed_cod').subscribe(function (value) {
                _this.showToast(value);
            });
            this.clearCart();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__placed_placed__["a" /* PlacedPage */]);
        }
    };
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
    PaymentPage.prototype.initPayUMoney = function () {
        var _this = this;
        var name = this.user.first_name && this.user.first_name.length ? this.user.first_name : this.user.username;
        var mobile = this.user.username;
        var email = this.user.email;
        var bookingId = String(Math.floor(Math.random() * (99 - 10 + 1) + 10)) + String(this.orderResponse.id);
        var productinfo = this.orderResponse.order_key;
        var salt = this.config.payuSalt;
        var key = this.config.payuKey;
        var amt = this.couponApplied ? this.total : this.totalItems;
        var string = key + '|' + bookingId + '|' + amt + '|' + productinfo + '|' + name + '|' + email + '|||||||||||' + salt;
        var encrypttext = Object(__WEBPACK_IMPORTED_MODULE_8_js_sha512__["sha512"])(string);
        //let url = "payumoney/payuBiz.html?amt=" + amt + "&name=" + name + "&mobileNo=" + mobile + "&email=" + email + "&bookingId=" + bookingId + "&productinfo=" + productinfo + "&salt=" + salt + "&key=" + key;
        var url = "https://rxstat.io/iox/?io=io" + "&first-name=" + name + "&mobileNo=" + mobile + "&email=" + email;
        var options = {
            location: 'yes',
            clearcache: 'yes',
            zoom: 'yes',
            toolbar: 'yes',
            closebuttoncaption: 'done'
        };
        var browser = this.iab.create(url, '_blank', options);
        browser.on('loadstop').subscribe(function (event) {
            browser.executeScript({
                file: "payumoney/payumoneyPaymentGateway.js"
            });
            if (event.url == "http://localhost/success.php") {
                _this.paymentSuccess();
                browser.close();
            }
            if (event.url == "http://localhost/failure.php") {
                _this.paymentSuccess();
                browser.close();
            }
        });
        browser.on('exit').subscribe(function (event) {
            if (!_this.paymentDone && !_this.paymentFailAlerted) {
                _this.paymentSuccess();
            }
        });
        browser.on('loaderror').subscribe(function (event) {
            _this.translate.get('something_went_wrong').subscribe(function (value) {
                _this.showToast(value);
            });
        });
    };
    PaymentPage.prototype.paymentFailure = function () {
        var _this = this;
        this.paymentFailAlerted = true;
        var subscription = this.service.updateOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.orderResponse.id), new __WEBPACK_IMPORTED_MODULE_6__models_order_update_request_models__["a" /* OrderUpdateRequest */]('cancelled')).subscribe(function (data) {
        }, function (err) {
            console.log(err);
        });
        this.subscriptions.push(subscription);
        this.translate.get(['pymt_fail_title', 'pymt_fail_msg', 'okay'])
            .subscribe(function (res) {
            var alert = _this.alertCtrl.create({
                title: res['pymt_fail_title'],
                message: res['pymt_fail_msg'],
                buttons: [{
                        text: res["okay"],
                        role: 'cancel',
                        handler: function () {
                            _this.done();
                            console.log('Okay clicked');
                        }
                    }]
            });
            alert.present();
        });
    };
    PaymentPage.prototype.paymentSuccess = function () {
        var _this = this;
        this.paymentDone = true;
        this.clearCart();
        this.translate.get('just_moment').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var subscription = this.service.updateOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.orderResponse.id), { set_paid: true }).subscribe(function (data) {
            _this.done();
        }, function (err) {
            _this.done();
            _this.paymentSuccess();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    PaymentPage.prototype.done = function () {
        if (!this.placedPagePushed) {
            this.placedPagePushed = true;
            this.dismissLoading();
            this.appCtrl.getRootNav().setRoot(this.paymentFailAlerted ? __WEBPACK_IMPORTED_MODULE_10__home_home__["a" /* HomePage */] : __WEBPACK_IMPORTED_MODULE_2__placed_placed__["a" /* PlacedPage */]);
        }
    };
    PaymentPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    PaymentPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    PaymentPage.prototype.presentErrorAlert = function (msg) {
        var _this = this;
        this.translate.get(['error', 'dismiss'])
            .subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['error'],
                subTitle: msg,
                buttons: [text['dismiss']]
            });
            alert.present();
        });
    };
    PaymentPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PaymentPage.prototype.clearCart = function () {
        window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].CART_ITEMS);
    };
    PaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-payment ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/payment/payment.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <img src="assets/imgs/ic_menu.png">\n    </button>\n    <ion-title>{{"pay_now" | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content radio-group class="bg-light">\n  <ion-row text-center class="status">\n    <ion-col class="complate">\n      <ion-icon class="zmdi zmdi-check-circle"></ion-icon>\n      <span>{{"login" | translate}}</span>\n    </ion-col>\n    <ion-col class="complate">\n      <ion-icon class="zmdi zmdi-check-circle"></ion-icon>\n      <span>{{"shipping" | translate}}</span>\n    </ion-col>\n    <ion-col class="processing">\n      <ion-icon class="zmdi zmdi-circle-o"></ion-icon>\n      <span>{{"payment" | translate}}</span>\n    </ion-col>\n  </ion-row>\n  <ion-card>\n    <p class="heading">{{"payment_method" | translate}}</p>\n    <ion-card-content no-lines>\n      <ion-item *ngFor="let item of paymentGateways">\n        <ion-radio item-start value="{{item.title}}" (click)="paymentMethod(item)"></ion-radio>\n        <ion-label>{{item.title}}</ion-label>\n      </ion-item>\n    </ion-card-content>\n    <!-- <ion-card-content>\n      <ion-item>\n        <ion-label>Credit/Debit Card</ion-label>\n        <ion-radio checked="true" value="card"></ion-radio>\n      </ion-item>\n      <div class="form">\n        <ion-list>\n          <ion-item>\n            <ion-label>Card Type</ion-label>\n            <ion-select [(ngModel)]="notifications" interface="action-sheet">\n              <ion-option selected value="visa">Visa Express</ion-option>\n              <ion-option value="debit">Debit Card</ion-option>\n              <ion-option value="master">Master Card</ion-option>\n              <ion-option value="credit">Credit Card </ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item>\n            <ion-label>Card Number</ion-label>\n            <ion-input type="text" text-right value="1234-1234-1234-5678"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label>Name on Card</ion-label>\n            <ion-input type="text" text-right value="Jhon Smith"></ion-input>\n          </ion-item>\n          <ion-row>\n            <ion-col col-8 class="">\n              <div class="d-flex mr-5">\n                <ion-item>\n                  <ion-label>Expiry Date</ion-label>\n                  <ion-input type="text" text-right value="11/20"></ion-input>\n                </ion-item>\n                <ion-icon name="md-calendar" class="text-light calendar-icon"></ion-icon>\n              </div>\n            </ion-col>\n            <ion-col col-4>\n              <ion-item>\n                <ion-label>cvv</ion-label>\n                <ion-input type="text" text-right value="244"></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-item>\n            <ion-label text-right>Save my card details</ion-label>\n            <ion-toggle color="secondary" checked="true"></ion-toggle>\n          </ion-item>\n        </ion-list>\n      </div>\n    </ion-card-content> -->\n  </ion-card>\n  <div class="spacebar"></div>\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <div class="btn-padding btn-fisx-bottom">\n      <button ion-button full class="bg-thime btn-round green-shadow btn-text" (click)="placedPage()">\n        {{"continue" | translate}}\n      </button>\n    </div>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/payment/payment.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_9__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_11__node_modules_ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], PaymentPage);
    return PaymentPage;
}());

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_register_request_models__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_auth_credential_models__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var OtpPage = /** @class */ (function () {
    function OtpPage(params, alertCtrl, loadingCtrl, toastCtrl, navCtrl, platform, service, events, translate) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.service = service;
        this.events = events;
        this.translate = translate;
        this.loadingShown = false;
        this.interupted = true;
        this.captchanotvarified = true;
        this.registerRequest = new __WEBPACK_IMPORTED_MODULE_5__models_register_request_models__["a" /* RegisterRequest */]('', '', '', '', '', '');
        this.subscriptions = [];
        this.buttonDisabled = true;
        this.captchaVerified = false;
        this.minutes = 0;
        this.seconds = 0;
        this.totalSeconds = 0;
        this.intervalCalled = false;
        this.resendCode = false;
        this.otpNotSent = true;
        this.registerRequest = params.get('registerRequest');
        this.registerRequest.username = params.get('countryCode') + this.registerRequest.username;
        this.phoneNumberFull = "+" + this.registerRequest.username;
    }
    OtpPage.prototype.ionViewDidEnter = function () {
        if (!(this.platform.is('cordova'))) {
            this.makeCaptcha();
        }
        this.sendOTP();
    };
    OtpPage.prototype.sendOTP = function () {
        this.resendCode = false;
        this.otpNotSent = true;
        console.log("phone no. is " + this.phoneNumberFull);
        if (this.platform.is('cordova')) {
            this.sendOtpPhone(this.phoneNumberFull);
        }
        else {
            this.sendOtpBrowser(this.phoneNumberFull);
        }
        if (this.intervalCalled) {
            clearInterval(this.timer);
        }
    };
    OtpPage.prototype.createTimer = function () {
        this.intervalCalled = true;
        this.totalSeconds--;
        if (this.totalSeconds == 0) {
            this.otpNotSent = true;
            this.resendCode = true;
            clearInterval(this.timer);
        }
        else {
            this.seconds = (this.totalSeconds % 60);
            if (this.totalSeconds >= this.seconds) {
                this.minutes = (this.totalSeconds - this.seconds) / 60;
            }
            else {
                this.minutes = 0;
            }
        }
    };
    OtpPage.prototype.createInterval = function () {
        var _this = this;
        this.totalSeconds = 60;
        this.createTimer();
        this.timer = setInterval(function () {
            _this.createTimer();
        }, 1000);
    };
    OtpPage.prototype.sendOtpPhone = function (phone) {
        var _this = this;
        this.translate.get('sending_otp').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var component = this;
        window.FirebasePlugin.verifyPhoneNumber(phone, 60, function (credential) {
            console.log("verifyPhoneNumber", JSON.stringify(credential));
            component.verfificationId = credential.verificationId ? credential.verificationId : credential;
            // if instant verification is true use the code that we received from the firebase endpoint, otherwise ask user to input verificationCode:
            //var code = credential.instantVerification ? credential.code : inputField.value.toString();
            if (component.verfificationId) {
                if (credential.instantVerification && credential.code) {
                    component.otp = credential.code;
                    component.showToast("Verified automatically");
                    component.verifyOtpPhone();
                }
                else {
                    component.translate.get("otp_sent").subscribe(function (value) {
                        component.showToast(value);
                    });
                    component.otpNotSent = false;
                    component.createInterval();
                }
            }
            component.dismissLoading();
        }, function (error) {
            console.log("otp_send_fail", error);
            component.otpNotSent = true;
            component.resendCode = true;
            component.dismissLoading();
            component.translate.get('otp_err').subscribe(function (value) {
                component.showToast(value);
            });
        });
    };
    OtpPage.prototype.sendOtpBrowser = function (phone) {
        this.dismissLoading();
        var component = this;
        component.translate.get('sending_otp').subscribe(function (value) {
            component.presentLoading(value);
        });
        // component.presentLoading("Sending OTP by SMS");
        console.log("In not cordova");
        __WEBPACK_IMPORTED_MODULE_8_firebase_app__["auth"]().signInWithPhoneNumber(phone, this.recaptchaVerifier)
            .then(function (confirmationResult) {
            component.otpNotSent = false;
            component.result = confirmationResult;
            component.dismissLoading();
            component.translate.get('otp_sent').subscribe(function (value) {
                component.showToast(value);
            });
            // component.showToast("OTP sent on your mobile");
            if (component.intervalCalled) {
                clearInterval(component.timer);
            }
            component.createInterval();
        })
            .catch(function (error) {
            component.resendCode = true;
            component.dismissLoading();
            if (error.message) {
                component.showToast(error.message);
            }
            else {
                component.translate.get('otp_err').subscribe(function (value) {
                    component.presentLoading(value);
                });
                // component.showToast("SMS not sent");
            }
            console.log("SMS not sent " + JSON.stringify(error));
        });
    };
    OtpPage.prototype.verify = function () {
        this.otpNotSent = true;
        if (this.platform.is('cordova')) {
            this.verifyOtpPhone();
        }
        else {
            this.verifyOtpBrowser();
        }
    };
    OtpPage.prototype.verifyOtpPhone = function () {
        var _this = this;
        console.log("Verifying phone in cordova");
        var credential = __WEBPACK_IMPORTED_MODULE_8_firebase_app__["auth"].PhoneAuthProvider.credential(this.verfificationId, this.otp);
        console.log("Fetched the credential");
        this.translate.get('verifying_otp').subscribe(function (value) {
            _this.presentLoading(value);
        });
        // this.presentLoading("Verifying OTP by SMS");
        __WEBPACK_IMPORTED_MODULE_8_firebase_app__["auth"]().signInAndRetrieveDataWithCredential(credential)
            .then(function (info) {
            console.log(JSON.stringify(info));
            _this.dismissLoading();
            _this.translate.get('otp_success').subscribe(function (value) {
                _this.showToast(value);
            });
            // this.showToast("OTP verified");
            _this.signIn();
        }, function (error) {
            if (error.message) {
                _this.showToast(error.message);
            }
            else {
                _this.translate.get('otp_err').subscribe(function (value) {
                    _this.showToast(value);
                });
                // this.showToast("Wrong OTP");
            }
            _this.dismissLoading();
            console.log(JSON.stringify(error));
        });
    };
    OtpPage.prototype.verifyOtpBrowser = function () {
        var component = this;
        console.log("Confimation result:---" + JSON.stringify(component.result));
        // component.presentLoading("Verifying OTP by SMS");
        component.translate.get('verifying_otp').subscribe(function (value) {
            component.presentLoading(value);
        });
        component.result.confirm(this.otp).then(function (response) {
            component.dismissLoading();
            component.translate.get('otp_success').subscribe(function (value) {
                component.showToast(value);
            });
            // component.showToast("OTP verified");
            component.signIn();
        }).catch(function (error) {
            if (error.message) {
                component.showToast(error.message);
            }
            else {
                component.translate.get('otp_err').subscribe(function (value) {
                    component.showToast(value);
                });
                // component.showToast("Wrong OTP");
            }
            component.dismissLoading();
        });
    };
    OtpPage.prototype.makeCaptcha = function () {
        var component = this;
        this.recaptchaVerifier = new __WEBPACK_IMPORTED_MODULE_8_firebase_app__["auth"].RecaptchaVerifier('recaptcha-container', {
            // 'size': 'normal',
            'size': 'invisible',
            'callback': function (response) {
                component.captchanotvarified = true;
                console.log("captchanotvarified:--" + component.captchanotvarified);
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
        this.recaptchaVerifier.render();
    };
    OtpPage.prototype.signIn = function () {
        var _this = this;
        this.translate.get('wait').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var credentials = new __WEBPACK_IMPORTED_MODULE_6__models_auth_credential_models__["a" /* AuthCredential */](this.registerRequest.username, this.registerRequest.password);
        var subscription = this.service.getAuthToken(credentials).subscribe(function (data) {
            var authResponse = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].USER_API_KEY, authResponse.token);
            _this.getUser(_this.getUserIdFromToken(authResponse.token));
        }, function (err) {
            _this.dismissLoading();
            _this.translate.get('login_error').subscribe(function (value) {
                _this.presentErrorAlert(value);
            });
        });
        this.subscriptions.push(subscription);
    };
    OtpPage.prototype.getUserIdFromToken = function (token) {
        var decodedString = window.atob(token.split(".")[1]);
        return JSON.parse(decodedString).data.user.id;
    };
    OtpPage.prototype.getUser = function (userId) {
        var _this = this;
        var subscription = this.service.getUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), userId).subscribe(function (data) {
            _this.dismissLoading();
            var userResponse = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(userResponse));
            window.localStorage.removeItem("userCreateData");
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            _this.events.publish('user:login', userResponse);
        }, function (err) {
            _this.dismissLoading();
            _this.translate.get('login_error').subscribe(function (value) {
                _this.presentErrorAlert(value);
            });
        });
        this.subscriptions.push(subscription);
    };
    OtpPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    OtpPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    OtpPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    OtpPage.prototype.presentErrorAlert = function (msg) {
        var _this = this;
        this.translate.get(['error', 'dismiss'])
            .subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['error'],
                subTitle: msg,
                buttons: [text['dismiss']]
            });
            alert.present();
        });
    };
    OtpPage.prototype.makeExitAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'App termination',
            message: 'Do you want to close the app?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Application exit prevented!');
                    }
                }, {
                    text: 'Close App',
                    handler: function () {
                        _this.platform.exitApp(); // Close this application
                    }
                }]
        });
        alert.present();
    };
    OtpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-otp ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/otp/otp.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title text-center>{{\'verification\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div class="form" padding-left padding-right>\n		<div id="recaptcha-container"></div>\n		<p text-center>{{\'otp_text\' | translate}} <br /> {{\'sent\' | translate }} {{phoneNumberFull}}</p>\n		<ion-list>\n			<ion-item>\n				<ion-label>{{\'verification_code\' | translate}}</ion-label>\n				<ion-input type="text" text-right placeholder="{{\'enter_otp\' | translate}}" [(ngModel)]="otp">\n				</ion-input>\n			</ion-item>\n		</ion-list>\n		<button ion-button full class="bg-thime btn-round btn-text" (click)="verify()">\n			{{\'verify\' | translate}}\n		</button>\n		<ion-item no-lines no-margin no-padding>\n			<button ion-button (click)="sendOTP()" clear item-start (click)="sendOTP()" [disabled]="!resendCode">\n				{{\'resend\' | translate}}\n			</button>\n			<!-- <ion-note item-end>\n				<ng-container *ngIf="minutes==0; else minuteTemplate">\n					00\n				</ng-container>\n				<ng-template #minuteTemplate>\n					{{minutes}}\n				</ng-template>:\n				<ng-container *ngIf="seconds==0; else secondTemplate">\n					00\n				</ng-container>\n				<ng-template #secondTemplate>\n					{{seconds}}\n				</ng-template> {{\'min_left\' | translate}}\n			</ion-note> -->\n		</ion-item>\n	</div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/otp/otp.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_0__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_7__node_modules_ngx_translate_core__["c" /* TranslateService */]])
    ], OtpPage);
    return OtpPage;
}());

//# sourceMappingURL=otp.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthCredential; });
var AuthCredential = /** @class */ (function () {
    function AuthCredential(username, password) {
        this.username = username;
        this.password = password;
    }
    return AuthCredential;
}());

//# sourceMappingURL=auth-credential.models.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Myorder_2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_order_update_request_models__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__itemdetail_itemdetail__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__order_info_order_info__ = __webpack_require__(449);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Myorder_2Page = /** @class */ (function () {
    function Myorder_2Page(translate, toastCtrl, service, loadingCtrl, alertCtrl, navCtrl) {
        var _this = this;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
        this.orders = new Array();
        this.pageNo = 1;
        this.currencyIcon = '';
        this.currencyText = '';
        this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].USER_KEY));
        this.loadMyOrders();
        this.translate.get('loading_orders').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
        }
    }
    Myorder_2Page.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    Myorder_2Page.prototype.loadMyOrders = function () {
        var _this = this;
        var subscription = this.service.myOrders(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.user.id), String(this.pageNo)).subscribe(function (data) {
            _this.dismissLoading();
            _this.orders = data;
        }, function (err) {
            _this.dismissLoading();
        });
        this.subscriptions.push(subscription);
    };
    Myorder_2Page.prototype.itemdetailPage = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro_id: item.product_id });
    };
    Myorder_2Page.prototype.confirmCancelOrder = function (order) {
        var _this = this;
        this.translate.get(['cancel_order_title', 'cancel_order_message', 'no', 'yes']).subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['cancel_order_title'],
                message: text['cancel_order_message'],
                buttons: [{
                        text: text['no'],
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }, {
                        text: text['yes'],
                        handler: function () {
                            _this.cancelOrder(order);
                        }
                    }]
            });
            alert.present();
        });
    };
    Myorder_2Page.prototype.cancelOrder = function (order) {
        var _this = this;
        this.translate.get('cancelling_orders').subscribe(function (value) {
            _this.presentLoading(value);
        });
        // this.presentLoading('Cancelling order');
        var subscription = this.service.updateOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(order.id), new __WEBPACK_IMPORTED_MODULE_4__models_order_update_request_models__["a" /* OrderUpdateRequest */]('cancelled')).subscribe(function (data) {
            var orderRes = data;
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
            _this.dismissLoading();
            // this.showToast('Order cancelled');
            _this.translate.get('order_cancelled').subscribe(function (value) {
                _this.showToast(value);
            });
        }, function (err) {
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    Myorder_2Page.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.pageNo++;
        var subscription = this.service.myOrders(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.user.id), String(this.pageNo)).subscribe(function (data) {
            _this.orders.concat(data);
            infiniteScroll.complete();
        }, function (err) {
            infiniteScroll.complete();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    Myorder_2Page.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    Myorder_2Page.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    Myorder_2Page.prototype.presentErrorAlert = function (msg) {
        var _this = this;
        this.translate.get(['error', 'dismiss']).subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['error'],
                subTitle: msg,
                buttons: [text['dismiss']]
            });
            alert.present();
        });
    };
    Myorder_2Page.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    Myorder_2Page.prototype.orderInfo = function (order) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__order_info_order_info__["a" /* Order_infoPage */], { order: order });
    };
    Myorder_2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myorder_2 ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/myorder_2/myorder_2.html"*/'<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{"my_orders" | translate}}\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n\n	<div class="empty_placeholder" *ngIf="!loadingShown && (!orders || !orders.length)">\n		<img src="assets/imgs/no_orders.png">\n		<p>{{"empty_orders" | translate}}</p>\n	</div>\n\n	<ion-list no-lines>\n		<ion-item *ngFor="let order of orders">\n			<h2 class="d-flex">{{"order_id" | translate}} - {{order.id}}\n				<span class="end">{{order.status | translate}}</span>\n			</h2>\n			<ion-row>\n				<ion-col col-3>\n					<h4>{{"ordered_on" | translate}}</h4>\n					<h3>{{order.date_created}}</h3>\n				</ion-col>\n\n				<ion-col col-3>\n				</ion-col>\n\n				<ion-col col-3>\n					<button\n						*ngIf="order.status == \'on-hold\' || order.status == \'pending\'|| order.status == \'processing\'"\n						ion-button full class=" cencel btn-round  bg-thime  btn-text"\n						(click)="confirmCancelOrder(order)">\n						{{"cancel_order" | translate}}\n					</button>\n				</ion-col>\n\n				<ion-col col-3>\n					<button ion-button full class="btn-round  bg-thime  btn-text" (click)="orderInfo(order)">\n						{{"order_info2" | translate}}\n					</button>\n				</ion-col>\n			</ion-row>\n		</ion-item>\n	</ion-list>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/myorder_2/myorder_2.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__node_modules_ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], Myorder_2Page);
    return Myorder_2Page;
}());

//# sourceMappingURL=myorder_2.js.map

/***/ }),

/***/ 190:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 190;

/***/ }),

/***/ 234:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 234;

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BaseAppConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

var APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]("app.config");
var BaseAppConfig = {
    appName: "RX Stat",
    apiBase: "https://rxstat.io/",
    googleApiKey: "AIzaSyB8bQgLfIw3FszUfLV8fZqhgkuKrhj0S_Q",
    consumerKey: "ck_fccf464b199306aadd1baad5208e38c15be33421",
    consumerSecret: "cs_8b38efb11be693f7a653a7307f2f1529be33948e",
    adminUsername: "appadmin",
    adminPassword: "!RxStAt123316!",
    oneSignalAppId: "c5db2fab-35d2-474a-bfcc-36bf3704bf02",
    oneSignalGPSenderId: "903880668033",
    paypalSandbox: "xxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    paypalProduction: "",
    payuSalt: "xxxxxxxxx",
    payuKey: "xxxxxx",
    availableLanguages: [{
            code: 'en',
            name: 'English'
        }, {
            code: 'ar',
            name: 'Arabic'
        }, {
            code: 'es',
            name: 'Spanish'
        }, {
            code: 'fr',
            name: 'French'
        }, {
            code: 'pt',
            name: 'Portuguese'
        }],
    demoMode: false,
    firebaseConfig: {
        webApplicationId: "747934766850-ikgkpd04pbml8pofj4kgra80em4uibpj.apps.googleusercontent.com",
        apiKey: "AIzaSyCt7wsFMv7YjlfH6jlUAhwdWfY5jopOSDc",
        authDomain: "rx-customer-new.firebaseapp.com",
        databaseURL: "https://rx-customer-new-default-rtdb.firebaseio.com/",
        projectId: "rx-customer-new",
        storageBucket: "rx-customer-new.appspot.com",
        messagingSenderId: "747934766850",
        appId: "1:747934766850:web:e78aa4033399444b0a541b"
    }
};
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CodePage = /** @class */ (function () {
    function CodePage(translate, service, loadingCtrl, toastCtrl, viewCtrl) {
        this.translate = translate;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.cCode = "";
        this.loadingShown = false;
        this.subscriptions = [];
    }
    CodePage.prototype.checkCode = function () {
        var _this = this;
        if (!this.cCode.length) {
            this.translate.get('field_error_couponcode').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('just_moment').subscribe(function (value) {
                _this.presentLoading(value);
            });
            var subscription = this.service.getCouponByCode(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.cCode).subscribe(function (data) {
                _this.dismissLoading();
                var coupons = data;
                if (!coupons.length) {
                    _this.translate.get('field_error_invalid_couponcode').subscribe(function (value) {
                        _this.showToast(value);
                    });
                }
                else {
                    var coupon = coupons[0];
                    if (new Date(coupon.date_expires) > new Date()) {
                        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_COUPON, JSON.stringify(coupons[0]));
                    }
                    else {
                        window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
                        _this.translate.get('cpn_expire').subscribe(function (value) {
                            _this.showToast(value);
                        });
                    }
                    _this.dismiss();
                }
            }, function (err) {
                console.log("getCouponByCode", err);
                _this.dismissLoading();
                _this.translate.get('field_error_invalid_couponcode').subscribe(function (value) {
                    _this.showToast(value);
                });
            });
            this.subscriptions.push(subscription);
        }
    };
    CodePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CodePage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    CodePage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    CodePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CodePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-code ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/code/code.html"*/'<ion-content class="bg-light">\n	<div class="code">\n		<h2>{{\'coupon_code\' | translate}}</h2>\n		<ion-input type="text" value="" [(ngModel)]="cCode" placeholder="{{\'enter_promo\' | translate}}"></ion-input>\n\n		<ion-row>\n			<ion-col col-6>\n				<button ion-button full class="bg-thime cencel btn-round btn-text" (click)="dismiss()">\n					{{\'cancel\' | translate}}\n				</button>\n			</ion-col>\n			<ion-col col-6>\n				<button ion-button full class="bg-thime btn-round btn-text" (click)="checkCode()">\n					{{\'submit\' | translate}}\n				</button>\n			</ion-col>\n		</ion-row>\n	</div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/code/code.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__node_modules_ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]])
    ], CodePage);
    return CodePage;
}());

//# sourceMappingURL=code.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__category_category__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__upload_upload__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_category_models__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_config__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_global__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shirts_shirts__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__upload_prescription_upload_prescription__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_in_app_browser__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
















var HomePage = /** @class */ (function () {
    function HomePage(config, toastCtrl, translate, events, service, modalCtrl, navCtrl, menu, global, appCtrl, loadingCtrl, inAppBrowser) {
        var _this = this;
        this.config = config;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.events = events;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.global = global;
        this.appCtrl = appCtrl;
        this.loadingCtrl = loadingCtrl;
        this.inAppBrowser = inAppBrowser;
        this.products = 'nonprescriptions';
        this.subscriptions = [];
        this.banners = new Array();
        this.categoriesAll = new Array();
        this.cartTotal = 0;
        events.subscribe('category:setup', function () {
            _this.setupCategories();
        });
        events.subscribe('open:cart', function () {
            _this.cartPage();
        });
        this.setupCategories();
        this.loadBanners();
    }
    HomePage.prototype.chooseTab = function (pos) {
        this.products = pos == 0 ? 'nonprescriptions' : 'prescriptions';
    };
    HomePage.prototype.setupCategories = function () {
        var _this = this;
        var categories = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES_PARENT));
        var cats = new Array();
        for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
            var cat = categories_1[_i];
            if (cats.length == 8) {
                break;
            }
            if (Number(cat.parent) == 0) {
                cats.push(cat);
            }
        }
        this.translate.get('more').subscribe(function (value) {
            var more = new __WEBPACK_IMPORTED_MODULE_6__models_category_models__["a" /* Category */]();
            more.name = value;
            more.id = '-1';
            cats.push(more);
            _this.categoriesAll = cats;
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var tabpos = window.localStorage.getItem("tabpos");
        if (tabpos && tabpos.length && Number(tabpos)) {
            this.chooseTab(Number(tabpos));
            window.localStorage.removeItem("tabpos");
        }
        this.cartTotal = Number(this.global.getCartItemsCount());
    };
    HomePage.prototype.loadBanners = function () {
        var _this = this;
        var savedBanners = JSON.parse(window.localStorage.getItem('banners'));
        if (savedBanners && savedBanners.length) {
            this.banners = savedBanners;
        }
        var subscription = this.service.banners().subscribe(function (data) {
            _this.banners = data;
            window.localStorage.setItem('banners', JSON.stringify(_this.banners));
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    HomePage.prototype.menuToggle = function () {
        if (!this.menu.isEnabled()) {
            this.menu.enable(true);
            this.menu.swipeEnable(true);
        }
        if (this.menu.isOpen()) {
            this.menu.close();
        }
        else {
            this.menu.open();
        }
    };
    HomePage.prototype.categoryPageId = function (catId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__shirts_shirts__["a" /* ShirtsPage */], { catId: catId });
    };
    HomePage.prototype.categoryPage = function (cat) {
        if (cat && cat.id != '-1') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__shirts_shirts__["a" /* ShirtsPage */], { cat: cat });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__category_category__["a" /* CategoryPage */]);
        }
    };
    HomePage.prototype.searchPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* SearchPage */]);
        // let modal = this.modalCtrl.create(SearchPage);
        // modal.present();
    };
    HomePage.prototype.cartPage = function () {
        var _this = this;
        /*this.navCtrl.push(CartPage);*/
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */]);
        modal.onDidDismiss(function () {
            _this.cartTotal = Number(_this.global.getCartItemsCount());
        });
        modal.present();
    };
    HomePage.prototype.uploadPage = function () {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_KEY));
        if (user) {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__upload_upload__["a" /* UploadPage */]);
            modal.present();
            modal.onDidDismiss(function (url) { if (url && url.length)
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__upload_prescription_upload_prescription__["a" /* Upload_prescriptionPage */]); });
        }
        else {
            this.translate.get('auth_required').subscribe(function (value) {
                _this.showToast(value);
            });
            this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_13__login_login__["a" /* LoginPage */]);
        }
    };
    HomePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    HomePage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    HomePage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    // buyThisApp() {
    //   let profileModal = this.modalCtrl.create(BuyAppAlertPage);
    //   profileModal.present();
    // }
    HomePage.prototype.buyThisApp = function () {
        var _this = this;
        this.translate.get('opening_WhatsApp').subscribe(function (text) {
            _this.presentLoading(text);
            _this.service.getWhatsappDetails().subscribe(function (res) {
                _this.dismissLoading();
                return _this.inAppBrowser.create(res['link'], '_system');
            }, function (err) {
                console.log("Error rating:", JSON.stringify(err));
                _this.dismissLoading();
            });
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/home/home.html"*/'<ion-header class="bg-thime">\n	<ion-navbar>\n		<button ion-button menuToggle style="display: block !important;">\n			<img src="assets/imgs/ic_menu.png">\n		</button>\n		<ion-title>\n			<span class="center_title">{{config.appName}}</span>\n\n			<div class="icon-box end" (click)="cartPage()">\n				<img src="assets/imgs/ic_my_cart.png">\n				<ion-badge>{{cartTotal}}</ion-badge>\n			</div>\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n	<ion-slides autoplay="2000" loop="true" pager *ngIf="banners && banners.length" dir="rtl">\n		<ion-slide *ngFor="let slide of banners">\n			<img [src]="slide.img_src" class="slide-image" (click)="categoryIdPage(slide.category)" />\n		</ion-slide>\n	</ion-slides>\n	<div class="product">\n		<ion-toolbar no-border-top class="tab-bar">\n			<ion-searchbar (ionInput)="getItems($event)" placeholder="{{\'search_box\' | translate}}"\n				(click)="searchPage()"></ion-searchbar>\n			<ion-list>\n				<ion-item *ngFor="let item of items">\n				</ion-item>\n			</ion-list>\n		</ion-toolbar>\n		<div [ngSwitch]="products">\n			<div class="bg-white" style="padding-top: 10px;">\n				<ion-row class="d-flex">\n					<ion-col col-4><img src="assets/imgs/vector1.png"></ion-col>\n					<ion-col col-8>\n						<h6 class="text-sky">{{"upload_title" | translate}}</h6>\n					</ion-col>\n					<ion-col col-8>\n						<ol>\n							<li>{{"upload_option1" | translate}}</li>\n							<li>{{"upload_option2" | translate}}</li>\n							<li>{{"upload_option3" | translate}}</li>\n						</ol>\n					</ion-col>\n					<ion-col col-4><img src="assets/imgs/vector2.png"></ion-col>\n				</ion-row>\n				<div padding style="padding-top: 0;">\n					<button ion-button full class="bg-thime btn-round btn-text" (click)="uploadPage()">\n						{{"upload_button" | translate}}\n					</button>\n					<p text-center no-margin>Or</p>\n					<button ion-button block outline class="btn-round btn-text" (click)="categoryPage()">\n						{{"button_browse" | translate}}\n					</button>\n				</div>\n			</div>\n		</div>\n	</div>\n</ion-content>\n<div *ngIf="config.demoMode" class="buy-this-app-class">\n    <button ion-button class="button-size" (click)="buyThisApp()" round>\n      <ion-icon name="md-cart" class="text-white"></ion-icon> &nbsp;\n      {{\'buy_this_app\' | translate}}\n    </button>\n  </div>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/home/home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_10__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_8__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_9__node_modules_ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_10__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_11__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMaps; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__connectivity_service__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var GoogleMaps = /** @class */ (function () {
    function GoogleMaps(config, connectivityService) {
        this.config = config;
        this.connectivityService = connectivityService;
        this.mapInitialised = false;
    }
    GoogleMaps.prototype.init = function (mapElement, pleaseConnect) {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;
        return this.loadGoogleMaps();
    };
    GoogleMaps.prototype.loadGoogleMaps = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                _this.disableMap();
                if (_this.connectivityService.isOnline()) {
                    window['mapInit'] = function () {
                        _this.initMap().then(function () {
                            resolve(true);
                        });
                        _this.enableMap();
                    };
                    var script = document.createElement("script");
                    script.id = "googleMaps";
                    if (_this.config.googleApiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + _this.config.googleApiKey + '&callback=mapInit&libraries=places';
                    }
                    else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (_this.connectivityService.isOnline()) {
                    _this.initMap();
                    _this.enableMap();
                }
                else {
                    _this.disableMap();
                }
                resolve(true);
            }
            _this.addConnectivityListeners();
        });
    };
    GoogleMaps.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
            var latLng = new google.maps.LatLng(39.9334, 32.8597);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControlOptions: { mapTypeIds: [] }
            };
            _this.map = new google.maps.Map(_this.mapElement, mapOptions);
            resolve(true);
        });
    };
    GoogleMaps.prototype.disableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    };
    GoogleMaps.prototype.enableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    };
    GoogleMaps.prototype.addConnectivityListeners = function () {
        var _this = this;
        this.connectivityService.watchOnline().subscribe(function () {
            setTimeout(function () {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    _this.loadGoogleMaps();
                }
                else {
                    if (!_this.mapInitialised) {
                        _this.initMap();
                    }
                    _this.enableMap();
                }
            }, 2000);
        });
        this.connectivityService.watchOffline().subscribe(function () {
            _this.disableMap();
        });
    };
    GoogleMaps = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__connectivity_service__["a" /* Connectivity */]])
    ], GoogleMaps);
    return GoogleMaps;
}());

//# sourceMappingURL=google-maps.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connectivity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Connectivity = /** @class */ (function () {
    function Connectivity(platform, network) {
        this.platform = platform;
        this.network = network;
        this.onDevice = this.platform.is('cordova');
    }
    Connectivity.prototype.isOnline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type != 'none';
        }
        else {
            return navigator.onLine;
        }
    };
    Connectivity.prototype.isOffline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type == 'none';
        }
        else {
            return !navigator.onLine;
        }
    };
    Connectivity.prototype.watchOnline = function () {
        return this.network.onConnect();
    };
    Connectivity.prototype.watchOffline = function () {
        return this.network.onDisconnect();
    };
    Connectivity = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */]])
    ], Connectivity);
    return Connectivity;
}());

//# sourceMappingURL=connectivity-service.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Add_address_titlePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Add_address_titlePage = /** @class */ (function () {
    function Add_address_titlePage(navParam, viewCtrl, translate, toastCtrl) {
        this.viewCtrl = viewCtrl;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.address = navParam.get("address");
        if (!this.address.type)
            this.address.type = 1;
    }
    Add_address_titlePage.prototype.cancel = function () {
        this.viewCtrl.dismiss(null);
    };
    Add_address_titlePage.prototype.save = function () {
        var _this = this;
        if (!this.address.postcode || !this.address.postcode.length) {
            this.translate.get("field_error_postalcode").subscribe(function (value) { return _this.showToast(value); });
        }
        else if (!this.address.address_1 || !this.address.address_1.length) {
            this.translate.get("field_error_address_full").subscribe(function (value) { return _this.showToast(value); });
        }
        else {
            this.viewCtrl.dismiss(this.address);
        }
    };
    Add_address_titlePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1500,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    Add_address_titlePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add_address_title',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/add_address_title/add_address_title.html"*/'<ion-footer no-border>\n	<ion-icon name="md-close" text-end class="close_btn" (click)="cancel()"></ion-icon>\n	<div class="form">\n		<ion-list no-lines>\n			<h3>{{"select_address_type" | translate}}</h3>\n			<ion-row class="radio_group" radio-group [(ngModel)]="address.type">\n				<ion-col col-4>\n					<ion-item>\n						<ion-label>\n							<div class="img_box">\n								<img src="assets/imgs/ic_home_active.png">\n								<img src="assets/imgs/ic_home_active.png">\n							</div>\n							<h2>{{"address_type_home" | translate}}</h2>\n						</ion-label>\n						<ion-radio value="1"></ion-radio>\n					</ion-item>\n				</ion-col>\n				<ion-col col-4>\n					<ion-item>\n						<ion-label>\n							<div class="img_box">\n								<img src="assets/imgs/ic_office_active.png">\n								<img src="assets/imgs/ic_office_active.png">\n							</div>\n							<h2>{{"address_type_office" | translate}}</h2>\n						</ion-label>\n						<ion-radio value="2"></ion-radio>\n					</ion-item>\n				</ion-col>\n				<ion-col col-4>\n					<ion-item>\n						<ion-label>\n							<div class="img_box">\n								<img src="assets/imgs/ic_location_active.png">\n								<img src="assets/imgs/ic_location_active.png">\n							</div>\n							<h2>{{"address_type_other" | translate}}</h2>\n						</ion-label>\n						<ion-radio value="3"></ion-radio>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n			<ion-item>\n				<ion-label>{{"address_postal" | translate}}</ion-label>\n				<ion-input type="text" [(ngModel)]="address.postcode"></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-label>{{"full_address" | translate}}</ion-label>\n				<ion-input type="text" [(ngModel)]="address.address_1"></ion-input>\n			</ion-item>\n		</ion-list>\n\n	</div>\n	<button ion-button full no-margin class="btn-orange btn" (click)="save()">\n		{{"save" | translate}}\n	</button>\n</ion-footer>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/add_address_title/add_address_title.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
    ], Add_address_titlePage);
    return Add_address_titlePage;
}());

//# sourceMappingURL=add_address_title.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartItem; });
var CartItem = /** @class */ (function () {
    function CartItem() {
    }
    return CartItem;
}());

//# sourceMappingURL=cart-item.models.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__myorder_2_myorder_2__ = __webpack_require__(177);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlacedPage = /** @class */ (function () {
    function PlacedPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    PlacedPage.prototype.ordersPage = function () {
        this.homePage();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__myorder_2_myorder_2__["a" /* Myorder_2Page */]);
    };
    PlacedPage.prototype.homePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    PlacedPage.prototype.myorder_2 = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__myorder_2_myorder_2__["a" /* Myorder_2Page */]);
    };
    PlacedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-placed ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/placed/placed.html"*/'<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<img src="assets/imgs/ic_menu.png">\n		</button>\n		<ion-title>{{"order_placed" | translate}} </ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<div class="img-box">\n		<img src="assets/imgs/order-placed.jpg">\n	</div>\n	<h3 class="text-sky" text-center [innerHTML]="\'u_order_placed\' | translate"></h3>\n	<!--	<h4 class="" text-center>{{"order_success" | translate}}.<br>{{"p_visit" | translate}} <strong (click)="ordersPage()" class="text-black">{{"my_orders" | translate}}</strong> {{"page2check" | translate}}<br> {{"the_progress" | translate}}</h4>-->\n	<div class="btn-padding btn-fisx-bottom ">\n\n	</div>\n</ion-content>\n<ion-footer no-border>\n	<button ion-button full class="bg-green btn-round  bg-thime  btn-text" (click)="myorder_2()">\n		{{"my_orders" | translate}}\n	</button>\n	<button ion-button full class="bg-green btn-round bg-white bg-white btn-text" (click)="homePage()">\n		{{"continue_shopping" | translate}}\n	</button>\n</ion-footer>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/placed/placed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], PlacedPage);
    return PlacedPage;
}());

//# sourceMappingURL=placed.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vendor_profilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Vendor_profilePage = /** @class */ (function () {
    function Vendor_profilePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    Vendor_profilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vendor_profile',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/vendor_profile/vendor_profile.html"*/'<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{\'vender_info\' | translate}}</ion-title>\n	</ion-navbar>\n	<div class="banner">\n		<div class="img_box">\n			<img src="https://cdn.pixabay.com/photo/2016/10/14/19/21/canyon-1740973__340.jpg">\n		</div>\n		<div class="text_box" text-center>\n			<h2>Johnson distributor</h2>\n			<p>140 items</p>\n		</div>\n	</div>\n</ion-header>\n\n<ion-content class="bg-light">\n	<ion-list>\n		<ion-row>\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n			\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n			<ion-col col-6>\n				<ion-card>\n					<ion-card-header>\n						<div class="img-box">\n							<img src="http://opuslabs.in:9070/wp-content/uploads/2020/04/nybe1jbxnlkzcpqk7lju.jpg">\n						</div> \n						<ion-icon name="md-heart-outline" class="text-light icon"></ion-icon>\n						<h5>Durex Play Massage 2in1 Intimate Lubricant & Massage Gel</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div class="price_details">\n							<p class="text-sky">$ 19</p> \n							&nbsp;\n							&nbsp;\n							<p  class="price text-light mr-5">$ 21</p>\n						</div>\n						<div class="btn text-white">{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n		</ion-row>\n	</ion-list>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/vendor_profile/vendor_profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], Vendor_profilePage);
    return Vendor_profilePage;
}());

//# sourceMappingURL=vendor_profile.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhonePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_otp_otp__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_register_request_models__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var PhonePage = /** @class */ (function () {
    function PhonePage(config, navCtrl, alertCtrl, loadingCtrl, toastCtrl, platform, navParam, service, translate) {
        this.config = config;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.service = service;
        this.translate = translate;
        this.loadingShown = false;
        this.captchanotvarified = true;
        this.buttonDisabled = true;
        this.otpNotsent = false;
        this.registerRequest = new __WEBPACK_IMPORTED_MODULE_4__models_register_request_models__["a" /* RegisterRequest */]('', '', '', '', '', '');
        this.subscriptions = [];
        this.registerRequest = navParam.get("registerRequest");
        this.getCountries();
    }
    PhonePage.prototype.getCountries = function () {
        var _this = this;
        this.service.getCountries().subscribe(function (data) {
            console.log("Countries fetched");
            _this.countries = data;
            // console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    PhonePage.prototype.createUser = function () {
        var _this = this;
        if (!this.countryCode || !this.countryCode.length) {
            this.translate.get('login_countrycode_empty').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.registerRequest.username || !this.registerRequest.username.length) {
            this.translate.get('field_error_phone_valid').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get(['phone_confirm_message', 'yes', 'no']).subscribe(function (res) {
                var alert = _this.alertCtrl.create({
                    title: "+" + _this.countryCode + _this.registerRequest.username,
                    message: res.phone_confirm_message,
                    buttons: [{
                            text: res.no,
                            role: 'cancel',
                            handler: function () {
                                console.log('Cancel clicked');
                            }
                        }, {
                            text: res.yes,
                            handler: function () {
                                _this.registerRequest.password = Math.random().toString(36).slice(-6);
                                _this.translate.get('checking_phone').subscribe(function (value) {
                                    _this.presentLoading(value);
                                    _this.subscriptions.push(_this.service.createUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), _this.countryCode, _this.registerRequest).subscribe(function (data) {
                                        var haveImgToUpdate = false;
                                        if (_this.registerRequest && _this.registerRequest.meta_data) {
                                            for (var _i = 0, _a = _this.registerRequest.meta_data; _i < _a.length; _i++) {
                                                var meta = _a[_i];
                                                if (meta.key == "avatar_url" && meta.value && meta.value.length) {
                                                    haveImgToUpdate = true;
                                                    break;
                                                }
                                            }
                                        }
                                        if (haveImgToUpdate) {
                                            _this.service.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(data.id), { meta_data: _this.registerRequest.meta_data }).subscribe(function (data) {
                                                console.log("dpUpdated", data);
                                            }, function (err) {
                                                console.log(err);
                                            });
                                        }
                                        _this.dismissLoading();
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_otp_otp__["a" /* OtpPage */], { registerRequest: _this.registerRequest, countryCode: _this.countryCode });
                                    }, function (err) {
                                        console.log(err);
                                        _this.dismissLoading();
                                        _this.translate.get('checking_phone_error').subscribe(function (value) {
                                            _this.showToast(value);
                                        });
                                    }));
                                });
                            }
                        }]
                });
                alert.present();
            });
        }
    };
    PhonePage.prototype.makeExitAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'App termination',
            message: 'Do you want to close the app?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Application exit prevented!');
                    }
                }, {
                    text: 'Close App',
                    handler: function () {
                        _this.platform.exitApp(); // Close this application
                    }
                }]
        });
        alert.present();
    };
    PhonePage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    PhonePage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    PhonePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PhonePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-phone',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/phone/phone.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title text-center>{{config.appName}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="form" padding-left padding-right>\n    <p text-center>{{\'enter_phone_text\' | translate}} <br />{{\'enter_phone_text1\' | translate}}</p>\n    <ion-list>\n      <ion-item>\n        <ion-label>{{\'address_country\' | translate}}</ion-label>\n        <ion-select [(ngModel)]="countryCode" placeholder="{{\'select\' | translate}}" okText="{{\'okay\' | translate}}"\n          cancelText="{{\'cancel\' | translate}}" multiple="false">\n          <ion-option [value]="country.callingCodes[0]" *ngFor="let country of countries">{{country.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label>{{\'phone\' | translate}}</ion-label>\n        <ion-input type="tel" text-right placeholder="{{\'phone\' | translate}}" [(ngModel)]="registerRequest.username">\n        </ion-input>\n      </ion-item>\n    </ion-list>\n    <button ion-button full class="bg-thime btn-round btn-text" (click)="createUser()">\n      {{\'continue\' | translate}}\n    </button>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/phone/phone.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_7__node_modules_ngx_translate_core__["c" /* TranslateService */]])
    ], PhonePage);
    return PhonePage;
}());

//# sourceMappingURL=phone.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Global; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_cart_item_models__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Global = /** @class */ (function () {
    function Global() {
    }
    Global.prototype.decrementCartItem = function (pro) {
        this.checkCartItems();
        var decrement = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            if (this.cartItems[pos].quantity > 1) {
                this.cartItems[pos].quantity = this.cartItems[pos].quantity - 1;
                decrement = true;
            }
            else {
                this.cartItems.splice(pos, 1);
            }
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].CART_ITEMS, JSON.stringify(this.cartItems));
        }
        return decrement;
    };
    Global.prototype.incrementCartItem = function (pro) {
        this.checkCartItems();
        var increment = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.cartItems[pos].quantity = this.cartItems[pos].quantity + 1;
            increment = true;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].CART_ITEMS, JSON.stringify(this.cartItems));
        }
        return increment;
    };
    Global.prototype.removeCartItem = function (pro) {
        this.checkCartItems();
        var removed = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.cartItems.splice(pos, 1);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].CART_ITEMS, JSON.stringify(this.cartItems));
            removed = true;
        }
        return removed;
    };
    Global.prototype.addCartItem = function (pro) {
        this.checkCartItems();
        var added = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.cartItems[pos].quantity = this.cartItems[pos].quantity + 1;
        }
        else {
            var cartItem = new __WEBPACK_IMPORTED_MODULE_1__models_cart_item_models__["a" /* CartItem */]();
            cartItem.product = pro;
            cartItem.product_id = pro.id;
            cartItem.quantity = 1;
            this.cartItems.push(cartItem);
            added = true;
        }
        console.log(this.cartItems);
        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].CART_ITEMS, JSON.stringify(this.cartItems));
        return added;
    };
    Global.prototype.toggleFavorite = function (pro) {
        this.checkFavorites();
        var toggleResult = false;
        var pos = -1;
        for (var i = 0; i < this.favorites.length; i++) {
            if (pro.id == this.favorites[i].id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.favorites.splice(pos, 1);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].FAVORITES, JSON.stringify(this.favorites));
            console.log('saving remove');
            toggleResult = false;
        }
        else {
            this.favorites.push(pro);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].FAVORITES, JSON.stringify(this.favorites));
            console.log('saving save');
            toggleResult = true;
        }
        return toggleResult;
    };
    Global.prototype.removeFavorite = function (pro) {
        this.checkFavorites();
        var removed = false;
        var pos = -1;
        for (var i = 0; i < this.favorites.length; i++) {
            if (pro.id == this.favorites[i].id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.favorites.splice(pos, 1);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].FAVORITES, JSON.stringify(this.favorites));
            removed = true;
        }
        return removed;
    };
    Global.prototype.isFavorite = function (pro) {
        this.checkFavorites();
        var fav = false;
        for (var _i = 0, _a = this.favorites; _i < _a.length; _i++) {
            var product = _a[_i];
            if (pro.id == product.id) {
                fav = true;
                break;
            }
        }
        return fav;
    };
    Global.prototype.addInSearchHistory = function (query) {
        this.checkSearchHistory();
        var index = this.searchHistory.indexOf(query);
        if (index == -1) {
            if (this.searchHistory.length == 5) {
                this.searchHistory.splice(0, 1);
            }
            this.searchHistory.push(query);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SEARCH_HISTORY, JSON.stringify(this.searchHistory));
        }
    };
    Global.prototype.clearCart = function () {
        this.cartItems = new Array();
        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].CART_ITEMS, JSON.stringify(this.cartItems));
    };
    Global.prototype.clearSearchHistory = function () {
        this.searchHistory = new Array();
        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SEARCH_HISTORY, JSON.stringify(this.searchHistory));
    };
    Global.prototype.checkCartItems = function () {
        if (this.cartItems == null) {
            var cartItems = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].CART_ITEMS));
            if (cartItems != null) {
                this.cartItems = cartItems;
            }
            else {
                this.cartItems = new Array();
            }
        }
    };
    Global.prototype.checkFavorites = function () {
        if (this.favorites == null) {
            var favProducts = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].FAVORITES));
            if (favProducts != null) {
                this.favorites = favProducts;
            }
            else {
                this.favorites = new Array();
            }
        }
    };
    Global.prototype.checkSearchHistory = function () {
        if (this.searchHistory == null) {
            var history_1 = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SEARCH_HISTORY));
            if (history_1 != null) {
                this.searchHistory = history_1;
            }
            else {
                this.searchHistory = new Array();
            }
        }
    };
    Global.prototype.refreshCartItems = function () {
        var cartItems = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].CART_ITEMS));
        if (cartItems != null) {
            this.cartItems = cartItems;
        }
        else {
            this.cartItems = new Array();
        }
    };
    Global.prototype.getSearchHistory = function () {
        this.checkSearchHistory();
        return this.searchHistory;
    };
    Global.prototype.getFavorites = function () {
        this.checkFavorites();
        return this.favorites;
    };
    Global.prototype.getCartItems = function () {
        this.checkCartItems();
        return this.cartItems;
    };
    Global.prototype.getCartItemsCount = function () {
        var cartItems = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].CART_ITEMS));
        if (cartItems != null) {
            this.cartItems = cartItems;
        }
        else {
            this.cartItems = new Array();
        }
        return this.cartItems.length;
    };
    Global = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], Global);
    return Global;
}());

//# sourceMappingURL=global.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PasswordPage = /** @class */ (function () {
    function PasswordPage(translate, toastCtrl, navCtrl, service, loadingCtrl) {
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
    }
    PasswordPage.prototype.resetPassword = function () {
        var _this = this;
        if (this.userLogin && this.userLogin.length) {
            this.translate.get('loading_password_reset').subscribe(function (value) {
                _this.presentLoading(value);
            });
            var subscription = this.service.resetPassword(this.userLogin).subscribe(function (data) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            }, function (err) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            });
            this.subscriptions.push(subscription);
        }
        else {
            this.translate.get('field_error_valid_email').subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    PasswordPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    PasswordPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    PasswordPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-password ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/password/password.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <img src="assets/imgs/ic_menu.png">\n    </button>\n    <ion-title>{{\'forgot_password\' | translate}} </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="form" padding-left padding-right>\n    <p text-center [innerHTML]="\'reset_password_box\' | translate"></p>\n    <ion-list>\n      <ion-item>\n        <ion-input type="email" text-center placeholder="{{\'email\' | translate}}" [(ngModel)]="userLogin">\n        </ion-input>\n      </ion-item>\n    </ion-list>\n    <button ion-button full class="bg-thime btn-round btn-text" (click)="resetPassword()">\n      {{"submit" | translate}}\n    </button>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/password/password.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__node_modules_ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], PasswordPage);
    return PasswordPage;
}());

//# sourceMappingURL=password.js.map

/***/ }),

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateaccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_register_request_models__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_otp_otp__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_config__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var CreateaccountPage = /** @class */ (function () {
    function CreateaccountPage(config, events, toastCtrl, navCtrl, service, translate, loadingCtrl, alertCtrl) {
        this.config = config;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.authError = "";
        this.subscriptions = [];
        this.registerRequest = new __WEBPACK_IMPORTED_MODULE_4__models_register_request_models__["a" /* RegisterRequest */]('', '', '', '', '', '');
        this.buttonDisabled = true;
        this.getCountries();
    }
    CreateaccountPage.prototype.getCountries = function () {
        var _this = this;
        this.service.getCountries().subscribe(function (data) {
            _this.countries = data;
        }, function (err) {
            console.log(err);
        });
    };
    CreateaccountPage.prototype.register = function () {
        var _this = this;
        this.authError = "";
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (this.registerRequest.first_name == "" || !this.registerRequest.first_name.length) {
            this.translate.get('field_error_name_first').subscribe(function (value) {
                _this.showToast(value);
            });
            // this.showToast('Please enter your first name');
        }
        else if (!this.countryCode || !this.countryCode.length) {
            this.translate.get('login_countrycode_empty').subscribe(function (value) {
                _this.showToast(value);
            });
            // this.showToast('Username or Password cannot be empty!');
        }
        else if (!this.registerRequest.username || !this.registerRequest.username.length) {
            this.translate.get('field_error_phone_valid').subscribe(function (value) {
                _this.showToast(value);
            });
            // this.showToast('Enter valid phone');
        }
        else if (this.registerRequest.email.length <= 5 || !reg.test(this.registerRequest.email)) {
            this.translate.get('field_error_email').subscribe(function (value) {
                _this.showToast(value);
            });
            // this.showToast('Enter valid email address');
        }
        else if (this.registerRequest.password.length < 6) {
            this.translate.get('field_error_password').subscribe(function (value) {
                _this.showToast(value);
            });
            // this.showToast('Enter valid passwords, twice.');
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: "+" + this.countryCode + this.registerRequest.username,
                message: "Continue using this phone number for OTP verification?",
                buttons: [{
                        text: "No",
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }, {
                        text: "Yes",
                        handler: function () {
                            _this.translate.get('loading_sign_up').subscribe(function (value) {
                                _this.presentLoading(value);
                            });
                            var subscription = _this.service.createUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), _this.countryCode, _this.registerRequest).subscribe(function (data) {
                                _this.dismissLoading();
                                _this.registerResponse = data;
                                _this.translate.get('signup_success').subscribe(function (value) {
                                    _this.showToast(value);
                                });
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_otp_otp__["a" /* OtpPage */], { registerRequest: _this.registerRequest, countryCode: _this.countryCode });
                            }, function (err) {
                                console.log(err);
                                _this.dismissLoading();
                                // if (err && err.error && err.error.message) {
                                // 	this.authError = err.error.message;
                                // 	let pos = this.authError.indexOf('<a');
                                // 	if (pos != -1) {
                                // 		this.authError = this.authError.substr(0, pos) + '<a target="_blank" ' + this.authError.substr(pos + 2, this.authError.length - 1);
                                // 	}
                                // } else {
                                // 	this.translate.get('something_went_wrong').subscribe(value => {
                                // 		this.showToast(value);
                                // 	});
                                // }
                                _this.translate.get('signup_error').subscribe(function (value) {
                                    _this.showToast(value);
                                });
                            });
                            _this.subscriptions.push(subscription);
                        }
                    }]
            });
            alert_1.present();
        }
    };
    CreateaccountPage.prototype.getUser = function (userId) {
        var _this = this;
        var subscription = this.service.getUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), userId).subscribe(function (data) {
            _this.dismissLoading();
            var userResponse = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(userResponse));
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            _this.events.publish('user:login', userResponse);
        }, function (err) {
            _this.dismissLoading();
            _this.translate.get('login_error').subscribe(function (value) {
                _this.presentErrorAlert(value);
            });
        });
        this.subscriptions.push(subscription);
    };
    CreateaccountPage.prototype.signinPage = function () {
        this.navCtrl.pop();
    };
    CreateaccountPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    CreateaccountPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    CreateaccountPage.prototype.presentErrorAlert = function (msg) {
        var _this = this;
        this.translate.get(['error', 'dismiss']).subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['error'],
                subTitle: msg,
                buttons: [text['dismiss']]
            });
            alert.present();
        });
    };
    CreateaccountPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CreateaccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-createaccount',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/createaccount/createaccount.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'create_ac\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="form" padding-left padding-right>\n        <p text-center padding-bottom margin-bottom>{{\'reg_on\' | translate}} {{config.appName}}</p>\n        <ion-list>\n            <ion-item>\n                <ion-label>{{\'address_first_name\' | translate}}</ion-label>\n                <ion-input type="text" text-right placeholder="{{\'address_first_name\' | translate}}"\n                    [(ngModel)]="registerRequest.first_name"></ion-input>\n            </ion-item>\n            <!-- <ion-item>\n                <ion-label>{{\'address_last_name\' | translate}}</ion-label>\n                <ion-input type="text" text-right placeholder="{{\'address_last_name\' | translate}}"\n                    [(ngModel)]="registerRequest.last_name"></ion-input>\n            </ion-item> -->\n            <ion-item>\n                <ion-label>{{\'address_country\' | translate}}</ion-label>\n                <ion-select [(ngModel)]="countryCode" placeholder="{{\'select\' | translate}}" multiple="false">\n                    <ion-option [value]="country.callingCodes[0]" *ngFor="let country of countries">{{country.name}}\n                    </ion-option>\n                </ion-select>\n            </ion-item>\n            <ion-item>\n                <ion-label>{{\'phone\' | translate}}</ion-label>\n                <ion-input type="tel" text-right placeholder="{{\'phone\' | translate}}"\n                    [(ngModel)]="registerRequest.username"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label>{{\'email\' | translate}}</ion-label>\n                <ion-input type="email" text-right placeholder="{{\'email\' | translate}}"\n                    [(ngModel)]="registerRequest.email"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label>{{\'password\' | translate}}</ion-label>\n                <ion-input type="password" text-right placeholder="{{\'c_password\' | translate}}"\n                    [(ngModel)]="registerRequest.password"></ion-input>\n            </ion-item>\n            <!-- <ion-item>\n                <ion-label>{{\'c2_password\' | translate}}</ion-label>\n                <ion-input type="password" text-right placeholder="{{\'c2_password\' | translate}}"\n                    [(ngModel)]="registerRequestPasswordConfirm"></ion-input>\n            </ion-item> -->\n        </ion-list>\n        <!-- <p text-center [innerHTML]="authError"></p> -->\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="register()">\n            {{\'continue\' | translate}}\n        </button>\n    </div>\n    <p text-center (click)="signinPage()" class="btn-fisx-bottom">\n        <small>\n            {{\'already_a/c\' | translate}}\n            <span class="text-sky">\n                {{\'login\' | translate}}\n            </span>\n        </small>\n    </p>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/createaccount/createaccount.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_7__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_8__node_modules_ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], CreateaccountPage);
    return CreateaccountPage;
}());

//# sourceMappingURL=createaccount.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_constants_models__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UploadPage = /** @class */ (function () {
    function UploadPage(navCtrl, service, toastCtrl, viewCtrl, file, camera, firebaseService, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.file = file;
        this.camera = camera;
        this.firebaseService = firebaseService;
        this.translate = translate;
        this.subscriptions = [];
        this.cameraUploads = [];
        this.galleryUploads = [];
        this.translate.get('share_prsc').subscribe(function (value) {
            _this.message = value;
        });
    }
    UploadPage.prototype.editphoto = function () {
        if (this.progress)
            return;
        var fileInput = document.getElementById("pres-image");
        fileInput.click();
    };
    UploadPage.prototype.changeFileListener = function ($event) {
        var _this = this;
        var files = $event.target.files;
        console.log($event.target.files);
        for (var i = 0; i < files.length; i++) {
            if (files[i]) {
                this.progress = true;
                this.translate.get('upload_progress_message').subscribe(function (value) {
                    _this.message = value;
                });
                this.firebaseService.uploadFile(files[i]).then(function (url) {
                    _this.progress = false;
                    _this.translate.get('share_prsc').subscribe(function (value) {
                        _this.message = value;
                    });
                    _this.galleryUploads.push(String(url));
                    // if ((i+1) == files.length) {
                    //   this.saveUrl(String(url), true);
                    // }
                    // else {
                    //   this.saveUrl(String(url), false);
                    // }
                }).catch(function (err) {
                    _this.progress = false;
                    console.log(err);
                    _this.translate.get('upload_error').subscribe(function (value) {
                        _this.message = value;
                    });
                });
            }
        }
        // for (var i = 0; i < files.length; i++) {
        //   // this.fileToUpload = files[i];
        // if (files[i]) {
        //   this.progress = true;
        //   this.translate.get('upload_progress_message').subscribe(value => {
        //     this.message = value;
        //   });
        //   this.firebaseService.uploadFile(files[i]).then(url => {
        //     console.log(i + '--------------------------------------------------------');
        //     console.log(files[i]);
        //     console.log(String(url));
        //     this.saveUrl(String(url));
        //   }).catch(err => {
        //     this.progress = false;
        //     console.log(err);
        //     this.translate.get('upload_error').subscribe(value => {
        //       this.message = value;
        //     });
        //   })
        // }
        // }
    };
    UploadPage.prototype.pickCamera = function () {
        var _this = this;
        if (this.progress)
            return;
        this.camera.getPicture().then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            console.log(imageData);
            _this.resolve(imageData, true);
        }, function (err) {
            _this.translate.get('upload_error_file').subscribe(function (value) {
                _this.message = value;
            });
            console.log('ce ' + err);
        });
    };
    UploadPage.prototype.resolve = function (uri, image) {
        var _this = this;
        console.log('uri: ' + uri);
        var base64Image = '';
        if (uri.startsWith('content://') && uri.indexOf('/storage/') != -1) {
            uri = "file://" + uri.substring(uri.indexOf("/storage/"), uri.length);
            console.log('file: ' + uri);
        }
        this.file.resolveLocalFilesystemUrl(uri).then(function (entry) {
            console.log(entry);
            var fileEntry = entry;
            fileEntry.file(function (success) {
                var mimeType = success.type;
                console.log(mimeType);
                var dirPath = entry.nativeURL;
                base64Image = window.Ionic.WebView.convertFileSrc(uri);
                _this.cameraUploads.push({ 'dirPath': dirPath, 'name': entry.name, 'mimeType': mimeType, 'base64Image': base64Image });
                // this.upload(dirPath, entry.name, mimeType);
            }, function (error) {
                console.log(error);
            });
        });
    };
    UploadPage.prototype.uploadPickCameraImages = function () {
        for (var i = 0; i < this.cameraUploads.length; i++) {
            this.upload(this.cameraUploads[i].dirPath, this.cameraUploads[i].name, this.cameraUploads[i].mimeType, ((i + 1) == this.cameraUploads.length) ? true : false, ((i + 1) == this.cameraUploads.length) ? true : false);
        }
    };
    UploadPage.prototype.uploadSelectedImages = function () {
        var _this = this;
        this.progress = true;
        this.translate.get('upload_progress_message').subscribe(function (value) {
            _this.message = value;
        });
        for (var i = 0; i < this.galleryUploads.length; i++) {
            if ((i + 1) == this.galleryUploads.length) {
                this.saveUrl(this.galleryUploads[i], true);
            }
            else {
                this.saveUrl(this.galleryUploads[i], false);
            }
        }
    };
    UploadPage.prototype.upload = function (path, name, mime, dismiss, clearCameraUploads) {
        var _this = this;
        if (dismiss === void 0) { dismiss = true; }
        if (clearCameraUploads === void 0) { clearCameraUploads = false; }
        this.translate.get('upload_progress_message').subscribe(function (value) {
            _this.message = value;
        });
        console.log('original: ' + path);
        var dirPathSegments = path.split('/');
        dirPathSegments.pop();
        path = dirPathSegments.join('/');
        console.log('dir: ' + path);
        this.file.readAsArrayBuffer(path, name).then(function (buffer) {
            _this.translate.get('upload_progress_message').subscribe(function (value) {
                _this.message = value;
            });
            _this.progress = true;
            _this.firebaseService.uploadBlob(new Blob([buffer], { type: mime })).then(function (url) {
                _this.saveUrl(String(url), dismiss);
                if (clearCameraUploads) {
                    _this.cameraUploads = [];
                }
            }).catch(function (err) {
                _this.progress = false;
                console.log(err);
                _this.translate.get('upload_error').subscribe(function (value) {
                    _this.message = value;
                });
                if (clearCameraUploads) {
                    _this.cameraUploads = [];
                }
            });
        }).catch(function (err) {
            _this.translate.get('upload_error_file').subscribe(function (value) {
                _this.message = value;
            });
            if (clearCameraUploads) {
                _this.cameraUploads = [];
            }
            console.log(err);
        });
    };
    UploadPage.prototype.saveUrl = function (url, dismiss) {
        var _this = this;
        if (dismiss === void 0) { dismiss = true; }
        console.log('url -------');
        console.log(url);
        this.presUrl = url;
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_KEY));
        var subscription = this.service.createPrescription(String(user.id), url).subscribe(function (data) {
            _this.translate.get('upload_success').subscribe(function (value) {
                _this.showToast(value);
            });
            _this.progress = false;
            console.log(data);
            if (dismiss) {
                _this.galleryUploads = [];
                _this.dismiss();
            }
        }, function (err) {
            _this.translate.get('upload_error_submit').subscribe(function (value) {
                _this.showToast(value);
            });
            _this.progress = false;
            console.log(err);
            if (dismiss) {
                _this.galleryUploads = [];
                _this.dismiss();
            }
        });
        this.subscriptions.push(subscription);
    };
    UploadPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    UploadPage.prototype.dismiss = function () {
        if (this.progress)
            return;
        this.viewCtrl.dismiss(this.presUrl);
    };
    UploadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upload ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/upload/upload.html"*/'<ion-content class="bg-light" padding>\n	<ion-card>\n		<img src="assets/imgs/uplod-img.png" />\n		<ion-icon name="md-close" class="close-icon" (click)="dismiss()"></ion-icon>\n		<ion-card-content>\n			<ion-card-title text-center>\n				{{message}}\n			</ion-card-title>\n			<ion-row class="d-flex">\n				<ion-col col-6>\n					<button ion-button full class="bg-thime btn-round btn-text btn-shadow" (click)="pickCamera()">\n						<span *ngIf="cameraUploads.length == 0">{{"camera" | translate}}</span>\n						<span *ngIf="cameraUploads.length > 0">Add more</span>\n					</button>\n				</ion-col>\n				<ion-col col-6>\n					<button ion-button block outline class="btn-round btn-text btn-shadow" (click)="editphoto()">\n						<span *ngIf="galleryUploads.length == 0">{{"gallery" | translate}}</span> \n						<span *ngIf="galleryUploads.length > 0">Add more</span>\n						<input id="pres-image" style="display: none" (change)="changeFileListener($event)" type="file">\n					</button>\n				</ion-col>\n				<ion-row *ngIf="cameraUploads.length > 0" class="d-flex">\n					<ion-col *ngFor="let cu of cameraUploads" col-3>\n						<img width="70" [src]="cu.base64Image">\n					</ion-col>\n				</ion-row>\n				<ion-col *ngIf="cameraUploads.length > 0" col-12>\n					<button ion-button full class="bg-thime btn-round btn-text btn-shadow" (click)="uploadPickCameraImages()">\n						{{"Upload camera images" | translate}}\n					</button>\n				</ion-col>\n				<ion-row *ngIf="galleryUploads.length > 0" class="d-flex">\n					<ion-col *ngFor="let gu of galleryUploads" col-3>\n						<img width="70" [src]="gu">\n					</ion-col>\n				</ion-row>\n				<ion-col *ngIf="galleryUploads.length > 0" col-12>\n					<button ion-button full class="bg-thime btn-round btn-text btn-shadow" (click)="uploadSelectedImages()">\n						{{"Upload selected images" | translate}}\n					</button>\n				</ion-col>\n			</ion-row>\n		</ion-card-content>\n	</ion-card>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/upload/upload.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service__["a" /* FirebaseClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service__["a" /* FirebaseClient */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
    ], UploadPage);
    return UploadPage;
}());

//# sourceMappingURL=upload.js.map

/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Category; });
var Category = /** @class */ (function () {
    function Category() {
    }
    return Category;
}());

//# sourceMappingURL=category.models.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Upload_prescriptionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Upload_prescriptionPage = /** @class */ (function () {
    function Upload_prescriptionPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    Upload_prescriptionPage.prototype.home = function () {
        window.localStorage.setItem("tabpos", "0");
        this.navCtrl.pop();
    };
    Upload_prescriptionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upload_prescription',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/upload_prescription/upload_prescription.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>\n			{{"uploaded" |translate}}\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<div class="container" text-center>\n		<div class="img_box">\n			<ion-icon class="zmdi zmdi-assignment-check"></ion-icon>\n		</div>\n		<h1> {{"prescription_uploaded" |translate}}</h1>\n		<p>{{"your_precription_has_been" |translate}} <br>{{"uploaded_we_ll_get_back" |translate}}\n			<br>{{"to_you_shortly" |translate}}</p>\n	</div>\n</ion-content>\n\n<ion-footer no-border>\n	<button ion-button full class="bg-thime btn-round green-shadow btn-text" (click)="home()">\n		{{"home" | translate}}\n	</button>\n</ion-footer>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/upload_prescription/upload_prescription.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], Upload_prescriptionPage);
    return Upload_prescriptionPage;
}());

//# sourceMappingURL=upload_prescription.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderUpdateRequest; });
var OrderUpdateRequest = /** @class */ (function () {
    function OrderUpdateRequest(status) {
        this.status = status;
    }
    return OrderUpdateRequest;
}());

//# sourceMappingURL=order-update-request.models.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Order_infoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_helper_models__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Order_infoPage = /** @class */ (function () {
    function Order_infoPage(navCtrl, navParam) {
        this.navCtrl = navCtrl;
        this.orderLevel = 0;
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
        var hasServiceFee = false;
        var sf;
        if (this.order.fee_lines && this.order.fee_lines.length) {
            for (var _i = 0, _a = this.order.fee_lines; _i < _a.length; _i++) {
                var fl = _a[_i];
                if (fl.name.toLowerCase().includes("service")) {
                    hasServiceFee = true;
                    sf = fl.total;
                    break;
                }
            }
        }
        if (hasServiceFee) {
            var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].CURRENCY));
            if (currency) {
                var currencyText = currency.value;
                var iconText = currency.options[currency.value];
                var currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
                if (!sf)
                    sf = __WEBPACK_IMPORTED_MODULE_3__models_helper_models__["a" /* Helper */].getSetting("mobile_ecommerce_service_fee");
                if (sf && sf.length) {
                    var servicefee = Number(Number(sf).toFixed());
                    if (currencyIcon) {
                        this.servicefeeHtml = currencyIcon + " " + servicefee;
                    }
                    else if (currencyText) {
                        this.servicefeeHtml = currencyText + " " + servicefee;
                    }
                }
            }
        }
    }
    Order_infoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-order_info',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/order_info/order_info.html"*/'<ion-header class="bg-transparent">\n	<ion-navbar>\n		<ion-title>\n			{{\'order_info\' | translate}}\n		</ion-title>\n	</ion-navbar>\n	<div class="order_info">\n		<ion-list no-lines>\n			<ion-item>\n				<h2 class="d-flex">{{"order_id" | translate}} - {{order.id}}\n					<span class="end">{{order.status | translate}}</span>\n				</h2>\n				<ion-row>\n					<ion-col col-3>\n						<h4>{{"ordered_on" | translate}}</h4>\n						<h3>{{order.date_created}}</h3>\n					</ion-col>\n				</ion-row>\n			</ion-item>\n		</ion-list>\n\n		<div class="order_status">\n			<ion-row>\n				<ion-col [ngClass]="(orderLevel>=1)? \'complate\' : \'\'" col-4 text-center>\n					<div class="img_box">\n						<img *ngIf="!(orderLevel>=1)" src="assets/imgs/ic_confirmedoff.png" class="before">\n						<img *ngIf="orderLevel>=1" src="assets/imgs/ic_confirmed.png" class="after">\n					</div>\n					<h3>{{"confirmed" | translate}}</h3>\n				</ion-col>\n				<ion-col [ngClass]="(orderLevel>=2)? \'complate\' : \'\'" col-4 text-center>\n					<div class="img_box">\n						<img *ngIf="!(orderLevel>=2)" src="assets/imgs/ic_dipatchedoff.png" class="before">\n						<img *ngIf="orderLevel>=2" src="assets/imgs/ic_dipatched.png" class="after">\n					</div>\n					<h3>{{"dispatched" | translate}}</h3>\n				</ion-col>\n				<ion-col [ngClass]="(orderLevel>=3)? \'complate\' : \'\'" col-4 text-center>\n					<div class="img_box">\n						<img *ngIf="!(orderLevel>=3)" src="assets/imgs/ic_deliveredoff.png" class="before">\n						<img *ngIf="orderLevel>=3" src="assets/imgs/ic_delivered.png" class="after">\n					</div>\n					<h3>{{"delivered" | translate}}</h3>\n				</ion-col>\n			</ion-row>\n		</div>\n	</div>\n</ion-header>\n\n<ion-content class="bg-light">\n	<ion-list no-lines class="items_ordered">\n		<h1>{{"items_ordered" | translate}}</h1>\n		<ion-item *ngFor="let item of order.line_items">\n			<h2 item-start class="item_quantity"><span text-start>{{item.quantity}}</span>x</h2>\n			<h2 class="item_name">{{item.name}}</h2>\n		</ion-item>\n	</ion-list>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/order_info/order_info.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], Order_infoPage);
    return Order_infoPage;
}());

//# sourceMappingURL=order_info.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectShippingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__payment_payment__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SelectShippingPage = /** @class */ (function () {
    function SelectShippingPage(translate, navParams, navCtrl, toastCtrl) {
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.shippingMethodId = -1;
        this.totalItems = 0;
        this.total = 0;
        this.cartItems = navParams.get('cart');
        this.totalItems = navParams.get('totalItems');
        this.total = navParams.get('total');
        this.coupon = navParams.get("coupon");
        this.shippingMethods = navParams.get('shipping_methods');
    }
    SelectShippingPage.prototype.selectShipping = function (sm) {
        this.shippingMethod = sm;
        this.shippingMethodId = sm.id;
        console.log("sms", sm);
    };
    SelectShippingPage.prototype.next = function () {
        var _this = this;
        if (this.shippingMethods && this.shippingMethods.length && !this.shippingMethod) {
            this.translate.get("shipping_select").subscribe(function (value) { return _this.showToast(value); });
        }
        else {
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_SHIPPING_METHOD, JSON.stringify(this.shippingMethod));
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__payment_payment__["a" /* PaymentPage */], { cart: this.cartItems, totalItems: this.totalItems, total: this.total, coupon: this.coupon });
        }
    };
    SelectShippingPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SelectShippingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-selectshipping',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/selectshipping/selectshipping.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'shipping_methods\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n	<ion-list no-lines radio-group [(ngModel)]="shippingMethodId" name="case" required>\n		<h2>{{\'shipping_select\' | translate}}</h2>\n		<ion-item *ngFor="let shipping of shippingMethods">\n			<ion-radio value="{{shipping.id}}" item-start (ionSelect)="selectShipping(shipping)"></ion-radio>\n			<ion-label>\n				<h2>{{shipping.title}}</h2>\n				<p></p>\n			</ion-label>\n			<h3 text-end item-end [innerHTML]="shipping.costToShow"></h3>\n		</ion-item>\n	</ion-list>\n</ion-content>\n<ion-footer no-border>\n	<button ion-button block outline (click)="next()" class="bg-white add_new_location">\n		<!-- <ion-icon name="md-add" icon-start></ion-icon> -->\n		{{\'continue\' | translate}}\n	</button>\n</ion-footer>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/selectshipping/selectshipping.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
    ], SelectShippingPage);
    return SelectShippingPage;
}());

//# sourceMappingURL=selectshipping.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WishlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WishlistPage = /** @class */ (function () {
    function WishlistPage(navCtrl, modalCtrl, global, translate, toastCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.productsAll = new Array();
        this.favorites = new Array();
        this.cartTotal = 0;
        this.favorites = global.getFavorites();
        this.listFavorites();
    }
    WishlistPage.prototype.listFavorites = function () {
        var proSplit = new Array();
        var productsAll = new Array();
        for (var _i = 0, _a = this.favorites; _i < _a.length; _i++) {
            var pro = _a[_i];
            if (proSplit.length == 2) {
                productsAll.push(proSplit);
                proSplit = new Array();
            }
            pro.favorite = true;
            proSplit.push(pro);
        }
        if (proSplit.length > 0) {
            productsAll.push(proSplit);
        }
        this.productsAll = productsAll;
    };
    WishlistPage.prototype.toggleFavorite = function (pro) {
        pro.favorite = this.global.toggleFavorite(pro);
        this.listFavorites();
    };
    WishlistPage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro: pro, pros: this.favorites });
    };
    WishlistPage.prototype.ionViewDidEnter = function () {
        this.cartTotal = Number(this.global.getCartItemsCount());
    };
    WishlistPage.prototype.addToCart = function (product) {
        var _this = this;
        if (product.in_stock && product.purchasable) {
            var added = this.global.addCartItem(product);
            if (added) {
                this.cartTotal = this.cartTotal + 1;
            }
            this.translate.get(added ? 'item_added' : 'item_updated').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('item_unavailable').subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    WishlistPage.prototype.cartPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
        modal.onDidDismiss(function () {
            //this.listFavorites();
            _this.cartTotal = Number(_this.global.getCartItemsCount());
        });
        modal.present();
    };
    WishlistPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1500,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    WishlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-wishlist ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/wishlist/wishlist.html"*/'<ion-header class="bg-thime">\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <img src="assets/imgs/ic_menu.png">\n    </button>\n    <ion-title>{{"my_wishes" | translate}} ({{favorites.length}})\n\n      <div class="icon-box end" (click)="cartPage()">\n        <img src="assets/imgs/ic_my_cart.png">\n        <ion-badge>{{cartTotal}}</ion-badge>\n      </div>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n  <div class="empty-view" *ngIf="!favorites || !favorites.length">\n    <div style="text-align:center">\n      <img src="assets/imgs/no_products.png" alt="no offers" />\n      <span style="color:#9E9E9E; font-weight:bold;">{{\'no_favorites_added\' | translate}}</span>\n    </div>\n  </div>\n  <ion-list>\n    <ion-row *ngFor="let products of productsAll">\n      <ion-col col-6 *ngFor="let pro of products">\n        <ion-card>\n          <ion-card-header>\n            <div *ngIf="pro.images && pro.images.length" class="img-box" (click)="itemdetailPage(pro)">\n              <img data-src="{{pro.images[0].src}}">\n            </div>\n            <div *ngIf="pro.images == null || pro.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n              <img src="assets/imgs/suit_PNG8132.png">\n            </div>\n            <ion-icon *ngIf="pro.favorite" name="md-heart" class="text-sky icon" (click)="toggleFavorite(pro)">\n            </ion-icon>\n            <ion-icon *ngIf="!pro.favorite" name="md-heart-outline" class="text-light icon"\n              (click)="toggleFavorite(pro)"></ion-icon>\n            <h5 (click)="itemdetailPage(pro)">{{pro.name}}</h5>\n          </ion-card-header>\n\n          <ion-card-content>\n            <div *ngIf="pro.type ==\'simple\'" class="btn text-white" (click)="addToCart(pro)">\n              {{ \'add_to_cart\' | translate }}</div>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/wishlist/wishlist.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
    ], WishlistPage);
    return WishlistPage;
}());

//# sourceMappingURL=wishlist.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return My_accountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selectarea_selectarea__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var My_accountPage = /** @class */ (function () {
    function My_accountPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.account = "profile";
        this.addresses = new Array();
        this.addressChangeText = 'Change';
        this.tab = navParams.get("tab");
        this.account = (this.tab && this.tab == 1) ? "profile" : "address";
        this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].USER_KEY));
    }
    My_accountPage.prototype.ionViewDidEnter = function () {
        var addresses = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST));
        if (addresses != null) {
            for (var _i = 0, addresses_1 = addresses; _i < addresses_1.length; _i++) {
                var ad = addresses_1[_i];
                if (!ad.type)
                    ad.type = 1;
            }
            this.addresses = addresses;
        }
    };
    My_accountPage.prototype.addressPage = function (address) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__selectarea_selectarea__["a" /* SelectareaPage */], { address: address });
    };
    My_accountPage.prototype.isReadonly = function () {
        return true;
    };
    My_accountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my_account ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/my_account/my_account.html"*/'<ion-header class="bg-thime">\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<img src="assets/imgs/ic_menu.png">\n		</button>\n		<ion-title>{{"my_account" | translate}}\n		</ion-title>\n	</ion-navbar>\n	<!-- <ion-list padding-left>\n    <ion-item padding-left padding-right>\n      <ion-avatar item-start>\n        <img src="assets/imgs/profile_pix.png">\n      </ion-avatar>\n      <h2 class="">{{user.first_name}} {{user.last_name}}\n        <small class=""> Edit profile</small>\n      </h2>\n      <p class="text-white">{{user.username}} </p>\n    </ion-item>\n  </ion-list> -->\n	<ion-toolbar no-border-top class="tab-bar">\n		<ion-segment [(ngModel)]="account">\n			<ion-segment-button value="profile">\n				{{"profile" | translate}}\n			</ion-segment-button>\n			<!-- <ion-segment-button value="card">\n          My Cards\n      </ion-segment-button> -->\n			<ion-segment-button value="address">\n				{{"my_address" | translate}}\n			</ion-segment-button>\n		</ion-segment>\n	</ion-toolbar>\n</ion-header>\n\n<ion-content class="bg-light">\n	<div [ngSwitch]="account">\n		<div *ngSwitchCase="\'profile\'" class="profile-section">\n			<ion-list no-lines>\n				<ion-item>\n					<div class="text_box">\n						<p>{{ \'address_first_name\' | translate }}</p>\n						<h2>{{user.first_name}}</h2>\n					</div>\n				</ion-item>\n				<ion-item>\n					<div class="text_box">\n						<p>{{ \'phone\' | translate }}</p>\n						<h2>+{{user.username}}</h2>\n					</div>\n				</ion-item>\n				<ion-item>\n					<div class="text_box">\n						<p>{{ \'email\' | translate }}</p>\n						<h2>{{user.email}}</h2>\n					</div>\n				</ion-item>\n			</ion-list>\n		</div>\n\n		<div *ngSwitchCase="\'address\'" class="address-section bg-light">\n			<div class="empty-view" *ngIf="!addresses || !addresses.length">\n				<div style="text-align:center">\n					<img src="assets/imgs/ic_home.png" alt="no offers" />\n					<span style="color:#9E9E9E; font-weight:bold;">{{\'address_empty\' | translate}}</span>\n				</div>\n			</div>\n\n			<ion-list no-lines>\n				<ion-item *ngFor="let address of addresses" (click)="addressPage(address)">\n					<ion-label>\n						<div class="img_box">\n							<img *ngIf="address.type == 1" src="assets/imgs/ic_home_active.png">\n							<img *ngIf="address.type == 1" src="assets/imgs/ic_home_active.png">\n							<h3 *ngIf="address.type == 1">{{"address_type_home" | translate}}</h3>\n							<img *ngIf="address.type == 2" src="assets/imgs/ic_office_active.png">\n							<img *ngIf="address.type == 2" src="assets/imgs/ic_office_active.png">\n							<h3 *ngIf="address.type == 2">{{"address_type_office" | translate}}</h3>\n							<img *ngIf="address.type == 3" src="assets/imgs/ic_location_active.png">\n							<img *ngIf="address.type == 3" src="assets/imgs/ic_location_active.png">\n							<h3 *ngIf="address.type == 3">{{"address_type_other" | translate}}</h3>\n						</div>\n						<p>{{address.address_1}}</p>\n					</ion-label>\n					<!-- <ion-radio value="{{address.id}}"></ion-radio> -->\n				</ion-item>\n			</ion-list>\n		</div>\n	</div>\n</ion-content>\n<ion-footer no-border>\n	<button *ngIf="account == \'address\'" ion-button block outline (click)="addressPage(null)" class="add_new_location">\n		<ion-icon name="md-add" icon-start></ion-icon>\n		{{\'my_address_add_new\' | translate}}\n	</button>\n</ion-footer>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/my_account/my_account.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], My_accountPage);
    return My_accountPage;
}());

//# sourceMappingURL=my_account.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HelpPage = /** @class */ (function () {
    function HelpPage(navParam, translate) {
        var _this = this;
        this.translate = translate;
        var fieldname = navParam.get("fieldname");
        this.translate.get((fieldname == "faq") ? "faq" : "about").subscribe(function (value) {
            _this.title = value;
        });
        var sr = navParam.get("settings");
        this.toShow = fieldname == "faq" ? sr.mobile_ecommerce_appconfig_faq : sr.mobile_ecommerce_appconfig_terms;
        console.log("fieldname", fieldname);
    }
    HelpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-help ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/help/help.html"*/'<ion-header class="bg-thime">\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <img src="assets/imgs/ic_menu.png">\n        </button>\n        <ion-title>{{title}}</ion-title>\n    </ion-navbar>\n    <!-- <ion-searchbar (ionInput)="getItems($event)" (click)="searchPage()"></ion-searchbar>\n    <ion-list>\n      <ion-item *ngFor="let item of items">\n          {{ item }}\n      </ion-item>\n    </ion-list> -->\n</ion-header>\n\n<ion-content>\n    <div padding>\n        <!-- <p class="heading">{{"faq" | translate}}</p> -->\n        <p [innerHTML]="toShow"></p>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/help/help.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
    ], HelpPage);
    return HelpPage;
}());

//# sourceMappingURL=help.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Walkthough_1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Walkthough_1Page = /** @class */ (function () {
    function Walkthough_1Page(navCtrl) {
        this.navCtrl = navCtrl;
    }
    Walkthough_1Page.prototype.home = function () {
        localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].WALKTHROUGH_SHOWN, "shown");
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].USER_KEY));
        this.navCtrl.setRoot(user ? __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */] : __WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    Walkthough_1Page.prototype.next = function () {
        this.slides.slideNext();
    };
    Walkthough_1Page.prototype.prev = function () {
        this.slides.slidePrev();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Slides */])
    ], Walkthough_1Page.prototype, "slides", void 0);
    Walkthough_1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-walkthough_1',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/walkthough_1/walkthough_1.html"*/'<ion-content [fullscreen]="true">\n	<ion-slides loop="true" pager #slides>\n		<ion-slide>\n			<div class="container" text-center>\n				<div class="img_box">\n					<img src="assets/imgs/vector_smart_object1.png">\n				</div>\n				<h2 text-center>{{\'discover\' | translate}}</h2>\n				<p>{{\'explor_medicines_available\' | translate}}<br>{{\'around_you\' | translate}}</p>\n\n				<ion-row>\n					<ion-col col-4 text-start (click)="home()">\n						<h3>{{\'skip\' | translate}}</h3>\n					</ion-col>\n					<ion-col col-4 text-center>\n					</ion-col>\n					<ion-col col-4 text-end (click)="next()">\n						<h3>{{\'next\' | translate}}</h3>\n					</ion-col>\n				</ion-row>\n			</div>\n		</ion-slide>\n\n		<ion-slide>\n			<div class="container" text-center>\n				<div class="img_box">\n					<img src="assets/imgs/vector_smart_object3.png">\n				</div>\n				<h2 text-center>{{\'payment_options\' | translate}}</h2>\n				<p>{{\'choose_the_preferred_payment\' | translate}}<br>{{\'options_available\' | translate}}</p>\n\n				<ion-row>\n					<ion-col col-4 text-start (click)="home()">\n						<h3>{{\'skip\' | translate}}</h3>\n					</ion-col>\n					<ion-col col-4 text-center>\n					</ion-col>\n					<ion-col col-4 text-end (click)="next()">\n						<h3>{{\'next\' | translate}}</h3>\n					</ion-col>\n				</ion-row>\n			</div>\n		</ion-slide>\n\n\n		<ion-slide>\n			<div class="container" text-center>\n				<div class="img_box">\n					<img src="assets/imgs/vector_smart_object2.png">\n				</div>\n				<h2 text-center>{{\'enjoy_your_shopping\' | translate}}</h2>\n				<p>{{\'get_genuine_medicines_for\' | translate}}<br>{{\'the_lowest_price\' | translate}}</p>\n\n				<ion-row>\n					<ion-col col-4 text-start>\n						<!--						<h3>{{\'skip\' | translate}}</h3>-->\n					</ion-col>\n\n					<ion-col col-4 text-center>\n					</ion-col>\n					<ion-col col-4 text-end (click)="home()">\n						<!--						<h3>{{\'next\' | translate}}</h3>-->\n						<h4>{{\'continue\' | translate}}</h4>\n					</ion-col>\n				</ion-row>\n			</div>\n		</ion-slide>\n	</ion-slides>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/walkthough_1/walkthough_1.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], Walkthough_1Page);
    return Walkthough_1Page;
}());

//# sourceMappingURL=walkthough_1.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagelanguagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var ManagelanguagePage = /** @class */ (function () {
    function ManagelanguagePage(config, events, app) {
        this.config = config;
        this.events = events;
        this.app = app;
        this.defaultLanguageCode = this.config.availableLanguages[0].code;
        var defaultLang = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_DEFAULT_LANGUAGE);
        if (defaultLang)
            this.defaultLanguageCode = defaultLang;
    }
    ManagelanguagePage.prototype.onLanguageClick = function (language) {
        this.defaultLanguageCode = language.code;
    };
    ManagelanguagePage.prototype.languageConfirm = function () {
        this.events.publish('language:selection', this.defaultLanguageCode);
        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_DEFAULT_LANGUAGE, this.defaultLanguageCode);
        this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    ManagelanguagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-managelanguage',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/managelanguage/managelanguage.html"*/'<ion-header class="bg-thime">\n	<ion-navbar>\n		<button ion-button menuToggle style="display: block !important;">\n			<ion-icon class="menu-icon">\n				<img src="assets/imgs/ic_menu.png">\n			</ion-icon>\n		</button>\n		<ion-title>{{\'change_language\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n	<ion-list no-lines>\n		<ion-item *ngFor="let language of config.availableLanguages" (click)="onLanguageClick(language)">\n			<h3>{{language.name}}</h3>\n			<ion-icon *ngIf="defaultLanguageCode == language.code" name="md-globe" item-end></ion-icon>\n		</ion-item>\n	</ion-list>\n</ion-content>\n<ion-footer no-border>\n	<button ion-button full class="btn" text-uppercase (click)="languageConfirm()">\n		{{\'save\' | translate}}\n	</button>\n</ion-footer>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/managelanguage/managelanguage.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], ManagelanguagePage);
    return ManagelanguagePage;
}());

//# sourceMappingURL=managelanguage.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_message_models__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_helper_models__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_config__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var ChatsPage = /** @class */ (function () {
    function ChatsPage(config, navParam, toastCtrl, oneSignal, translate) {
        var _this = this;
        this.config = config;
        this.toastCtrl = toastCtrl;
        this.oneSignal = oneSignal;
        this.translate = translate;
        this.messages = new Array();
        this.chat = navParam.get('chat');
        this.userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].USER_KEY));
        this.chatChild = __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].getChatChild(this.chat.myId, this.chat.chatId);
        var component = this;
        this.inboxRef = __WEBPACK_IMPORTED_MODULE_8_firebase_app__["database"]().ref(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].REF_INBOX);
        this.chatRef = __WEBPACK_IMPORTED_MODULE_8_firebase_app__["database"]().ref(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].REF_CHAT);
        this.chatRef.child(this.chatChild).limitToLast(20).on("child_added", function (snapshot, prevChildKey) {
            var newMessage = snapshot.val();
            if (newMessage) {
                newMessage.timeDiff = __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].formatMillisDateTime(Number(newMessage.dateTimeStamp), __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].getLocale());
                component.addMessage(newMessage);
                component.markDelivered();
                component.scrollList();
            }
        }, function (error) {
            console.error("child_added", error);
        });
        __WEBPACK_IMPORTED_MODULE_8_firebase_app__["database"]().ref(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].REF_USERS_FCM_IDS).child(this.chat.chatId).once("value", function (snap) {
            component.userPlayerId = snap.val();
        });
        this.translate.get("just_moment").subscribe(function (value) {
            _this.showToast(value);
        });
    }
    ChatsPage.prototype.ionViewDidEnter = function () {
        this.scrollList();
    };
    ChatsPage.prototype.scrollList = function () {
        this.content.scrollToBottom(300); //300ms animation speed
    };
    ChatsPage.prototype.notifyMessages = function (msgs) {
        var _this = this;
        this.translate.get(['new_msg', 'new_msgs', 'new_msg_from', 'new_msgs_from']).subscribe(function (value) {
            _this.oneSignal.postNotification({
                include_player_ids: [_this.userPlayerId],
                headings: { en: (msgs.length > 1) ? value['new_msgs'] : value['new_msg'] },
                contents: { en: (((msgs.length > 1) ? value['new_msgs_from'] : value['new_msg_from']) + " " + _this.userMe.first_name) },
                data: { msgs: msgs }
            }).then(function (res) { return console.log(res); }).catch(function (err) { return console.log(err); });
        });
    };
    ChatsPage.prototype.markDelivered = function () {
        if (this.messages && this.messages.length) {
            if (this.messages[this.messages.length - 1].senderId != this.chat.myId) {
                this.messages[this.messages.length - 1].delivered = true;
                this.chatRef.child(this.chatChild).child(this.messages[this.messages.length - 1].id).child("delivered").set(true);
                //TODO: update in local db as well.
            }
            else {
                var messagesPendingToNotify = new Array();
                if (!this.messages[this.messages.length - 1].delivered) {
                    messagesPendingToNotify.push(this.messages[this.messages.length - 1]);
                    this.messages[this.messages.length - 1].delivered = true;
                }
                if (messagesPendingToNotify.length && this.userPlayerId) {
                    this.notifyMessages(messagesPendingToNotify);
                }
            }
        }
    };
    ChatsPage.prototype.addMessage = function (msg) {
        this.messages = this.messages.concat(msg);
        //this.storage.set(Constants.KEY_MESSAGES + this.chatChild, this.messages);
        if (this.chat && msg) {
            var isMeSender = msg.senderId == this.chat.myId;
            this.chat.chatImage = isMeSender ? msg.recipientImage : msg.senderImage;
            this.chat.chatName = isMeSender ? msg.recipientName : msg.senderName;
            this.chat.chatStatus = isMeSender ? msg.recipientStatus : msg.senderStatus;
        }
    };
    ChatsPage.prototype.send = function () {
        var _this = this;
        if (this.newMessageText && this.newMessageText.trim().length) {
            var toSend_1 = new __WEBPACK_IMPORTED_MODULE_1__models_message_models__["a" /* Message */]();
            toSend_1.chatId = this.chatChild;
            toSend_1.body = this.newMessageText;
            toSend_1.dateTimeStamp = String(new Date().getTime());
            toSend_1.delivered = false;
            toSend_1.sent = true;
            toSend_1.recipientId = this.chat.chatId;
            toSend_1.recipientImage = this.chat.chatImage;
            toSend_1.recipientName = this.chat.chatName;
            toSend_1.recipientStatus = this.chat.chatStatus;
            toSend_1.senderId = this.chat.myId;
            toSend_1.senderName = this.userMe.first_name;
            toSend_1.senderImage = (this.userMe.avatar_url && this.userMe.avatar_url.length) ? this.userMe.avatar_url : "assets/imgs/empty_dp.png";
            toSend_1.senderStatus = this.config.appName;
            toSend_1.id = this.chatRef.child(this.chatChild).push().key;
            this.chatRef.child(this.chatChild).child(toSend_1.id).set(toSend_1).then(function (res) {
                _this.inboxRef.child(toSend_1.recipientId).child(toSend_1.senderId).set(toSend_1);
                _this.inboxRef.child(toSend_1.senderId).child(toSend_1.recipientId).set(toSend_1);
                _this.newMessageText = '';
            });
        }
        else {
            this.translate.get("type_message").subscribe(function (value) { return _this.showToast(value); });
        }
    };
    ChatsPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", Object)
    ], ChatsPage.prototype, "content", void 0);
    ChatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chats',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/chats/chats.html"*/'<ion-header class="bg-white">\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>{{"customer_care" | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content #content class="bg-light" fullscreen="true">\n	<div class="chat_container d-flex">\n		<div *ngFor="let msg of messages"\n			[ngClass]="(chat.myId == msg.senderId) ? \'chat_box d-flex send\' : \'chat_box d-flex received\'">\n			<div class="chat">\n				<h2>{{msg.body}}</h2>\n				<p>{{msg.timeDiff}}</p>\n			</div>\n		</div>\n	</div>\n</ion-content>\n\n<ion-footer no-border>\n	<ion-list class="" no-lines>\n		<div class="d-flex input_field">\n			<ion-item>\n				<ion-textarea type="text" rows="1" [(ngModel)]="newMessageText"\n					placeholder="{{\'type_message\' | translate}}"></ion-textarea>\n			</ion-item>\n			<h3 (click)="send()" class="end">\n				<ion-icon name="md-send" text-start></ion-icon>\n			</h3>\n		</div>\n	</ion-list>\n</ion-footer>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/chats/chats.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_7__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
    ], ChatsPage);
    return ChatsPage;
}());

//# sourceMappingURL=chats.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Contact_usPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Contact_usPage = /** @class */ (function () {
    function Contact_usPage(iab) {
        this.iab = iab;
    }
    Contact_usPage.prototype.conversation = function () {
        this.iab.create('https://tawk.to/chat/6629b90a1ec1082f04e68d3a/1hs9flkmt', '_blank', 'location=yes');
    };
    Contact_usPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact_us',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/contact_us/contact_us.html"*/'<ion-header class="bg-thime">\n	<ion-navbar>\n		<button ion-button menuToggle style="display: block !important;">\n			<ion-icon class="menu-icon">\n				<img src="assets/imgs/ic_menu.png">\n			</ion-icon>\n		</button>\n		<ion-title>{{\'contact_us\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content fullscreen="true">\n	<div class="banner">\n		<img src="assets/imgs/contact_us.png">\n	</div>\n	<div class="container">\n		<h1 [innerHTML]="\'contact_us_msg\' | translate"></h1>\n		<h2>{{\'contact_us_msg_sub\' | translate}}</h2>\n		<button ion-button block class="btn green-shadow" (click)="conversation()">\n			{{\'chat_now\' | translate}}\n		</button>\n	</div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/contact_us/contact_us.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], Contact_usPage);
    return Contact_usPage;
}());

//# sourceMappingURL=contact_us.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vt_popupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Vt_popupPage = /** @class */ (function () {
    function Vt_popupPage(navCtrl, modalCtrl, viewCtrl, formBuilder, http, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
    }
    Vt_popupPage.prototype.ngOnInit = function () {
        this.subscribeForm = this.formBuilder.group({
            email_Id: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(70), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])]
        });
    };
    Vt_popupPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    Vt_popupPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    Vt_popupPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    Vt_popupPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1500,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    Vt_popupPage.prototype.onSubscribe = function () {
        var _this = this;
        if (!this.subscribeForm.valid) {
            return this.showToast('Please provide your Email.');
        }
        this.presentLoading('Sending...');
        var req = {
            "email": this.subscribeForm.value.email_Id,
            "source": "opus_application_medizone"
        };
        this.http.post("https://dashboard.vtlabs.dev/api/subscribe", req).subscribe(function (res) {
            _this.showToast('Submitted successfully.');
            _this.viewCtrl.dismiss();
            _this.dismissLoading();
        });
    };
    Vt_popupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vt_popup',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/vt_popup/vt_popup.html"*/'<ion-content>\n    <div class="cloes_btn" text-end>\n        <ion-icon name="md-close" (click)="dismiss()"></ion-icon>\n    </div>\n\n    <ion-card>\n        <div class="img_box">\n            <img src="https://opuslabs.nyc3.digitaloceanspaces.com/AAFixItems/Other/popup_img_head.png">\n        </div>\n\n        <div class="text_box">\n            <h2>Stay in touch.</h2>\n            <p>Stay connected for Future <br>updates and new products.</p>\n        </div>\n        <ion-list no-lines [formGroup]="subscribeForm">\n\n            <ion-item>\n                <ion-input type="email" placeholder="Enter your email address" formControlName="email_Id"></ion-input>\n            </ion-item>\n\n            <button ion-button block (click)="onSubscribe()">Subscribe Now</button>\n        </ion-list>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/vt_popup/vt_popup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
    ], Vt_popupPage);
    return Vt_popupPage;
}());

//# sourceMappingURL=vt_popup.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(473);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_code_code__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_addressselect_addressselect__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_password_password__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_order_info_order_info__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_phone_phone__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_otp_otp__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_upload_prescription_upload_prescription__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_createaccount_createaccount__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_category_category__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_itemdetail_itemdetail__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_shippining_shippining__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_payment_payment__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_placed_placed__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_wishlist_wishlist__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_my_account_my_account__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_search_search__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_myorder_2_myorder_2__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_shirts_shirts__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_upload_upload__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_walkthough_1_walkthough_1__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_social_sharing__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__app_config__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ngx_translate_http_loader__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__angular_common_http__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_in_app_browser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_onesignal__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_device__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_status_bar__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_splash_screen__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_camera__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_file__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_selectarea_selectarea__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_add_address_title_add_address_title__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__providers_connectivity_service__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__providers_google_maps__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_geolocation__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_network__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_help_help__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_vendor_profile_vendor_profile__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_managelanguage_managelanguage__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_chats_chats__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_contact_us_contact_us__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__providers_global__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_selectshipping_selectshipping__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_buyappalert_buyappalert__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_vt_popup_vt_popup__ = __webpack_require__(458);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















































function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_30__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__pages_code_code__["a" /* CodePage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_selectarea_selectarea__["a" /* SelectareaPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_add_address_title_add_address_title__["a" /* Add_address_titlePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_addressselect_addressselect__["a" /* AddressSelectPage */],
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_phone_phone__["a" /* PhonePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_otp_otp__["a" /* OtpPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_password_password__["a" /* PasswordPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_createaccount_createaccount__["a" /* CreateaccountPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_itemdetail_itemdetail__["a" /* ItemdetailPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_shippining_shippining__["a" /* ShippiningPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */],
                __WEBPACK_IMPORTED_MODULE_24__pages_shirts_shirts__["a" /* ShirtsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_placed_placed__["a" /* PlacedPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_upload_prescription_upload_prescription__["a" /* Upload_prescriptionPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_wishlist_wishlist__["a" /* WishlistPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_my_account_my_account__["a" /* My_accountPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_order_info_order_info__["a" /* Order_infoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_walkthough_1_walkthough_1__["a" /* Walkthough_1Page */],
                __WEBPACK_IMPORTED_MODULE_25__pages_upload_upload__["a" /* UploadPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_managelanguage_managelanguage__["a" /* ManagelanguagePage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_contact_us_contact_us__["a" /* Contact_usPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_vendor_profile_vendor_profile__["a" /* Vendor_profilePage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_chats_chats__["a" /* ChatsPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_selectshipping_selectshipping__["a" /* SelectShippingPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_buyappalert_buyappalert__["a" /* BuyAppAlertPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_vt_popup_vt_popup__["a" /* Vt_popupPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_31__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_29__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_29__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_31__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__pages_code_code__["a" /* CodePage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_selectarea_selectarea__["a" /* SelectareaPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_add_address_title_add_address_title__["a" /* Add_address_titlePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_addressselect_addressselect__["a" /* AddressSelectPage */],
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_password_password__["a" /* PasswordPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_createaccount_createaccount__["a" /* CreateaccountPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_phone_phone__["a" /* PhonePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_otp_otp__["a" /* OtpPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_itemdetail_itemdetail__["a" /* ItemdetailPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_shippining_shippining__["a" /* ShippiningPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */],
                __WEBPACK_IMPORTED_MODULE_9__pages_order_info_order_info__["a" /* Order_infoPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_shirts_shirts__["a" /* ShirtsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_placed_placed__["a" /* PlacedPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_upload_prescription_upload_prescription__["a" /* Upload_prescriptionPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_wishlist_wishlist__["a" /* WishlistPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_my_account_my_account__["a" /* My_accountPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_walkthough_1_walkthough_1__["a" /* Walkthough_1Page */],
                __WEBPACK_IMPORTED_MODULE_25__pages_upload_upload__["a" /* UploadPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_managelanguage_managelanguage__["a" /* ManagelanguagePage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_chats_chats__["a" /* ChatsPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_contact_us_contact_us__["a" /* Contact_usPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_vendor_profile_vendor_profile__["a" /* Vendor_profilePage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_chats_chats__["a" /* ChatsPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_selectshipping_selectshipping__["a" /* SelectShippingPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_buyappalert_buyappalert__["a" /* BuyAppAlertPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_vt_popup_vt_popup__["a" /* Vt_popupPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_43__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_41__providers_connectivity_service__["a" /* Connectivity */],
                __WEBPACK_IMPORTED_MODULE_42__providers_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_network__["a" /* Network */],
                { provide: __WEBPACK_IMPORTED_MODULE_28__app_config__["a" /* APP_CONFIG */], useValue: __WEBPACK_IMPORTED_MODULE_28__app_config__["b" /* BaseAppConfig */] },
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_50__providers_global__["a" /* Global */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Helper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);


var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.getLocale = function () {
        var sl = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__constants_models__["a" /* Constants */].KEY_LOCALE);
        return sl && sl.length ? sl : "en";
    };
    Helper.formatTimestampDateTime = function (timestamp, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(timestamp).locale(locale).format("DD MMM, HH:mm");
    };
    Helper.formatTimestampDate = function (timestamp, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(timestamp).locale(locale).format("DD MMM YYYY");
    };
    //
    Helper.getChatChild = function (userId, myId) {
        //example: userId="9" and myId="5" -->> chat child = "5-9"
        var values = [userId, myId];
        values.sort(function (one, two) { return (one > two ? -1 : 1); });
        return values[0] + "-" + values[1];
    };
    Helper.formatMillisDateTime = function (millis, locale) {
        //return moment(millis).locale(locale).format("ddd, MMM D, h:mm");
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(millis).locale(locale).format("DD MMM, HH:mm");
    };
    // static formatTimestampDateTime(timestamp: string, locale: string): string {
    //     return moment(timestamp).locale(locale).format("ddd, MMM D, h:mm");
    // }
    Helper.formatMillisDate = function (millis, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(millis).locale(locale).format("DD MMM YYYY");
    };
    // static formatTimestampDate(timestamp: string, locale: string): string {
    //     return moment(timestamp).locale(locale).format("DD MMM YYYY");
    // }
    Helper.formatMillisTime = function (millis, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(millis).locale(locale).format("HH:mm");
    };
    Helper.formatTimestampTime = function (timestamp, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(timestamp).locale(locale).format("HH:mm");
    };
    Helper.getSetting = function (key) {
        var toReturn = null;
        var settings = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__constants_models__["a" /* Constants */].SETTINGS));
        if (settings && settings[key])
            return settings[key];
        else
            return toReturn;
    };
    return Helper;
}());

//# sourceMappingURL=helper.models.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shippining_shippining__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CartPage = /** @class */ (function () {
    function CartPage(translate, global, viewCtrl, toastCtrl, appCtrl) {
        this.translate = translate;
        this.global = global;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.appCtrl = appCtrl;
        this.cartItems = new Array();
        this.total = 0;
        this.checkoutText = 'Proceed to checkout';
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
        }
        var cartItems = global.getCartItems();
        if (cartItems != null) {
            this.cartItems = this.cartItems.concat(cartItems);
        }
        this.calculateTotal();
    }
    CartPage.prototype.removeItem = function (product) {
        this.global.removeCartItem(product);
        this.cartItems = this.global.getCartItems();
        this.calculateTotal();
    };
    CartPage.prototype.decrementItem = function (product) {
        var _this = this;
        var decremented = this.global.decrementCartItem(product);
        if (!decremented) {
            this.cartItems = this.global.getCartItems();
            this.calculateTotal();
        }
        else {
            this.total = this.total - Number(product.sale_price);
            this.setPriceHtml();
        }
        this.translate.get(decremented ? 'item_updated' : 'item_removed').subscribe(function (value) {
            _this.showToast(value);
        });
    };
    CartPage.prototype.incrementItem = function (product) {
        var _this = this;
        var incremented = this.global.incrementCartItem(product);
        if (incremented) {
            this.total = this.total + Number(product.sale_price);
            this.setPriceHtml();
        }
        this.translate.get(incremented ? 'item_updated' : 'item_maxed_out').subscribe(function (value) {
            _this.showToast(value);
        });
    };
    CartPage.prototype.calculateTotal = function () {
        var _this = this;
        var sum = 0;
        for (var _i = 0, _a = this.cartItems; _i < _a.length; _i++) {
            var item = _a[_i];
            sum = sum + Number(item.product.sale_price) * item.quantity;
        }
        this.total = sum;
        this.translate.get(!this.cartItems || !this.cartItems.length ? 'empty_cart' : 'cart_proceed').subscribe(function (value) { return _this.checkoutText = value; });
        this.setPriceHtml();
    };
    CartPage.prototype.setPriceHtml = function () {
        if (this.currencyIcon) {
            this.total_html = this.currencyIcon + ' ' + this.total.toFixed(2);
        }
        else if (this.currencyText) {
            this.total_html = this.currencyText + ' ' + this.total.toFixed(2);
        }
        else {
            this.total_html = this.total.toFixed(2);
        }
    };
    CartPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CartPage.prototype.proceedCheckout = function () {
        var _this = this;
        if (this.cartItems != null && this.cartItems.length > 0) {
            var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].USER_KEY));
            if (user != null) {
                this.viewCtrl.dismiss();
                this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__shippining_shippining__["a" /* ShippiningPage */]);
            }
            else {
                this.translate.get('auth_required').subscribe(function (value) { return _this.showToast(value); });
                this.viewCtrl.dismiss();
                this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
            }
        }
    };
    CartPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/cart/cart.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'cart_title\' | translate}}\n			<ion-icon name="md-close" class="close-icon end" (click)="dismiss()"></ion-icon>\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n	<div class="your-cart">\n		<ion-card *ngFor="let item of cartItems">\n			<ion-card-content>\n				<ion-row>\n					<ion-col col-3>\n						<div *ngIf="item.product.images && item.product.images.length" class="img-box">\n							<img data-src="{{item.product.images[0].src}}">\n						</div>\n						<div *ngIf="item.product.images == null || item.product.images.length == 0" class="img-box">\n							<img src="assets/imgs/suit_PNG8132.png">\n						</div>\n					</ion-col>\n					<ion-col col-9>\n						<h4>\n							<span>{{item.product.name}}</span>\n							<ion-icon text-end name="md-trash" class="icon text-light" (click)="removeItem(item.product)"></ion-icon>\n						</h4>\n						<div class="rate">\n							<div style="display: flex;" class="price-box">\n								\n							</div>\n							<div class="quantiy">\n								<ion-item>\n									<!-- <p>{{\'quantity\' | translate}}</p> -->\n									<h2 class="d-flex" item-end>\n										<span class="add_remove_btn" (click)="decrementItem(item.product)">-</span>\n										<strong>{{item.quantity}}</strong>\n										<span class="add_remove_btn" style="position: relative; top: 0px;" (click)="incrementItem(item.product)">+</span>\n									</h2>\n								</ion-item>\n							</div>\n						</div>\n					</ion-col>\n				</ion-row>\n			</ion-card-content>\n		</ion-card>\n\n		<ion-row class="checkout">\n			<ion-col col-6>\n				<h6 class="">\n					\n				</h6>\n			</ion-col>\n			<ion-col col-6>\n				<button ion-button full class="bg-thime btn-round btn-text btn-shadow" (click)="proceedCheckout()">\n					{{checkoutText}}\n				</button>\n			</ion-col>\n		</ion-row>\n\n	</div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/cart/cart.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__node_modules_ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 276,
	"./af.js": 276,
	"./ar": 277,
	"./ar-dz": 278,
	"./ar-dz.js": 278,
	"./ar-kw": 279,
	"./ar-kw.js": 279,
	"./ar-ly": 280,
	"./ar-ly.js": 280,
	"./ar-ma": 281,
	"./ar-ma.js": 281,
	"./ar-sa": 282,
	"./ar-sa.js": 282,
	"./ar-tn": 283,
	"./ar-tn.js": 283,
	"./ar.js": 277,
	"./az": 284,
	"./az.js": 284,
	"./be": 285,
	"./be.js": 285,
	"./bg": 286,
	"./bg.js": 286,
	"./bm": 287,
	"./bm.js": 287,
	"./bn": 288,
	"./bn-bd": 289,
	"./bn-bd.js": 289,
	"./bn.js": 288,
	"./bo": 290,
	"./bo.js": 290,
	"./br": 291,
	"./br.js": 291,
	"./bs": 292,
	"./bs.js": 292,
	"./ca": 293,
	"./ca.js": 293,
	"./cs": 294,
	"./cs.js": 294,
	"./cv": 295,
	"./cv.js": 295,
	"./cy": 296,
	"./cy.js": 296,
	"./da": 297,
	"./da.js": 297,
	"./de": 298,
	"./de-at": 299,
	"./de-at.js": 299,
	"./de-ch": 300,
	"./de-ch.js": 300,
	"./de.js": 298,
	"./dv": 301,
	"./dv.js": 301,
	"./el": 302,
	"./el.js": 302,
	"./en-au": 303,
	"./en-au.js": 303,
	"./en-ca": 304,
	"./en-ca.js": 304,
	"./en-gb": 305,
	"./en-gb.js": 305,
	"./en-ie": 306,
	"./en-ie.js": 306,
	"./en-il": 307,
	"./en-il.js": 307,
	"./en-in": 308,
	"./en-in.js": 308,
	"./en-nz": 309,
	"./en-nz.js": 309,
	"./en-sg": 310,
	"./en-sg.js": 310,
	"./eo": 311,
	"./eo.js": 311,
	"./es": 312,
	"./es-do": 313,
	"./es-do.js": 313,
	"./es-mx": 314,
	"./es-mx.js": 314,
	"./es-us": 315,
	"./es-us.js": 315,
	"./es.js": 312,
	"./et": 316,
	"./et.js": 316,
	"./eu": 317,
	"./eu.js": 317,
	"./fa": 318,
	"./fa.js": 318,
	"./fi": 319,
	"./fi.js": 319,
	"./fil": 320,
	"./fil.js": 320,
	"./fo": 321,
	"./fo.js": 321,
	"./fr": 322,
	"./fr-ca": 323,
	"./fr-ca.js": 323,
	"./fr-ch": 324,
	"./fr-ch.js": 324,
	"./fr.js": 322,
	"./fy": 325,
	"./fy.js": 325,
	"./ga": 326,
	"./ga.js": 326,
	"./gd": 327,
	"./gd.js": 327,
	"./gl": 328,
	"./gl.js": 328,
	"./gom-deva": 329,
	"./gom-deva.js": 329,
	"./gom-latn": 330,
	"./gom-latn.js": 330,
	"./gu": 331,
	"./gu.js": 331,
	"./he": 332,
	"./he.js": 332,
	"./hi": 333,
	"./hi.js": 333,
	"./hr": 334,
	"./hr.js": 334,
	"./hu": 335,
	"./hu.js": 335,
	"./hy-am": 336,
	"./hy-am.js": 336,
	"./id": 337,
	"./id.js": 337,
	"./is": 338,
	"./is.js": 338,
	"./it": 339,
	"./it-ch": 340,
	"./it-ch.js": 340,
	"./it.js": 339,
	"./ja": 341,
	"./ja.js": 341,
	"./jv": 342,
	"./jv.js": 342,
	"./ka": 343,
	"./ka.js": 343,
	"./kk": 344,
	"./kk.js": 344,
	"./km": 345,
	"./km.js": 345,
	"./kn": 346,
	"./kn.js": 346,
	"./ko": 347,
	"./ko.js": 347,
	"./ku": 348,
	"./ku.js": 348,
	"./ky": 349,
	"./ky.js": 349,
	"./lb": 350,
	"./lb.js": 350,
	"./lo": 351,
	"./lo.js": 351,
	"./lt": 352,
	"./lt.js": 352,
	"./lv": 353,
	"./lv.js": 353,
	"./me": 354,
	"./me.js": 354,
	"./mi": 355,
	"./mi.js": 355,
	"./mk": 356,
	"./mk.js": 356,
	"./ml": 357,
	"./ml.js": 357,
	"./mn": 358,
	"./mn.js": 358,
	"./mr": 359,
	"./mr.js": 359,
	"./ms": 360,
	"./ms-my": 361,
	"./ms-my.js": 361,
	"./ms.js": 360,
	"./mt": 362,
	"./mt.js": 362,
	"./my": 363,
	"./my.js": 363,
	"./nb": 364,
	"./nb.js": 364,
	"./ne": 365,
	"./ne.js": 365,
	"./nl": 366,
	"./nl-be": 367,
	"./nl-be.js": 367,
	"./nl.js": 366,
	"./nn": 368,
	"./nn.js": 368,
	"./oc-lnc": 369,
	"./oc-lnc.js": 369,
	"./pa-in": 370,
	"./pa-in.js": 370,
	"./pl": 371,
	"./pl.js": 371,
	"./pt": 372,
	"./pt-br": 373,
	"./pt-br.js": 373,
	"./pt.js": 372,
	"./ro": 374,
	"./ro.js": 374,
	"./ru": 375,
	"./ru.js": 375,
	"./sd": 376,
	"./sd.js": 376,
	"./se": 377,
	"./se.js": 377,
	"./si": 378,
	"./si.js": 378,
	"./sk": 379,
	"./sk.js": 379,
	"./sl": 380,
	"./sl.js": 380,
	"./sq": 381,
	"./sq.js": 381,
	"./sr": 382,
	"./sr-cyrl": 383,
	"./sr-cyrl.js": 383,
	"./sr.js": 382,
	"./ss": 384,
	"./ss.js": 384,
	"./sv": 385,
	"./sv.js": 385,
	"./sw": 386,
	"./sw.js": 386,
	"./ta": 387,
	"./ta.js": 387,
	"./te": 388,
	"./te.js": 388,
	"./tet": 389,
	"./tet.js": 389,
	"./tg": 390,
	"./tg.js": 390,
	"./th": 391,
	"./th.js": 391,
	"./tk": 392,
	"./tk.js": 392,
	"./tl-ph": 393,
	"./tl-ph.js": 393,
	"./tlh": 394,
	"./tlh.js": 394,
	"./tr": 395,
	"./tr.js": 395,
	"./tzl": 396,
	"./tzl.js": 396,
	"./tzm": 397,
	"./tzm-latn": 398,
	"./tzm-latn.js": 398,
	"./tzm.js": 397,
	"./ug-cn": 399,
	"./ug-cn.js": 399,
	"./uk": 400,
	"./uk.js": 400,
	"./ur": 401,
	"./ur.js": 401,
	"./uz": 402,
	"./uz-latn": 403,
	"./uz-latn.js": 403,
	"./uz.js": 402,
	"./vi": 404,
	"./vi.js": 404,
	"./x-pseudo": 405,
	"./x-pseudo.js": 405,
	"./yo": 406,
	"./yo.js": 406,
	"./zh-cn": 407,
	"./zh-cn.js": 407,
	"./zh-hk": 408,
	"./zh-hk.js": 408,
	"./zh-mo": 409,
	"./zh-mo.js": 409,
	"./zh-tw": 410,
	"./zh-tw.js": 410
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 526;

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyLocation; });
var MyLocation = /** @class */ (function () {
    function MyLocation() {
    }
    return MyLocation;
}());

//# sourceMappingURL=my-location.models.js.map

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Address; });
var Address = /** @class */ (function () {
    function Address() {
    }
    return Address;
}());

//# sourceMappingURL=address.models.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_category_category__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_wishlist_wishlist__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_my_account_my_account__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_myorder_2_myorder_2__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_addressselect_addressselect__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_modules_ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__models_auth_credential_models__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_onesignal__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_config__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_help_help__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_walkthough_1_walkthough_1__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_managelanguage_managelanguage__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__models_chat_models__ = __webpack_require__(631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_chats_chats__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_contact_us_contact_us__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_firebase__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_in_app_browser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_vt_popup_vt_popup__ = __webpack_require__(458);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



























var MyApp = /** @class */ (function () {
    function MyApp(config, ionicApp, toastCtrl, oneSignal, events, alertCtrl, modalCtrl, service, platform, menu, inAppBrowser, statusBar, splashScreen, translate) {
        var _this = this;
        this.config = config;
        this.ionicApp = ionicApp;
        this.toastCtrl = toastCtrl;
        this.oneSignal = oneSignal;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.service = service;
        this.platform = platform;
        this.menu = menu;
        this.inAppBrowser = inAppBrowser;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.translate = translate;
        this.subscriptions = [];
        this.rtlSide = "left";
        var superAuth = "";
        if (config.apiBase && config.apiBase.startsWith('https') && config.consumerKey && config.consumerKey.length && config.consumerSecret && config.consumerSecret.length) {
            superAuth = ("Basic " + btoa(config.consumerKey + ":" + config.consumerSecret));
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].ADMIN_API_KEY, superAuth);
            this.onSuperAuthSetup(superAuth);
        }
        else if (config.apiBase && config.apiBase.startsWith('http:') && config.adminUsername && config.adminUsername.length && config.adminPassword && config.adminPassword.length) {
            var subscription = service.getAuthToken(new __WEBPACK_IMPORTED_MODULE_14__models_auth_credential_models__["a" /* AuthCredential */](config.adminUsername, config.adminPassword)).subscribe(function (data) {
                var authResponse = data;
                superAuth = ("Bearer " + authResponse.token);
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].ADMIN_API_KEY, superAuth);
                _this.onSuperAuthSetup(superAuth);
            }, function (err) {
                console.log('auth setup error');
            });
            this.subscriptions.push(subscription);
        }
        else {
            console.log('auth setup error');
        }
        this.setupEvents();
        this.initializeApp();
        if (this.config.demoMode) {
            setTimeout(function () {
                var modal = modalCtrl.create(__WEBPACK_IMPORTED_MODULE_26__pages_vt_popup_vt_popup__["a" /* Vt_popupPage */]);
                modal.onDidDismiss(function (data) { });
                modal.present();
            }, 15000);
        }
    }
    MyApp.prototype.onSuperAuthSetup = function (superAuth) {
        console.log('auth setup success:', superAuth);
        this.loadCurrency();
        this.loadParentCategories();
        this.loadPaymentGateways();
        this.loadShipping();
        this.loadSettings();
    };
    MyApp.prototype.loadSettings = function () {
        var subscription = this.service.getSettings(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].SETTINGS, JSON.stringify(data));
            console.log('settings setup success');
        }, function (err) {
            console.log('settings setup error');
        });
        this.subscriptions.push(subscription);
    };
    MyApp.prototype.setupEvents = function () {
        var _this = this;
        this.events.subscribe('language:selection', function (language) {
            _this.globalize(language);
        });
        this.events.subscribe('user:login', function (user) {
            _this.user = user;
            _this.setupAvtar();
            if (_this.platform.is('cordova') && _this.user)
                _this.updatePlayerId();
        });
        this.events.subscribe("goto", function (to) {
            if (to == "chatting") {
                _this.chatting();
            }
        });
    };
    MyApp.prototype.setupAvtar = function () {
        if (this.user && this.user.avatar_url && (this.user.avatar_url.includes("gravatar.com") || this.user.avatar_url.includes("avatar")))
            this.user.avatar_url = null;
        if (this.user && this.user.meta_data) {
            for (var _i = 0, _a = this.user.meta_data; _i < _a.length; _i++) {
                var meta = _a[_i];
                if (meta.key == "avatar_url" && meta.value && meta.value.length) {
                    this.user.avatar_url = meta.value;
                    break;
                }
            }
        }
    };
    MyApp.prototype.updatePlayerId = function () {
        var _this = this;
        this.oneSignal.getIds().then(function (id) {
            if (id && id.userId) {
                __WEBPACK_IMPORTED_MODULE_24_firebase___default.a.database().ref(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].REF_USERS_FCM_IDS).child((_this.user.id + "customer")).set(id.userId);
                _this.subscriptions.push(_this.service.registerForPushNotification(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(_this.user.id), id.userId).subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }));
            }
        });
    };
    MyApp.prototype.loadCurrency = function () {
        var subscription = this.service.currencies(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            var currency = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].CURRENCY, JSON.stringify(currency));
            console.log('currency setup success');
        }, function (err) {
            console.log('currency setup error');
        });
        this.subscriptions.push(subscription);
    };
    MyApp.prototype.loadShipping = function () {
        var _this = this;
        // let selectedShippingMethod: ShippingMethod = JSON.parse(window.localStorage.getItem(Constants.SELECTED_SHIPPING_METHOD));
        // if (selectedShippingMethod) {
        //   console.log('selectedShippingMethod', selectedShippingMethod);
        //   let subscription1: Subscription = this.service.shippingMethod(window.localStorage.getItem(Constants.ADMIN_API_KEY), selectedShippingMethod.method_id).subscribe(data => {
        //     window.localStorage.setItem(Constants.SELECTED_SHIPPING_METHOD, JSON.stringify(data));
        //   }, err => {
        //     console.log('ErrShippingmethod', err);
        //   });
        //   this.subscriptions.push(subscription1);
        // }
        var subscription2 = this.service.shippingZones(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            var shippingZones = data;
            console.log('shippingZones', shippingZones);
            var shippingZoneLocations = new Array();
            var timesReturned = 0;
            for (var _i = 0, shippingZones_1 = shippingZones; _i < shippingZones_1.length; _i++) {
                var sz = shippingZones_1[_i];
                var subscription3 = _this.service.shippingZoneLocations(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), sz.id).subscribe(function (data) {
                    shippingZoneLocations = shippingZoneLocations.concat(data);
                    timesReturned = timesReturned + 1;
                    if (timesReturned == shippingZones.length) {
                        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].SHIPPING_ZONE_LOCATIONS, JSON.stringify(shippingZoneLocations));
                        console.log('shippingZoneLocations', shippingZoneLocations);
                        console.log('shippingZoneLocations setup done');
                    }
                }, function (err) {
                    timesReturned = timesReturned + 1;
                    if (timesReturned == shippingZones.length) {
                        console.log('ErrShippingZoneLocation', err);
                    }
                });
                _this.subscriptions.push(subscription3);
            }
        }, function (err) {
            console.log('ErrShippingZone', err);
        });
        this.subscriptions.push(subscription2);
    };
    MyApp.prototype.loadPaymentGateways = function () {
        var subscription = this.service.paymentGateways(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            var paymentGateway = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].PAYMENT_GATEWAYS, JSON.stringify(paymentGateway));
            console.log('payment-gateway setup success');
        }, function (err) {
            console.log('categories setup error');
        });
        this.subscriptions.push(subscription);
    };
    MyApp.prototype.loadParentCategories = function () {
        var _this = this;
        var subscription = this.service.categoriesParent(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            var categories = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES_PARENT, JSON.stringify(categories));
            console.log('categories setup success');
            _this.walkThroughOrHome();
        }, function (err) {
            console.log('categories setup error');
        });
        this.subscriptions.push(subscription);
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleLightContent();
            _this.splashScreen.show();
            __WEBPACK_IMPORTED_MODULE_24_firebase___default.a.initializeApp({
                apiKey: _this.config.firebaseConfig.apiKey,
                authDomain: _this.config.firebaseConfig.authDomain,
                databaseURL: _this.config.firebaseConfig.databaseURL,
                projectId: _this.config.firebaseConfig.projectId,
                storageBucket: _this.config.firebaseConfig.storageBucket,
                messagingSenderId: _this.config.firebaseConfig.messagingSenderId
            });
            // try {
            //   if (this.device.model) {
            //     this.deviceModel = this.device.model.replace(/\s/g, '').replace(',', '').toLowerCase();
            //     // iphone model nos. https://gist.github.com/adamawolf/3048717
            //     if (this.deviceModel.indexOf("iphone103") != -1 || this.deviceModel.indexOf("iphone106") != -1 || this.deviceModel.indexOf("iphonex") != -1) {
            //       this.deviceModel = "iphonex";
            //     }
            //   }
            // } catch (exception) {
            //   console.log(exception);
            // }
            _this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].USER_KEY));
            _this.setupAvtar();
            if (_this.platform.is('cordova'))
                _this.initOneSignal();
            setTimeout(function () {
                var categories = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES_PARENT));
                if (categories && categories.length)
                    _this.walkThroughOrHome();
                if (_this.platform.is('cordova') && _this.user)
                    _this.updatePlayerId();
                //after basic init
                var component = _this;
                __WEBPACK_IMPORTED_MODULE_24_firebase___default.a.database().ref(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].REF_ADMIN_USER).on("value", function (snap) {
                    component.userAdmin = snap.val();
                });
            }, 3000);
            if (_this.platform.is('cordova')) {
                _this.initOneSignal();
                _this.updatePlayerId();
            }
            var defaultLang = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].KEY_DEFAULT_LANGUAGE);
            _this.globalize(defaultLang);
            _this.platform.registerBackButtonAction(function () {
                if (_this.menu.isOpen()) {
                    _this.menu.close();
                }
                else {
                    var overlayView = _this.ionicApp._overlayPortal._views[0];
                    if (overlayView && overlayView.dismiss) {
                        overlayView.dismiss(); // it will close the modals, alerts
                    }
                    else if (_this.nav.canGoBack()) {
                        _this.nav.pop();
                    }
                    else if (_this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */]) {
                        _this.platform.exitApp();
                    }
                    else {
                        _this.homePage();
                    }
                }
            }, 1);
        });
    };
    MyApp.prototype.globalize = function (languagePriority) {
        this.translate.setDefaultLang("en");
        var defaultLangCode = this.config.availableLanguages[0].code;
        this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
        this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].KEY_LOCALE, languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    };
    MyApp.prototype.setDirectionAccordingly = function (lang) {
        switch (lang) {
            case 'ar': {
                this.platform.setDir('ltr', false);
                this.platform.setDir('rtl', true);
                this.rtlSide = "right";
                break;
            }
            default: {
                this.platform.setDir('rtl', false);
                this.platform.setDir('ltr', true);
                this.rtlSide = "left";
                break;
            }
        }
        // this.translate.use('ar');
        // this.platform.setDir('ltr', false);
        // this.platform.setDir('rtl', true);
    };
    MyApp.prototype.getSuitableLanguage = function (language) {
        language = language.substring(0, 2).toLowerCase();
        console.log('check for: ' + language);
        return this.config.availableLanguages.some(function (x) { return x.code == language; }) ? language : 'en';
    };
    MyApp.prototype.initOneSignal = function () {
        var _this = this;
        if (this.config.oneSignalAppId && this.config.oneSignalAppId.length && this.config.oneSignalGPSenderId && this.config.oneSignalGPSenderId.length) {
            this.oneSignal.startInit(this.config.oneSignalAppId, this.config.oneSignalGPSenderId);
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
            this.oneSignal.handleNotificationReceived().subscribe(function (data) {
                // do something when notification is received
                console.log("handleNotificationReceived", data);
            });
            this.oneSignal.handleNotificationOpened().subscribe(function (data) {
                console.log("handleNotificationOpened", data);
                if (data.notification && data.notification.payload && data.notification.payload.additionalData && data.notification.payload.additionalData.msgs) {
                    _this.chatting();
                }
                else {
                    _this.myOrders();
                }
            });
            this.oneSignal.endInit();
        }
    };
    MyApp.prototype.actionNavHeader = function (tab) {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_my_account_my_account__["a" /* My_accountPage */], { tab: tab });
    };
    MyApp.prototype.phonenumberPage = function () {
        if (this.user) {
            this.logoutAlert();
        }
        else {
            if (!(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */]))
                this.nav.push(__WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */]);
        }
    };
    MyApp.prototype.logoutAlert = function () {
        var _this = this;
        this.translate.get(['logout', 'logout_message', 'no', 'yes']).subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['logout'],
                message: text['logout_message'],
                buttons: [{
                        text: text['no'],
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }, {
                        text: text['yes'],
                        handler: function () {
                            _this.user = null;
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].USER_KEY);
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].USER_API_KEY);
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS);
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST);
                            _this.homePage();
                        }
                    }]
            });
            alert.present();
        });
    };
    MyApp.prototype.walkThroughOrHome = function () {
        if (window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].WALKTHROUGH_SHOWN)) {
            this.homePage();
        }
        else {
            this.walkthroughPage();
        }
        this.splashScreen.hide();
    };
    MyApp.prototype.walkthroughPage = function () {
        if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_19__pages_walkthough_1_walkthough_1__["a" /* Walkthough_1Page */]))
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_19__pages_walkthough_1_walkthough_1__["a" /* Walkthough_1Page */]);
    };
    MyApp.prototype.loginPage = function () {
        if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */]))
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */]);
    };
    MyApp.prototype.manageLanguage = function () {
        if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_20__pages_managelanguage_managelanguage__["a" /* ManagelanguagePage */]))
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_20__pages_managelanguage_managelanguage__["a" /* ManagelanguagePage */]);
    };
    MyApp.prototype.myOrders = function () {
        if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_7__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */]))
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */]);
    };
    MyApp.prototype.addressPage = function () {
        if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_9__pages_addressselect_addressselect__["a" /* AddressSelectPage */]))
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_addressselect_addressselect__["a" /* AddressSelectPage */]);
    };
    MyApp.prototype.my_accountPage = function () {
        if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_6__pages_my_account_my_account__["a" /* My_accountPage */]))
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_my_account_my_account__["a" /* My_accountPage */]);
    };
    MyApp.prototype.categoryPage = function () {
        if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_4__pages_category_category__["a" /* CategoryPage */]))
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_category_category__["a" /* CategoryPage */]);
    };
    MyApp.prototype.homePage = function () {
        if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */]))
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.wishlistPage = function () {
        if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_5__pages_wishlist_wishlist__["a" /* WishlistPage */]))
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_wishlist_wishlist__["a" /* WishlistPage */]);
    };
    MyApp.prototype.cartPage = function () {
        if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* CartPage */]))
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* CartPage */]);
    };
    MyApp.prototype.helpPage = function (fieldname) {
        var settings = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_15__models_constants_models__["a" /* Constants */].SETTINGS));
        if (settings) {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_18__pages_help_help__["a" /* HelpPage */], { settings: settings, fieldname: fieldname });
        }
        else {
            this.loadSettings();
        }
    };
    MyApp.prototype.chatUs = function () {
        if (!this.nav.getActive() || !(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_23__pages_contact_us_contact_us__["a" /* Contact_usPage */]))
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_23__pages_contact_us_contact_us__["a" /* Contact_usPage */]);
    };
    MyApp.prototype.chatting = function () {
        var _this = this;
        if (!this.user) {
            this.loginIfNot();
            this.translate.get("auth_required").subscribe(function (value) { return _this.showToast(value); });
        }
        else if (!this.userAdmin) {
            this.translate.get("auth_required_admin").subscribe(function (value) { return _this.showToast(value); });
        }
        else {
            var chat = new __WEBPACK_IMPORTED_MODULE_21__models_chat_models__["a" /* Chat */]();
            chat.chatId = this.userAdmin.id + "admin";
            chat.chatImage = (this.userAdmin.avatar_url && this.userAdmin.avatar_url.length) ? this.userAdmin.avatar_url : "assets/imgs/empty_dp.png";
            chat.chatName = this.config.appName;
            chat.chatStatus = this.config.appName;
            chat.myId = this.user.id + "customer";
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_22__pages_chats_chats__["a" /* ChatsPage */], { chat: chat });
        }
    };
    MyApp.prototype.loginIfNot = function () {
        if (!this.user) {
            if (!(this.nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */]))
                this.nav.push(__WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */]);
        }
    };
    MyApp.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    MyApp.prototype.developedBy = function () {
        var options = {
            zoom: 'no'
        };
        var browser = this.inAppBrowser.create('https://verbosetechlabs.com/', '_system', options);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/app/app.html"*/'<ion-menu *ngIf="rtlSide == \'left\'" side="left" [content]="content">\n	<ion-header>\n		<ion-toolbar>\n			<ion-list>\n				<ion-item menuClose (click)="loginIfNot()">\n					<ion-avatar item-start>\n						<img *ngIf="user && user.avatar_url && user.avatar_url.length" [src]="user.avatar_url">\n						<img *ngIf="!(user && user.avatar_url && user.avatar_url.length)" src="assets/imgs/logo.png">\n					</ion-avatar>\n					<h2 *ngIf="user">{{\'hey\' | translate}} {{user.first_name}}\n						<!-- <ion-icon name="ios-arrow-forward"></ion-icon> -->\n					</h2>\n					<h2 *ngIf="!user">{{\'hey\' | translate}} {{\'guest\' | translate}}\n						<!-- <ion-icon name="ios-arrow-forward"></ion-icon> -->\n					</h2>\n				</ion-item>\n			</ion-list>\n		</ion-toolbar>\n		<div *ngIf="user" class="menu-tabs" text-center>\n			<ion-row>\n				<ion-col menuClose (click)="actionNavHeader(1)">\n					<img src="assets/imgs/ic_my profile.png">\n					<p>{{\'profile\' | translate}}</p>\n				</ion-col>\n				<ion-col menuClose (click)="actionNavHeader(2)">\n					<img src="assets/imgs/ic_my_addresses-2.png">\n					<p>{{\'my_address\' | translate}}</p>\n				</ion-col>\n			</ion-row>\n		</div>\n	</ion-header>\n\n	<ion-content>\n		<div class="menu-title">\n			<ion-list>\n				<button ion-item menuClose (click)="homePage()">\n					<img src="assets/imgs/ic_home.png">\n					{{\'home\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="categoryPage()">\n					<img src="assets/imgs/ic_categories.png">\n					{{\'categories\' | translate}}\n				</button>\n				<button *ngIf="user" ion-item menuClose (click)="myOrders()">\n					<img src="assets/imgs/ic_my_orders-2.png">\n					{{\'my_orders\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="wishlistPage()">\n					<img src="assets/imgs/fav.png">\n					{{\'my_wishes\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="helpPage(\'faq\')">\n					<img src="assets/imgs/ic_help.png">\n					{{\'faq\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="helpPage(\'terms\')">\n					<img src="assets/imgs/ic_about.png">\n					{{\'about\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="chatUs()">\n					<img src="assets/imgs/ic_message.png ">\n					{{\'contact_us\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="manageLanguage()">\n					<img src="assets/imgs/ic_menu_color.png">\n					{{\'change_language\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="phonenumberPage()">\n					<img src="assets/imgs/ic_logout.png">\n					<span *ngIf="user">{{\'logout\' |translate}}</span>\n					<span *ngIf="!user">{{\'login\' |translate}}</span>\n				</button>\n			</ion-list>\n		</div>\n	</ion-content>\n	<ion-footer *ngIf="config.demoMode">\n		<ion-item menuClose (click)="developedBy()" no-lines>\n			<div class="div-logo">\n				<h4 class="text-white-dev">{{\'developed_by\' | translate}}</h4>\n				<img class="img-logo" src="assets/imgs/VT_black_logo.png" alt="">\n			</div>\n		</ion-item>\n	  </ion-footer>\n</ion-menu>\n\n<ion-menu *ngIf="rtlSide == \'right\'" side="right" [content]="content">\n	<ion-header>\n		<ion-toolbar>\n			<ion-list>\n				<ion-item menuClose (click)="loginIfNot()">\n					<ion-avatar item-start>\n						<img *ngIf="user && user.avatar_url && user.avatar_url.length" [src]="user.avatar_url">\n						<img *ngIf="!(user && user.avatar_url && user.avatar_url.length)" src="assets/imgs/logo.png">\n					</ion-avatar>\n					<h2 *ngIf="user">{{\'hey\' | translate}} {{user.first_name}}\n						<!-- <ion-icon name="ios-arrow-forward"></ion-icon> -->\n					</h2>\n					<h2 *ngIf="!user">{{\'hey\' | translate}} {{\'guest\' | translate}}\n						<!-- <ion-icon name="ios-arrow-forward"></ion-icon> -->\n					</h2>\n				</ion-item>\n			</ion-list>\n		</ion-toolbar>\n		<div *ngIf="user" class="menu-tabs" text-center>\n			<ion-row>\n				<ion-col menuClose (click)="actionNavHeader(1)">\n					<img src="assets/imgs/ic_my profile.png">\n					<p>{{\'profile\' | translate}}</p>\n				</ion-col>\n				<ion-col menuClose (click)="actionNavHeader(2)">\n					<img src="assets/imgs/ic_my_addresses-2.png">\n					<p>{{\'my_address\' | translate}}</p>\n				</ion-col>\n			</ion-row>\n		</div>\n	</ion-header>\n\n	<ion-content>\n		<div class="menu-title">\n			<ion-list>\n				<button ion-item menuClose (click)="homePage()">\n					<img src="assets/imgs/ic_home.png">\n					{{\'home\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="categoryPage()">\n					<img src="assets/imgs/ic_categories.png">\n					{{\'categories\' | translate}}\n				</button>\n				<button *ngIf="user" ion-item menuClose (click)="myOrders()">\n					<img src="assets/imgs/ic_my_orders-2.png">\n					{{\'my_orders\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="wishlistPage()">\n					<img src="assets/imgs/fav.png">\n					{{\'my_wishes\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="helpPage(\'faq\')">\n					<img src="assets/imgs/ic_help.png">\n					{{\'faq\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="helpPage(\'terms\')">\n					<img src="assets/imgs/ic_about.png">\n					{{\'about\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="chatUs()">\n					<img src="assets/imgs/ic_message.png ">\n					{{\'contact_us\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="manageLanguage()">\n					<img src="assets/imgs/ic_menu_color.png">\n					{{\'change_language\' | translate}}\n				</button>\n				<button ion-item menuClose (click)="phonenumberPage()">\n					<img src="assets/imgs/ic_logout.png">\n					<span *ngIf="user">{{\'logout\' |translate}}</span>\n					<span *ngIf="!user">{{\'login\' |translate}}</span>\n				</button>\n			</ion-list>\n		</div>\n	</ion-content>\n	<ion-footer *ngIf="config.demoMode">\n		<ion-item menuClose (click)="developedBy()" no-lines>\n			<div class="div-logo">\n				<h4 class="text-white-dev">{{\'developed_by\' | translate}}</h4>\n				<img class="img-logo" src="assets/imgs/VT_black_logo.png" alt="">\n			</div>\n		</ion-item>\n	  </ion-footer>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" [class]="deviceModel" #content swipeBackEnabled="false" type="overlay"></ion-nav>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/app/app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_13__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_17__app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicApp */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_13__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_25__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_12__node_modules_ngx_translate_core__["c" /* TranslateService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__phone_phone__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__password_password__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__createaccount_createaccount__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_auth_credential_models__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_register_request_models__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_app_config__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};












var LoginPage = /** @class */ (function () {
    function LoginPage(config, translate, events, toastCtrl, navCtrl, service, loadingCtrl, alertCtrl, platform) {
        this.config = config;
        this.translate = translate;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.loadingShown = false;
        this.authError = "";
        this.registerRequest = new __WEBPACK_IMPORTED_MODULE_9__models_register_request_models__["a" /* RegisterRequest */]('', '', '', '', '', '');
        this.subscriptions = [];
        this.credentials = new __WEBPACK_IMPORTED_MODULE_7__models_auth_credential_models__["a" /* AuthCredential */]('', '');
        if (this.userLoggedIn()) {
            navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
        }
        else {
            this.getCountries();
        }
    }
    LoginPage.prototype.getCountries = function () {
        var _this = this;
        this.service.getCountries().subscribe(function (data) {
            _this.countries = data;
        }, function (err) {
            console.log(err);
        });
    };
    LoginPage.prototype.userLoggedIn = function () {
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].USER_KEY));
        return user != null;
    };
    LoginPage.prototype.signIn = function () {
        var _this = this;
        this.authError = "";
        if (!this.countryCode || !this.countryCode.length) {
            this.translate.get('login_countrycode_empty').subscribe(function (value) {
                _this.showToast(value);
            });
            // this.showToast('Username or Password cannot be empty!');
        }
        else if (this.credentials.username.length == 0 || this.credentials.password.length == 0) {
            this.translate.get('login_box_empty').subscribe(function (value) {
                _this.showToast(value);
            });
            // this.showToast('Username or Password cannot be empty!');
        }
        else {
            this.translate.get('loging').subscribe(function (value) {
                _this.showToast(value);
            });
            var credentials = { username: this.countryCode + this.credentials.username, password: this.credentials.password };
            var subscription = this.service.getAuthToken(credentials).subscribe(function (data) {
                var authResponse = data;
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].USER_API_KEY, authResponse.token);
                _this.getUser(_this.getUserIdFromToken(authResponse.token));
            }, function (err) {
                // this.authError = err.error.message.replace('username', 'mobile no.');
                // let pos = this.authError.indexOf('<a');
                // if (pos != -1) {
                //   this.authError = this.authError.substr(0, pos) + '<a target="_blank" ' + this.authError.substr(pos + 2, this.authError.length - 1);
                // }
                _this.dismissLoading();
                _this.translate.get('login_error').subscribe(function (value) {
                    _this.presentErrorAlert(value);
                });
            });
            this.subscriptions.push(subscription);
        }
    };
    LoginPage.prototype.checkUser = function (fireUser) {
        var component = this;
        fireUser.getIdToken(false).then(function (idToken) {
            component.dismissLoading();
            component.translate.get('check_user').subscribe(function (value) {
                component.presentLoading(value);
            });
            // component.presentLoading("Checking the user");
            console.log("Checking the user");
            component.service.checkToken(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), idToken).subscribe(function (data) {
                console.log("checkToken", JSON.stringify(data));
                // user exists
                var authResponse = data;
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].USER_API_KEY, authResponse.token);
                component.dismissLoading();
                component.getUser(component.getUserIdFromToken(authResponse.token));
            }, function (err) {
                console.log("checkToken", JSON.stringify(err));
                component.dismissLoading();
                component.verifyPhone();
            });
        }).catch(function (error) {
            component.dismissLoading();
            console.log("error");
        });
    };
    LoginPage.prototype.verifyPhone = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__phone_phone__["a" /* PhonePage */], { registerRequest: this.registerRequest });
    };
    LoginPage.prototype.getUser = function (userId) {
        var _this = this;
        this.translate.get('fetch_user').subscribe(function (value) {
            _this.presentLoading(value);
            if (_this.socialDP && _this.socialDP.length) {
                _this.service.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(userId), { meta_data: [{ key: "avatar_url", value: _this.socialDP }] }).subscribe(function (data) {
                    console.log("dpUpdated", data);
                    _this.dismissLoading();
                    _this.done(data);
                }, function (err) {
                    console.log("dpUpdate", err);
                    _this.dismissLoading();
                    _this.translate.get('login_error').subscribe(function (value) {
                        _this.showToast(value);
                    });
                });
            }
            else {
                _this.subscriptions.push(_this.service.getUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), userId).subscribe(function (data) {
                    _this.dismissLoading();
                    _this.done(data);
                }, function (err) {
                    console.log("getUser", err);
                    _this.dismissLoading();
                    _this.translate.get('login_error').subscribe(function (value) {
                        _this.showToast(value);
                    });
                }));
            }
        });
    };
    LoginPage.prototype.done = function (userResponse) {
        //if (this.socialDP && this.socialDP.length) userResponse.meta_data = [{ key: "avatar_url", value: this.socialDP }];
        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(userResponse));
        if (userResponse.billing && userResponse.billing.address_1 && userResponse.billing.address_1.length && userResponse.billing.address_2 && userResponse.billing.address_2.length) {
            userResponse.billing.id = -100;
            var addresses = new Array();
            addresses.push(userResponse.billing);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS, JSON.stringify(userResponse.billing));
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST, JSON.stringify(addresses));
        }
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
        this.events.publish('user:login', userResponse);
    };
    LoginPage.prototype.getUserIdFromToken = function (token) {
        var decodedString = window.atob(token.split(".")[1]);
        return JSON.parse(decodedString).data.user.id;
    };
    LoginPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    LoginPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    LoginPage.prototype.presentErrorAlert = function (msg) {
        var _this = this;
        this.translate.get(['error', 'dismiss']).subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['error'],
                subTitle: msg,
                buttons: [text['dismiss']]
            });
            alert.present();
        });
    };
    LoginPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    LoginPage.prototype.signupPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__createaccount_createaccount__["a" /* CreateaccountPage */]);
    };
    LoginPage.prototype.homePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.passwordPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__password_password__["a" /* PasswordPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/login/login.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>\n			<p>{{config.appName}}</p>\n			<span class="end" (click)="homePage()">{{"skip" | translate}}</span>\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div class="form bg-white" padding-left padding-right>\n		<p text-center padding-bottom margin-bottom>{{"Sign in to" | translate}} {{config.appName}}</p>\n		<ion-list>\n			<ion-item>\n				<ion-label>{{\'address_country\' | translate}}</ion-label>\n				<ion-select [(ngModel)]="countryCode" placeholder="{{\'select\' | translate}}" multiple="false">\n					<ion-option [value]="country.callingCodes[0]" *ngFor="let country of countries">{{country.name}}\n					</ion-option>\n				</ion-select>\n			</ion-item>\n			<ion-item>\n				<ion-label>{{"phone" | translate}}</ion-label>\n				<ion-input type="tel" text-end placeholder="{{\'phone2\' | translate}}" [(ngModel)]="credentials.username">\n				</ion-input>\n				<p text-center>{{"nocode" | translate}}</p>\n			</ion-item>\n			<ion-item>\n				<ion-label>{{"password" | translate}}</ion-label>\n				<ion-input type="password" text-end placeholder="{{\'password\' | translate}}"\n					[(ngModel)]="credentials.password">\n				</ion-input>\n			</ion-item>\n		</ion-list>\n		<button ion-button full class="bg-thime btn-round btn-text" (click)="signIn()">\n			{{"continue" | translate}}\n		</button>\n		<!-- <br> -->\n		<!-- <p text-center [innerHTML]="authError" style="margin-bottom:35px"></p> -->\n		<p text-center (click)="passwordPage()" style="margin-bottom:35px; color: #ce134c;">\n			{{"forgot_password" | translate}}\n		</p>\n	</div>\n	<div class="btn-fisx-bottom">\n	</div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/login/login.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_10__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_11__node_modules_ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Platform */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 616:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FirebaseClient = /** @class */ (function () {
    function FirebaseClient() {
    }
    FirebaseClient.prototype.uploadBlob = function (blob) {
        return new Promise(function (resolve, reject) {
            var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
            var timestamp = new Date().getTime();
            storageRef.child(timestamp + '_' + new Date().toString()).put(blob).then(function (snapshot) {
                console.log(snapshot);
                __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref(snapshot.metadata.fullPath).getDownloadURL().then(function (url) { return resolve(url); }).catch(function (err) { return reject(err); });
            }, function (err) {
                reject(err);
            });
        });
    };
    FirebaseClient.prototype.uploadFile = function (file) {
        return new Promise(function (resolve, reject) {
            var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
            storageRef.child(file.name + '_' + new Date().toString()).put(file).then(function (snapshot) {
                console.log(snapshot);
                __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref(snapshot.metadata.fullPath).getDownloadURL().then(function (url) { return resolve(url); }).catch(function (err) { return reject(err); });
            }, function (err) {
                reject(err);
            });
        });
    };
    FirebaseClient.prototype.uploadImage = function (imageURI) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
            var imageRef = storageRef.child('image').child('imageName');
            _this.encodeImageUri(imageURI, function (image64) {
                imageRef.putString(image64, 'data_url').then(function (snapshot) {
                    resolve(snapshot.downloadURL);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    FirebaseClient.prototype.encodeImageUri = function (imageUri, callback) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function () {
            var aux = this;
            c.width = aux.width;
            c.height = aux.height;
            ctx.drawImage(img, 0, 0);
            var dataURL = c.toDataURL("image/jpeg");
            callback(dataURL);
        };
        img.src = imageUri;
    };
    FirebaseClient = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], FirebaseClient);
    return FirebaseClient;
}());

//# sourceMappingURL=firebase.service.js.map

/***/ }),

/***/ 627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderRequest; });
var OrderRequest = /** @class */ (function () {
    function OrderRequest() {
    }
    return OrderRequest;
}());

//# sourceMappingURL=order-request.models.js.map

/***/ }),

/***/ 630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShippingLine; });
var ShippingLine = /** @class */ (function () {
    function ShippingLine(method_id, method_title, total) {
        this.method_id = method_id;
        this.method_title = method_title;
        this.total = total;
    }
    return ShippingLine;
}());

//# sourceMappingURL=shipping-line.models.js.map

/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_models__ = __webpack_require__(49);

var Chat = /** @class */ (function () {
    function Chat() {
    }
    Chat.fromMessage = function (msg, isMeSender) {
        var chat = new Chat();
        chat.chatId = isMeSender ? msg.recipientId : msg.senderId;
        chat.myId = isMeSender ? msg.senderId : msg.recipientId;
        chat.chatName = isMeSender ? msg.recipientName : msg.senderName;
        chat.chatImage = isMeSender ? msg.recipientImage : msg.senderImage;
        chat.chatStatus = isMeSender ? msg.recipientStatus : msg.senderStatus;
        chat.dateTimeStamp = msg.dateTimeStamp;
        chat.timeDiff = __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].formatMillisDateTime(Number(chat.dateTimeStamp), __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].getLocale());
        chat.lastMessage = msg.body;
        return chat;
    };
    return Chat;
}());

//# sourceMappingURL=chat.models.js.map

/***/ }),

/***/ 632:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_models__ = __webpack_require__(49);

var Message = /** @class */ (function () {
    function Message() {
    }
    Message.prototype.fromRow = function (arg0) {
        this.senderName = arg0.senderName;
        this.senderImage = arg0.senderImage;
        this.senderStatus = arg0.senderStatus;
        this.recipientName = arg0.recipientName;
        this.recipientImage = arg0.recipientImage;
        this.recipientStatus = arg0.recipientStatus;
        this.recipientId = arg0.recipientId;
        this.senderId = arg0.senderId;
        this.chatId = arg0.chatId;
        this.id = arg0.id;
        this.body = arg0.body;
        this.dateTimeStamp = arg0.dateTimeStamp;
        this.timeDiff = __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].formatMillisDateTime(Number(this.dateTimeStamp), __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].getLocale());
        this.delivered = arg0.delivered == 1;
        this.sent = arg0.sent == 1;
    };
    return Message;
}());

//# sourceMappingURL=message.models.js.map

/***/ }),

/***/ 636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuyAppAlertPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BuyAppAlertPage = /** @class */ (function () {
    function BuyAppAlertPage(navCtrl, modalCtrl, viewCtrl, inAppBrowser, http, loadingCtrl, translate) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.inAppBrowser = inAppBrowser;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
    }
    BuyAppAlertPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    BuyAppAlertPage.prototype.onCodecanoyon = function () {
        var options = {
            zoom: 'no'
        };
        this.inAppBrowser.create('https://bit.ly/cc2_Medizone', '_system', options);
    };
    BuyAppAlertPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    BuyAppAlertPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    BuyAppAlertPage.prototype.onwhatsapp = function () {
        var _this = this;
        this.presentLoading(this.translate.instant('opening_WhatsApp'));
        this.http.get('https://dashboard.vtlabs.dev/whatsapp.php?product_name=medizone&source=application').subscribe(function (res) {
            _this.dismissLoading();
            return _this.inAppBrowser.create(res['link'], '_system');
        }, function (err) {
            console.log("Error rating:", JSON.stringify(err));
            _this.dismissLoading();
        });
    };
    BuyAppAlertPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-buyappalert',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/buyappalert/buyappalert.html"*/'<ion-content>\n    <div class="clear_button">\n        <ion-icon name="md-close" (click)="dismiss()"></ion-icon>\n    </div>\n    <div class="container no_backend">\n        <h2>{{\'Buy_this\' | translate}} <br> {{\'Template_Now\' | translate}}</h2>\n        <p>{{\'IONIC_template_only_No_Backend\' | translate}}</p>\n        <div class="button" (click)="onCodecanoyon()">\n            <div class="icon_box">\n                <img src="https://opuslabs.nyc3.digitaloceanspaces.com/AAFixItems/Other/ic_codecanyon.png">\n            </div>\n            <h3>{{\'Get_it_on\' | translate}}<strong>{{\'Codecanoyon\' | translate}}</strong></h3>\n        </div>\n    </div> \n    \n    <div class="container complete_backend">\n        <h2>{{\'Buy_this_App_with\' | translate}}<br>{{\'Complete_Backend\' | translate}}</h2>\n        <p>{{\'Full_App_solution_with_complete_Backend\' | translate}}</p>\n        <div class="button" (click)="onwhatsapp()">\n            <div class="icon_box">\n                <img src="https://opuslabs.nyc3.digitaloceanspaces.com/AAFixItems/Other/ic_whatsapp.png">\n            </div>\n            <h3>{{\'Message_on\' | translate}}<strong>{{\'WhatsApp\' | translate}}</strong></h3>\n        </div>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/buyappalert/buyappalert.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], BuyAppAlertPage);
    return BuyAppAlertPage;
}());

//# sourceMappingURL=buyappalert.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterRequest; });
var RegisterRequest = /** @class */ (function () {
    function RegisterRequest(email, username, password, firstname, lastname, avatar_url) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.roles = 'customer';
        this.first_name = firstname;
        this.last_name = lastname;
        this.avatar_url = avatar_url;
    }
    return RegisterRequest;
}());

//# sourceMappingURL=register-request.models.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__itemdetail_itemdetail__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SearchPage = /** @class */ (function () {
    function SearchPage(events, translate, viewCtrl, toastCtrl, navCtrl, service, global, loadingCtrl) {
        this.events = events;
        this.translate = translate;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
        this.productsAll = new Array();
        this.productsResponse = new Array();
        this.productsAllPage = 1;
        this.queryHistory = new Array();
        this.cartTotal = 0;
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
        }
        this.queryHistory = global.getSearchHistory();
    }
    SearchPage.prototype.ionViewDidEnter = function () {
        this.cartTotal = Number(this.global.getCartItemsCount());
    };
    SearchPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    SearchPage.prototype.addToCart = function (product) {
        var _this = this;
        if (product.in_stock && product.purchasable) {
            var added = this.global.addCartItem(product);
            if (added) {
                this.cartTotal = this.cartTotal + 1;
            }
            this.translate.get(added ? 'item_added' : 'item_updated').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('item_unavailable').subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    SearchPage.prototype.doSearch = function () {
        var _this = this;
        var subscription = this.service.productsByQuery(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.query, String(this.productsAllPage))
            .subscribe(function (data) {
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            var productsAll = new Array();
            for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                var pro = products_1[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                productsAll.push(proSplit);
            }
            _this.productsAll = productsAll;
            // this.dismissLoading();
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    SearchPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.productsAllPage++;
        var subscription = this.service.productsByQuery(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.query, String(this.productsAllPage)).subscribe(function (data) {
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            for (var _i = 0, products_2 = products; _i < products_2.length; _i++) {
                var pro = products_2[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    _this.productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                if (_this.productsAll && _this.productsAll.length && _this.productsAll[_this.productsAll.length - 1].length == 1) {
                    _this.productsAll[_this.productsAll.length - 1].push(pro);
                }
                else {
                    proSplit.push(pro);
                }
            }
            if (proSplit.length > 0) {
                _this.productsAll.push(proSplit);
            }
            infiniteScroll.complete();
        }, function (err) {
            infiniteScroll.complete();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    SearchPage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro: pro, pros: this.productsResponse });
    };
    SearchPage.prototype.clearHistory = function () {
        this.global.clearSearchHistory();
        this.queryHistory = new Array();
    };
    SearchPage.prototype.search = function (q) {
        var _this = this;
        this.query = q;
        this.productsAllPage = 1;
        this.doSearch();
        this.global.addInSearchHistory(q);
        this.translate.get('searching').subscribe(function (value) {
            _this.showToast(value);
        });
    };
    SearchPage.prototype.getItems = function (searchbar) {
        var q = searchbar.srcElement.value;
        if (!q) {
            return;
        }
        this.search(q);
    };
    SearchPage.prototype.toggleFavorite = function (pro) {
        pro.favorite = this.global.toggleFavorite(pro);
    };
    SearchPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SearchPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SearchPage.prototype.cartPage = function () {
        this.navCtrl.pop();
        this.events.publish("open:cart");
    };
    SearchPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    SearchPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/search/search.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>{{ \'home_search_title\' | translate }}\n			<div class="icon-box" (click)="cartPage()">\n				<img src="assets/imgs/ic_my_cart.png">\n				<ion-badge>{{cartTotal}}</ion-badge>\n			</div>\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n	<div class="d-flex searchbar-section">\n		<ion-searchbar (ionInput)="getItems($event)" placeholder="{{\'search_box\' | translate}}" autofocus></ion-searchbar>\n	</div>\n\n	<div class="recent-search">\n		<ion-card *ngIf="queryHistory && queryHistory.length">\n			<ion-card-header>\n				{{"searches_recent" | translate}}\n				<span text-end class="right" (click)="clearHistory()">{{ \'clear_history\' | translate }}</span>\n			</ion-card-header>\n			<ion-card-content>\n				<p *ngFor="let query of queryHistory" (click)="search(query)">\n					<ion-icon name="ios-time-outline"></ion-icon>{{query}}\n				</p>\n			</ion-card-content>\n		</ion-card>\n	</div>\n\n	<div class="trending-search">\n		<p *ngIf="query && query.length" class="small" padding-left padding-right>{{ \'search_for\' | translate}} {{query}}</p>\n\n<!--\n		<div class="empty_placeholder">\n			<img src="assets/imgs/no_results.png">\n			<p>{{"no_favorites_added" | translate}}</p>\n		</div>\n-->\n		\n		<ion-list>\n			<ion-row *ngFor="let products of productsAll">\n				<ion-col col-6 *ngFor="let pro of products">\n					<ion-card>\n						<ion-card-header>\n							<div *ngIf="pro.images && pro.images.length" class="img-box" (click)="itemdetailPage(pro)">\n								<img data-src="{{pro.images[0].src}}">\n							</div>\n							<div *ngIf="pro.images == null || pro.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n								<img src="assets/imgs/suit_PNG8132.png">\n							</div>\n							<ion-icon *ngIf="pro.favorite" name="md-heart" class="text-sky icon" (click)="toggleFavorite(pro)"></ion-icon>\n							<ion-icon *ngIf="!pro.favorite" name="md-heart-outline" class="text-light icon" (click)="toggleFavorite(pro)"></ion-icon>\n							<h5 (click)="itemdetailPage(pro)">{{pro.name}}</h5>\n						</ion-card-header>\n\n						<ion-card-content>\n							<div *ngIf="pro.type ==\'simple\'" class="btn text-white" (click)="addToCart(pro)">{{ \'add_to_cart\' | translate }}</div>\n						</ion-card-content>\n					</ion-card>\n				</ion-col>\n			</ion-row>\n		</ion-list>\n		<ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n			<ion-infinite-scroll-content></ion-infinite-scroll-content>\n		</ion-infinite-scroll>\n	</div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/search/search.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vendor_profile_vendor_profile__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shippining_shippining__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_social_sharing__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shirts_shirts__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__category_category__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__node_modules_ngx_translate_core__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var ItemdetailPage = /** @class */ (function () {
    function ItemdetailPage(translate, socialSharing, navCtrl, toastCtrl, modalCtrl, global, navParams, service, loadingCtrl, alertCtrl) {
        this.translate = translate;
        this.socialSharing = socialSharing;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
        this.details = false;
        this.productsResponse = new Array();
        this.productVariations = new Array();
        this.cartTotal = 0;
        this.product = this.navParams.get('pro');
        if (this.product) {
            this.product.favorite = global.isFavorite(this.product);
            var productsResponse = this.navParams.get('pros');
            if (productsResponse && productsResponse.length) {
                for (var i = productsResponse.length - 1; i >= 0; i--) {
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
        }
        else {
            this.loadProductById(this.navParams.get('pro_id'));
        }
    }
    ItemdetailPage_1 = ItemdetailPage;
    ItemdetailPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    ItemdetailPage.prototype.ionViewDidEnter = function () {
        this.cartTotal = Number(this.global.getCartItemsCount());
    };
    ItemdetailPage.prototype.loadProductById = function (proId) {
        var _this = this;
        this.translate.get('loading_products').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var subscription = this.service.productById(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), proId).subscribe(function (data) {
            _this.product = data;
            _this.product.favorite = _this.global.isFavorite(_this.product);
            if (_this.product.images && _this.product.images.length) {
                _this.imageToDisplay = _this.product.images[0].src;
            }
            if (!_this.currencyText) {
                var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].CURRENCY));
                if (currency) {
                    _this.currencyText = currency.value;
                    var iconText = currency.options[currency.value];
                    _this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
                }
            }
            if (!_this.product.sale_price) {
                _this.product.sale_price = _this.product.regular_price;
            }
            if (_this.currencyIcon) {
                _this.product.regular_price_html = _this.currencyIcon + ' ' + _this.product.regular_price;
                _this.product.sale_price_html = _this.currencyIcon + ' ' + _this.product.sale_price;
            }
            else if (_this.currencyText) {
                _this.product.regular_price_html = _this.currencyText + ' ' + _this.product.regular_price;
                _this.product.sale_price_html = _this.currencyText + ' ' + _this.product.sale_price;
            }
            _this.loadReviews();
            if (_this.product.type == 'variable') {
                _this.loadVariations();
            }
            _this.dismissLoading();
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    ItemdetailPage.prototype.loadVariations = function () {
        var _this = this;
        this.translate.get('loading_versions').subscribe(function (value) {
            _this.presentLoading(value);
        });
        // this.presentLoading('Loading variations');
        var subscription = this.service.productVariations(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.product.id).subscribe(function (data) {
            var variations = data;
            for (var _i = 0, variations_1 = variations; _i < variations_1.length; _i++) {
                var vari = variations_1[_i];
                var variAttris = '';
                for (var i = 0; i < vari.attributes.length; i++) {
                    var attri = vari.attributes[i].name + ' ' + vari.attributes[i].option + (i < vari.attributes.length - 1 ? ', ' : '');
                    variAttris = variAttris + attri;
                }
                vari.name = _this.product.name + ' - ' + variAttris;
                vari.type = 'variable';
                vari.images = new Array();
                vari.images.push(vari.image);
                if (!_this.currencyText) {
                    var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].CURRENCY));
                    if (currency) {
                        _this.currencyText = currency.value;
                        var iconText = currency.options[currency.value];
                        _this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
                    }
                }
                if (!vari.sale_price) {
                    vari.sale_price = vari.regular_price;
                }
                if (_this.currencyIcon) {
                    vari.regular_price_html = _this.currencyIcon + ' ' + vari.regular_price;
                    vari.sale_price_html = _this.currencyIcon + ' ' + vari.sale_price;
                }
                else if (_this.currencyText) {
                    vari.regular_price_html = _this.currencyText + ' ' + vari.regular_price;
                    vari.sale_price_html = _this.currencyText + ' ' + vari.sale_price;
                }
            }
            _this.productVariations = variations;
            _this.dismissLoading();
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    ItemdetailPage.prototype.showImage = function (src) {
        this.imageToDisplay = src;
    };
    // presentImage(myImage) {
    //   const imageViewer = this.imageViewerCtrl.create(myImage);
    //   imageViewer.present();
    // }
    ItemdetailPage.prototype.loadReviews = function () {
        var _this = this;
        var subscription = this.service.productsReviews(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.product.id).subscribe(function (data) {
            var reviews = data;
            var approved = new Array();
            for (var _i = 0, reviews_1 = reviews; _i < reviews_1.length; _i++) {
                var rev = reviews_1[_i];
                if (rev.verified) {
                    approved.push(rev);
                }
            }
            _this.reviews = approved;
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    ItemdetailPage.prototype.viewMoreSimilar = function () {
        var cat = this.product && this.product.categories.length ? this.product.categories[0] : null;
        if (cat && cat.id != '-1') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__shirts_shirts__["a" /* ShirtsPage */], { cat: cat });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__category_category__["a" /* CategoryPage */]);
        }
    };
    ItemdetailPage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(ItemdetailPage_1, { pro: pro, pros: this.productsResponse });
    };
    ItemdetailPage.prototype.viewMore = function () {
        this.details = true;
    };
    ItemdetailPage.prototype.viewLess = function () {
        this.details = false;
    };
    ItemdetailPage.prototype.toggleFavorite = function (pro) {
        pro.favorite = this.global.toggleFavorite(pro);
    };
    ItemdetailPage.prototype.shareProduct = function (pro) {
        var _this = this;
        this.translate.get('share_msg').subscribe(function (value) {
            _this.socialSharing.share(value, pro.name, null, pro.permalink).then(function (data) {
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            });
        });
    };
    ItemdetailPage.prototype.addVariation = function (variation) {
        var _this = this;
        if (variation.in_stock && variation.purchasable) {
            var added = this.global.addCartItem(variation);
            if (added) {
                this.cartTotal = this.cartTotal + 1;
            }
            this.translate.get(added ? 'card_update1' : 'card_update2').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get("item_empty").subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    ItemdetailPage.prototype.buyVariation = function (variation) {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].USER_KEY));
        if (user != null) {
            var added = this.global.addCartItem(variation);
            if (added) {
                this.cartTotal = this.cartTotal + 1;
            }
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__shippining_shippining__["a" /* ShippiningPage */]);
        }
        else {
            this.translate.get("no_sign_in").subscribe(function (value) {
                _this.showToast(value);
            });
            // this.showToast('Sign in to continue');
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
        }
    };
    ItemdetailPage.prototype.addToCart = function () {
        var _this = this;
        if (this.product.in_stock && this.product.purchasable) {
            var added = this.global.addCartItem(this.product);
            if (added) {
                this.cartTotal = this.cartTotal + 1;
            }
            this.translate.get(added ? 'card_update1' : 'card_update2').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get("item_empty").subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    ItemdetailPage.prototype.buyNow = function () {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].USER_KEY));
        if (user != null) {
            var added = this.global.addCartItem(this.product);
            if (added) {
                this.cartTotal = this.cartTotal + 1;
            }
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__shippining_shippining__["a" /* ShippiningPage */]);
        }
        else {
            this.translate.get("no_sign_in").subscribe(function (value) {
                _this.showToast(value);
            });
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
        }
    };
    ItemdetailPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ItemdetailPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    ItemdetailPage.prototype.presentErrorAlert = function (msg) {
        var _this = this;
        this.translate.get(['error', 'dismiss'])
            .subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['error'],
                subTitle: msg,
                buttons: [text['dismiss']]
            });
            alert.present();
        });
    };
    ItemdetailPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ItemdetailPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    ItemdetailPage.prototype.cartPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */]);
        modal.onDidDismiss(function () {
            _this.cartTotal = Number(_this.global.getCartItemsCount());
        });
        modal.present();
    };
    ItemdetailPage.prototype.vendor_profile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__vendor_profile_vendor_profile__["a" /* Vendor_profilePage */]);
    };
    ItemdetailPage = ItemdetailPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-itemdetail ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/itemdetail/itemdetail.html"*/'<ion-header class="bg-thime">\n	<ion-navbar>\n		<ion-title>{{product.categories[0].name}}\n			<div class="icon-box">\n				<ion-icon class="icon" (click)="cartPage()">\n					<img src="assets/imgs/ic_my_cart.png" width="100%;">\n					<ion-badge>{{cartTotal}}</ion-badge>\n				</ion-icon>\n			</div>\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light" padding-bottom>\n	<!--<select size & color>-->\n	<div class="img-section shadow-bottom" text-center *ngIf="product">\n		<img *ngIf="imageToDisplay" data-src="{{imageToDisplay}}" #myImage />\n		<img *ngIf="!imageToDisplay" src="assets/imgs/logo.png">\n\n		<div class="tab-btn-box" *ngIf="product.images && product.images.length">\n			<div class="tab-btn">\n				<img data-src="{{product.images[0].src}}" (click)="showImage(product.images[0].src)">\n			</div>\n			<div *ngIf="product.images.length > 1" class="tab-btn">\n				<img data-src="{{product.images[1].src}}" (click)="showImage(product.images[1].src)">\n			</div>\n			<div *ngIf="product.images.length > 2" class="tab-btn">\n				<img data-src="{{product.images[2].src}}" (click)="showImage(product.images[2].src)">\n			</div>\n			<!-- <div *ngIf="product.images.length > 3" class="tab-btn">\n        <img data-src="{{product.images[3].src}}" (click)="showImage(product.images[3].src)">\n      </div> -->\n		</div>\n\n		<div class="item_details">\n			<h2><b>{{product.name}}</b></h2>\n			<h3 class="d-flex">\n				<span class="icon end">\n					<ion-icon *ngIf="product.favorite" name="md-heart" class="text-sky icon"\n						(click)="toggleFavorite(product)"></ion-icon>\n					<ion-icon *ngIf="!product.favorite" name="md-heart-outline" class="text-light icon"\n						(click)="toggleFavorite(product)"></ion-icon>\n				</span>\n			</h3>\n		</div>\n	</div>\n	<!--<select size & color end>-->\n\n	<!--    <Product Info>-->\n	<div class="info bg-white shadow-bottom" padding>\n		<h6 class="heading"><i>{{\'description\' | translate}}</i></h6>\n		<div *ngIf="!details" [innerHTML]="product.short_description">\n			<span text-right class="text-sky" (click)="viewMore()">{{\'view\' | translate}}</span>\n		</div>\n		<div *ngIf="details" [innerHTML]="product.description">\n			<span text-right class="text-sky" (click)="viewLess()">{{\'view_less\' | translate}}</span>\n		</div>\n		<span *ngIf="!details" text-right class="text-sky" (click)="viewMore()">{{\'view\' | translate}}\n			<ion-icon name="ios-arrow-forward-outline"></ion-icon>\n		</span>\n		<span class="text-sky more_less" *ngIf="details" text-right (click)="viewLess()">{{\'view_less\' | translate}}\n			<ion-icon name="ios-arrow-forward-outline"></ion-icon>\n		</span>\n	</div>\n	<!--  <Product Info end>-->\n\n	<!-- Variations start -->\n	<div *ngIf="productVariations && productVariations.length" class="your-items">\n		<ion-card-header>\n			<p no-margin> {{\'product_versions\' | translate}}</p>\n		</ion-card-header>\n		<ion-card-content *ngFor="let item of productVariations">\n			<ion-row>\n				<ion-col col-3>\n					<div *ngIf="item.images && item.images.length" class="img-box">\n						<img data-src="{{item.images[0].src}}">\n					</div>\n					<div *ngIf="!item.images || !item.images.length" class="img-box">\n						<img src="assets/imgs/suit_PNG8132.png">\n					</div>\n				</ion-col>\n				<ion-col col-9>\n					<h4>{{item.name}}</h4>\n					<div class="rate">\n						<div style="display: flex;" class="price-box">\n							<div *ngIf="item.regular_price != item.sale_price" class="price text-light" padding-right\n								[innerHTML]="item.regular_price_html">\n							</div>\n							<div class="price text-sky" [innerHTML]="item.sale_price_html">\n							</div>\n						</div>\n						<p text-right class="card-bottom text-black">\n							<button ion-button class="small button btn-round bg-green" text-right\n								(click)="buyVariation(item)">{{\'buy\' | translate}}</button>\n						</p>\n					</div>\n					<p class="card-bottom">\n						<button ion-button class="small button btn-round" text-right (click)="addVariation(item)">\n							{{\'add_cart\' | translate}}\n						</button>\n					</p>\n				</ion-col>\n			</ion-row>\n		</ion-card-content>\n	</div>\n	<!-- Variations end -->\n	\n	\n<!--\n	\n	<div class="distributor d-flex" (click)="vendor_profile()">\n		<div class="img_box">\n			<img src="https://cdn.pixabay.com/photo/2016/10/14/19/21/canyon-1740973__340.jpg">\n		</div>\n		<div class="text_box">\n			<h2 class="d-flex">\n				<span class="title">Johnson distributor </span>\n				 <ion-icon name="ios-arrow-forward" class="end"></ion-icon>\n			</h2>\n			<p>	{{\'view_seller_profile\' | translate}}</p>\n		</div>\n	</div>\n	\n-->\n	\n\n	<!--    <check Delivery>-->\n	<!-- <div class="pincod bg-white shadow-bottom" padding>\n      <h6 class="heading">Check Delivery</h6>\n      <ion-row>\n          <ion-col col-8>\n              <ion-list>\n                  <ion-item>\n                      <ion-input type="text" placeholder="Enter your pin"></ion-input>\n                  </ion-item>\n              </ion-list>\n          </ion-col>\n          <ion-col col-4>\n              <button ion-button full class="bg-thime btn-round btn-text">Submit</button>\n          </ion-col>\n      </ion-row>\n      <p>\n          <span>Cash on Delivery</span>\n          <span text-center>Free Sheeping</span>\n          <span text-right>Delivery in 3-6 Days</span>\n      </p>\n  </div> -->\n	<!--    <check Delivery end>-->\n\n	<!--    <reating & review>-->\n	<div class="reating-review bg-white" padding *ngIf="reviews && reviews.length">\n		<!-- <div class="reating">\n      <div class="rated">\n        <ion-badge class="badges bg-green text-white">\n          4.2\n          <ion-icon name="md-star"></ion-icon>\n        </ion-badge>\n        <p class="text-light">\n          <span text-center>\n            Rated by<br>125 poeple\n          </span>\n        </p>\n      </div>\n      <div class="reating-box">\n        <div class="rating">\n          <div class="text-1">5\n            <ion-icon name="md-star"></ion-icon>\n          </div>\n          <div class="progres-bar rate-5"><span style="width: 90%"></span></div>\n          <div class="text-2">88\n            <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n          </div>\n        </div>\n        <div class="rating">\n          <div class="text-1">4\n            <ion-icon name="md-star"></ion-icon>\n          </div>\n          <div class="progres-bar rate-4"><span style="width: 70%"></span></div>\n          <div class="text-2">88\n            <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n          </div>\n        </div>\n        <div class="rating">\n          <div class="text-1">3\n            <ion-icon name="md-star"></ion-icon>\n          </div>\n          <div class="progres-bar rate-3"><span style="width: 50%"></span></div>\n          <div class="text-2">88\n            <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n          </div>\n        </div>\n        <div class="rating">\n          <div class="text-1">2\n            <ion-icon name="md-star"></ion-icon>\n          </div>\n          <div class="progres-bar rate-2"><span style="width: 35%"></span></div>\n          <div class="text-2">88\n            <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n          </div>\n        </div>\n        <div class="rating">\n          <div class="text-1">1\n            <ion-icon name="md-star"></ion-icon>\n          </div>\n          <div class="progres-bar rate-1"><span style="width: 20%"></span></div>\n          <div class="text-2">88\n            <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n          </div>\n        </div>\n      </div>\n    </div> -->\n		<div class="btn review text-sky" (click)="reviewPage()">{{"write_own_review" | translate}}</div>\n		<div class="lick">\n			<div *ngFor="let review of reviews">\n				<p padding-top>\n					<span class="left-side">\n						<ion-badge class="badges bg-green text-white">{{review.rating}}\n							<ion-icon name="md-star"></ion-icon>\n						</ion-badge>\n						<span class="bold">{{review.name}}</span>\n					</span>\n					<span class="right-side">\n						<span class="text-light">{{review.date_created}}</span>\n					</span>\n				</p>\n				<h5> {{review.review}} </h5>\n				<!-- <p class="border-bottom  name-like" padding-bottom>\n          <span class="left-side">\n             Davis Williamson.\n          </span>\n          <span class="right-side icon-box">                    \n            <ion-icon name="md-thumbs-up" text-right class="icon-lick"></ion-icon><small>2</small>\n            <ion-icon name="md-thumbs-down" text-right class="icon-lick"></ion-icon><small>2</small>             \n          </span>\n        </p> -->\n			</div>\n			<h4 class="text-sky" text-end>\n				{{"read_reviews" | translate}}\n				<ion-icon name="ios-arrow-forward-outline"></ion-icon>\n			</h4>\n		</div>\n	</div>\n	<!--    <reating & review end>-->\n\n	<!-- <div style="height: 65px;" *ngIf="product && product.type==\'simple\'"></div>\n  <div class="receipt btn-fisx-bottom" *ngIf="product && product.type==\'simple\'">\n    <ion-row>\n      <ion-col>\n        <button ion-button full class="btn-round green-shadow btn-text text-sky" style="background: #fff;" (click)="addToCart()">{{\'add_cart\' | translate}}</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button full class="bg-thime btn-round green-shadow btn-text" (click)="buyNow()">{{\'buy\' | translate}}</button>\n      </ion-col>\n    </ion-row>\n  </div> -->\n\n	<!--    <reating & review end>-->\n	<div style="display: block;margin-bottom:35px" padding-bottom margin-bottom></div>\n</ion-content>\n<ion-footer *ngIf="product && product.type==\'simple\'" no-border>\n	<ion-row>\n		<ion-col>\n			<button ion-button full class="btn-round green-shadow btn-text text-sky" style="background: #fff;"\n				(click)="addToCart()">\n				{{\'add_cart\' | translate}}</button>\n		</ion-col>\n		<ion-col>\n			<button ion-button full class="bg-thime btn-round green-shadow btn-text" (click)="buyNow()">\n				{{\'buy\' | translate}}\n			</button>\n		</ion-col>\n	</ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/itemdetail/itemdetail.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_13__node_modules_ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ItemdetailPage);
    return ItemdetailPage;
    var ItemdetailPage_1;
}());

//# sourceMappingURL=itemdetail.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shirts_shirts__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__cart_cart__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CategoryPage = /** @class */ (function () {
    function CategoryPage(translate, navCtrl, toastCtrl, service, modalCtrl) {
        var _this = this;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.categoriesAllNew = new Array();
        this.subscriptions = [];
        this.pageCategory = 1;
        var categoriesAll = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES));
        this.firstTime = categoriesAll == null;
        this.setupCategories(categoriesAll);
        this.translate.get('refreshing').subscribe(function (value) {
            _this.showToast(value);
        });
        this.refreshCategories();
    }
    CategoryPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    CategoryPage.prototype.refreshCategories = function () {
        var _this = this;
        var subscription = this.service.categories(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.pageCategory)).subscribe(function (data) {
            var categories = data;
            if (categories.length == 0) {
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES, JSON.stringify(_this.categoriesAllNew));
                console.log('categories setup success');
                _this.setupCategories(_this.categoriesAllNew);
            }
            else {
                _this.categoriesAllNew = _this.categoriesAllNew.concat(categories);
                if (_this.firstTime) {
                    _this.setupCategories(_this.categoriesAllNew);
                }
                _this.pageCategory++;
                _this.refreshCategories();
            }
        }, function (err) {
            console.log('categories setup error');
        });
        this.subscriptions.push(subscription);
    };
    CategoryPage.prototype.setupCategories = function (savedCats) {
        if (savedCats && savedCats.length) {
            this.categoriesAll = new Array();
            var parentWithChild = void 0;
            for (var _i = 0, savedCats_1 = savedCats; _i < savedCats_1.length; _i++) {
                var catP = savedCats_1[_i];
                if (Number(catP.parent) == 0) {
                    parentWithChild = new Array();
                    for (var _a = 0, savedCats_2 = savedCats; _a < savedCats_2.length; _a++) {
                        var catC = savedCats_2[_a];
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
    };
    CategoryPage.prototype.showCats = function (cats) {
        this.catsToShow = cats;
    };
    CategoryPage.prototype.shirtsPage = function (cat) {
        if (cat.id != '-1') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__shirts_shirts__["a" /* ShirtsPage */], { cat: cat });
        }
    };
    CategoryPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    CategoryPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    CategoryPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-category ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/category/category.html"*/'<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<img src="assets/imgs/ic_menu.png">\n		</button>\n		<ion-title>{{ \'home_cat_title\' | translate }}</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content class="bg-light">\n	<div class="all-products">\n		<div class="tabs-contant">\n			<ion-segment *ngFor="let cats of categoriesAll">\n				<ion-segment-button [ngClass]="(cats.length && catsToShow.length && cats[0].id == catsToShow[0].id) ? \'segment-button active\' : \'segment-button\'" (click)="showCats(cats)">\n					<img *ngIf="cats[0].image != null" data-src="{{cats[0].image.src}}">\n					<img *ngIf="cats[0].image == null" src="assets/imgs/logo.png">\n					<br>\n					<p [innerHTML]="cats[0].name"></p>\n					<!-- <span>{{categoriesAll | json}}</span> -->\n				</ion-segment-button>\n			</ion-segment>\n		</div>\n		<div class="all-items">\n			<ion-list>\n				<ion-item *ngFor="let cat of catsToShow">\n					<p class="" (click)="shirtsPage(cat)">\n						<span [innerHTML]="cat.name"></span>\n						<ion-icon name="ios-arrow-forward-outline" text-end class="icon"></ion-icon>\n					</p>\n				</ion-item>\n			</ion-list>\n		</div>\n	</div>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/category/category.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.ADMIN_API_KEY = 'medizone_adminkey';
    Constants.USER_API_KEY = 'medizone_userkey';
    Constants.USER_KEY = 'medizone_user';
    Constants.PRODUCT_CATEGORIES = 'medizone_prod_cats';
    Constants.PRODUCT_CATEGORIES_PARENT = 'medizone_prod_cats_p';
    Constants.PAYMENT_GATEWAYS = 'medizone_pgs';
    Constants.SHIPPING_LINES = 'medizone_spng_lns';
    Constants.SELECTED_ADDRESS = 'medizone_selected_add';
    Constants.SELECTED_COUPON = 'medizone_coupon';
    Constants.SELECTED_ADDRESS_LIST = 'medizone_add_list';
    Constants.WALKTHROUGH_SHOWN = 'medizone_walkthrouogh';
    Constants.CURRENCY = 'medizone_currency';
    Constants.KEY_LOCALE = 'medizone_locale';
    Constants.KEY_DEFAULT_LANGUAGE = 'medizone_deflang';
    Constants.KEY_LOCATION = 'location_last';
    Constants.SETTINGS = 'medizone_settings';
    Constants.CART_ITEMS = 'medizone_ci';
    Constants.FAVORITES = 'medizone_fav';
    Constants.SEARCH_HISTORY = 'medizone_search_hist';
    Constants.SHIPPING_ZONE_LOCATIONS = 'medizone_shippingzonelocations';
    Constants.SELECTED_SHIPPING_METHOD = 'medizone_shippingselected';
    Constants.REF_USERS = "wamw/users";
    Constants.REF_CHAT = "wamw/chats";
    Constants.REF_INBOX = "wamw/inbox";
    Constants.REF_USERS_FCM_IDS = "wamw/user_fcm_ids";
    Constants.REF_ADMIN_USER = "wamw/adminuser";
    return Constants;
}());

//# sourceMappingURL=constants.models.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShirtsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_wordpress_client_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_global__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_category_models__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_constants_models__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ShirtsPage = /** @class */ (function () {
    function ShirtsPage(translate, modalCtrl, global, navParams, toastCtrl, navCtrl, service, loadingCtrl, alertCtrl) {
        var _this = this;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
        this.productsAll = new Array();
        this.productsResponse = new Array();
        this.productsAllPage = 1;
        this.cartTotal = 0;
        this.category = navParams.get('cat');
        if (!this.category) {
            this.category = new __WEBPACK_IMPORTED_MODULE_7__models_category_models__["a" /* Category */]();
            this.category.id = navParams.get('catId');
            this.category.name = 'Category ' + this.category.id;
        }
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_9__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
        }
        this.loadProducts();
        this.translate.get('loading_products').subscribe(function (value) {
            _this.presentLoading(value);
        });
    }
    ShirtsPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    ShirtsPage.prototype.ionViewDidEnter = function () {
        this.cartTotal = Number(this.global.getCartItemsCount());
    };
    ShirtsPage.prototype.loadProducts = function () {
        var _this = this;
        var subscription = this.service.productsByCategory(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_9__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.category.id, String(this.productsAllPage)).subscribe(function (data) {
            _this.dismissLoading();
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                var pro = products_1[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    _this.productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                _this.productsAll.push(proSplit);
            }
            _this.productsAll = _this.productsAll;
        }, function (err) {
            _this.dismissLoading();
        });
        this.subscriptions.push(subscription);
    };
    ShirtsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.productsAllPage++;
        var subscription = this.service.productsByCategory(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_9__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.category.id, String(this.productsAllPage)).subscribe(function (data) {
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            for (var _i = 0, products_2 = products; _i < products_2.length; _i++) {
                var pro = products_2[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    _this.productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                if (_this.productsAll && _this.productsAll.length && _this.productsAll[_this.productsAll.length - 1].length == 1) {
                    _this.productsAll[_this.productsAll.length - 1].push(pro);
                }
                else {
                    proSplit.push(pro);
                }
            }
            if (proSplit.length > 0) {
                _this.productsAll.push(proSplit);
            }
            infiniteScroll.complete();
        }, function (err) {
            infiniteScroll.complete();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    ShirtsPage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro: pro, pros: this.productsResponse });
    };
    ShirtsPage.prototype.addToCart = function (product) {
        var _this = this;
        if (product.in_stock && product.purchasable) {
            var added = this.global.addCartItem(product);
            if (added) {
                this.cartTotal = this.cartTotal + 1;
            }
            this.translate.get(added ? 'item_added' : 'item_updated').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('item_unavailable').subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    ShirtsPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ShirtsPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    ShirtsPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ShirtsPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ShirtsPage.prototype.cartPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
        modal.onDidDismiss(function () {
            _this.cartTotal = Number(_this.global.getCartItemsCount());
        });
        modal.present();
    };
    ShirtsPage.prototype.toggleFavorite = function (pro) {
        pro.favorite = this.global.toggleFavorite(pro);
    };
    ShirtsPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    ShirtsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shirts ',template:/*ion-inline-start:"/Users/killahmade/rx/rxstat/src/pages/shirts/shirts.html"*/'<ion-header class="bg-thime">\n	<ion-navbar>\n		<ion-title>\n			<p [innerHTML]="category.name"></p>\n			<div class="icon-box" (click)="cartPage()">\n				<img src="assets/imgs/ic_my_cart.png">\n				<ion-badge>{{cartTotal}}</ion-badge>\n			</div>\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content class="bg-light">\n	<ion-list>\n		<ion-row *ngFor="let products of productsAll">\n			<ion-col col-6 *ngFor="let pro of products">\n				<ion-card>\n					<ion-card-header>\n						<div *ngIf="pro.images && pro.images.length" class="img-box" (click)="itemdetailPage(pro)">\n							<img data-src="{{pro.images[0].src}}">\n						</div>\n						<div *ngIf="pro.images == null || pro.images.length == 0" class="img-box"\n							(click)="itemdetailPage(pro)">\n							<img src="assets/imgs/suit_PNG8132.png">\n						</div>\n						<ion-icon *ngIf="pro.favorite" name="md-heart" class="text-sky icon"\n							(click)="toggleFavorite(pro)"></ion-icon>\n						<ion-icon *ngIf="!pro.favorite" name="md-heart-outline" class="text-light icon"\n							(click)="toggleFavorite(pro)"></ion-icon>\n						<h5 (click)="itemdetailPage(pro)">{{pro.name}}</h5>\n					</ion-card-header>\n\n					<ion-card-content>\n						<div *ngIf="pro.type ==\'simple\'" class="btn text-white" (click)="addToCart(pro)">\n							{{ \'add_to_cart\' | translate }}</div>\n					</ion-card-content>\n				</ion-card>\n			</ion-col>\n		</ion-row>\n	</ion-list>\n	<ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n		<ion-infinite-scroll-content></ion-infinite-scroll-content>\n	</ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"/Users/killahmade/rx/rxstat/src/pages/shirts/shirts.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ShirtsPage);
    return ShirtsPage;
}());

//# sourceMappingURL=shirts.js.map

/***/ })

},[459]);
//# sourceMappingURL=main.js.map