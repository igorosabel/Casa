export interface DataShareGlobals {
	[key: string]: any;
}

export interface LoginData {
	user: string;
	pass: string;
}

export interface LoginResult {
	status: string;
	id: number;
	name: string;
	token: string;
}

export interface UserInterface {
	id: number;
	name: string;
	email: string;
	pass: string;
	conf_pass: string;
	token: string;
}