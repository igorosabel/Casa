import { Injectable }        from '@angular/core';
import { User }              from '../model/user.model';
import { Utils }             from './utils.class';
import {
	UserInterface
} from '../interfaces/interfaces';

@Injectable({
	providedIn: 'root'
})
export class ClassMapperService {
	constructor() {}

	getUsers(result: UserInterface[]): User[] {
		const users: User[] = [];

		for (let u of result) {
			users.push(this.getUser(u));
		}

		return users;
	}

	getUser(u: UserInterface): User {
		return new User(
			u.id,
			Utils.urldecode(u.name),
			Utils.urldecode(u.email),
			u.token
		);
	}
}
