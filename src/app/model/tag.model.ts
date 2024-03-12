import { TagInterface } from 'src/app/interfaces/message.interfaces';
import { Utils } from 'src/app/services/utils.class';

export class Tag {
  constructor(
    public id: number = -1,
    public id_user: number = -1,
    public name: string = ''
  ) {}

  fromInterface(t: TagInterface): Tag {
    this.id = t.id;
    this.id_user = t.id_user;
    this.name = Utils.urldecode(t.name);

    return this;
  }

  toInterface(): TagInterface {
    return {
      id: this.id,
      id_user: this.id_user,
      name: this.name,
    };
  }
}
