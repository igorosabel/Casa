import { UserInterface } from '../interfaces/interfaces';

export class User {
	constructor(
		public id: number = -1,
		public name: string = '',
		public email: string = '',
		public token: string = '',
		public color: string = ''
	) {}

	toInterface(): UserInterface {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			token: this.token,
			color: this.color
		};
	}
}
