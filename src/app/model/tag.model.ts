import { TagInterface } from 'src/app/interfaces/interfaces';

export class Tag {
	constructor(
		public id: number = -1,
		public id_user: number = -1,
		public name: string = ''
	) {}

	toInterface(): TagInterface {
		return {
			id: this.id,
			id_user: this.id_user,
			name: this.name
		};
	}
}
