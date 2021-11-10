import { MessageInterface } from 'src/app/interfaces/interfaces';
import { Tag } from 'src/app/model/tag.model';

export class Message {
	constructor(
		public id: number = -1,
		public id_user: number = -1,
		public body: string = '',
		public type: number = 0,
		public done: boolean = false,
		public is_private: boolean = false,
		public tags: Tag[] = [],
		public date: string = ''
	) {}

	toInterface(): MessageInterface {
		return {
			id: this.id,
			id_user: this.id_user,
			body: this.body,
			type: this.type,
			done: this.done,
			is_private: this.is_private,
			tags: this.tags.map(x => x.toInterface()),
			date: this.date
		};
	}
}
