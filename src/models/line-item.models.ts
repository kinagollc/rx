import { Product } from "./product.models";

export class LineItem {
	id: number;
	product_id: number;
	subtotal: number;
	subtotal_tax: number;
	total: number;
	total_tax: number;
	price: number;
	price_html: string;
	total_html: string;
	subtotal_html: string;
	quantity: number;
	sku: string;
	name: string;
	image: string;
	product: Product;
}