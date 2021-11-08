export interface DataShareGlobals {
	[key: string]: any;
}

export interface LoginData {
	email: string;
	pass: string;
}

export interface LoginResult {
	status: string;
	id: number;
	name: string;
	token: string;
}

export interface RegisterData {
	email: string;
	name: string;
	pass: string;
	conf_pass: string;
}

export interface UserInterface {
	id: number;
	name: string;
	email: string;
	token: string;
}
