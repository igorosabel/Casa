import { urldecode, urlencode } from '@osumi/tools';
import { TagInterface } from 'src/app/interfaces/message.interfaces';

export default class Tag {
  constructor(
    public id: number = -1,
    public id_user: number = -1,
    public name: string | null = null
  ) {}

  fromInterface(t: TagInterface): Tag {
    this.id = t.id;
    this.id_user = t.id_user;
    this.name = urldecode(t.name);

    return this;
  }

  toInterface(): TagInterface {
    return {
      id: this.id,
      id_user: this.id_user,
      name: urlencode(this.name),
    };
  }
}
