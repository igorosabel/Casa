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

export interface NewPassData {
	pass: string;
	conf: string;
	token: string;
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
	tag_list?: string;
}

export interface TagsResult {
	status: string;
	list: TagInterface[];
}

export interface MessagesResult {
	status: string;
	list: MessageInterface[];
}

export interface MessageResult {
	status: string;
	message: MessageInterface;
}

export interface UserResult {
	status: string;
	user: UserInterface;
}

export interface ChangePassInterface {
	current: string;
	new_pass: string;
	conf_pass: string;
}
