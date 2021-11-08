import { UserInterface } from '../interfaces/interfaces';

export class User {
	constructor(
		public id: number = -1,
		public name: string = '',
		public email: string = '',
		public pass: string = '',
		public conf_pass: string = '',
		public token: string = ''
	) {}

	toInterface(): UserInterface {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			pass: this.pass,
			conf_pass: this.conf_pass,
			token: this.token
		};
	}
}