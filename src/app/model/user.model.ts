import { UserInterface } from '@interfaces/user.interfaces';
import Family from '@model/family.model';
import Utils from '@services/utils.class';

export default class User {
  constructor(
    public id: number = -1,
    public name: string = '',
    public email: string = '',
    public token: string = '',
    public color: string = 'ff0000',
    public family: Family | null = null
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
    if (u.family !== null) {
      this.family = new Family().fromInterface(u.family);
    }

    return this;
  }

  toInterface(): UserInterface {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      token: this.token,
      color: this.color,
      family: this.family !== null ? this.family.toInterface() : null,
    };
  }
}
