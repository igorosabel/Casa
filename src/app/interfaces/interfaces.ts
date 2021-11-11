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
	color: string;
}

export interface StatusResult {
	status: string;
}

export interface TagInterface {
	id: number;
	id_user: number;
	name: string;
}

export interface MessageInterface {
	id: number;
	id_user: number;
	body: string;
	type: number;
	done: boolean;
	is_private: boolean;
	tags: TagInterface[];
	date: string;
	color: string;
}
