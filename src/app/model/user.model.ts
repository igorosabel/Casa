import { UserInterface } from '../interfaces/interfaces';

export class User {
	constructor(
		public id: number = -1,
		public name: string = '',
		public email: string = '',
		public token: string = '',
		public color: string = ''
	) {}

	get hashColor(): string {
		return '#' + this.color;
	}

	set hashColor(color: string) {
		this.color = color.replace('#', '');
	}

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
