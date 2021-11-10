import { Injectable } from '@angular/core';
import { User }       from '../model/user.model';
import { Tag }        from '../model/tag.model';
import { Message }    from '../model/message.model';
import { Utils }      from './utils.class';
import {
	UserInterface,
	TagInterface,
	MessageInterface
} from '../interfaces/interfaces';

@Injectable({
	providedIn: 'root'
})
export class ClassMapperService {
	constructor() {}

	getUsers(us: UserInterface[]): User[] {
		const users: User[] = [];

		for (let u of us) {
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

	getTags(ts: TagInterface[]): Tag[] {
		const tags: Tag[] = [];

		for (let t of ts) {
			tags.push(this.getTag(t));
		}

		return tags;
	}

	getTag(t: TagInterface): Tag {
		return new Tag(
			t.id,
			t.id_user,
			Utils.urldecode(t.name)
		);
	}

	getMessages(ms: MessageInterface[]): Message[] {
		const messages: Message[] = [];

		for (let m of ms) {
			messages.push(this.getMessage(m));
		}

		return messages;
	}

	getMessage(m: MessageInterface): Message {
		return new Message(
			m.id,
			m.id_user,
			Utils.urldecode(m.body),
			m.type,
			m.done,
			m.is_private,
			this.getTags(m.tags),
			Utils.urldecode(m.date)
		);
	}
}
