import { UserInterface } from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/services/utils.class';

export class User {
  constructor(
    public id: number = -1,
    public name: string = '',
    public email: string = '',
    public token: string = '',
    public color: string = 'ff0000'
  ) {}

  get hashColor(): string {
    return '#' + this.color;
  }

  set hashColor(color: string) {
    this.color = color.replace('#', '');
  }

  fromInterface(u: UserInterface): User {
    this.id = u.id;
    this.name = Utils.urldecode(u.name);
    this.email = Utils.urldecode(u.email);
    this.token = u.token;
    this.color = u.color;

    return this;
  }

  toInterface(): UserInterface {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      token: this.token,
      color: this.color,
    };
  }
}
