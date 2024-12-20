export class RegisterRequest {
	email: string;
	username: string;
	password: string;
	roles: string;
	first_name: string;
	last_name: string;
	avatar_url: string;
	meta_data: Array<{ key: string, value: string }>;

	constructor(email: string, username: string, password: string, firstname: string, lastname: string, avatar_url: string) {
		this.email = email;
		this.username = username;
		this.password = password;
		this.roles = 'customer';
		this.first_name = firstname;
		this.last_name = lastname;
		this.avatar_url = avatar_url;
	}
}