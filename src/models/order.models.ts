import { Address } from "./address.models";
import { LineItem } from "./line-item.models";

export class  Order {
	id: number;
	customer_id: number;
	order_key: string;
	number: string;
	currency: string;
	status: string;
	date_created: string;
	payment_method: string;
	payment_method_title: string;
	transaction_id: string;
	total: number;
	total_html: string;
	total_tax: number;
	discount_total: number;
	discount_total_html: string;
	total_tax_html: string;
	shipping_total_html: string;
	shipping_total: number;
	prices_include_tax: boolean;
	billing: Address;
	shipping: Address;
	line_items: Array<LineItem>;
	fee_lines: Array<{ name: string, total: string, tax_status: string }>;
}