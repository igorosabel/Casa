import { MessageInterface, TagInterface } from 'src/app/interfaces/interfaces';
import { Tag } from 'src/app/model/tag.model';
import { Utils } from 'src/app/services/utils.class';

export class Message {
  tag_list: string = '';

  constructor(
    public id: number = -1,
    public id_user: number = -1,
    public body: string = '',
    public type: number = 0,
    public done: boolean = false,
    public is_private: boolean = false,
    public tags: Tag[] = [],
    public date: string = '',
    public color: string = ''
  ) {}

  get allTags(): string {
    const allTags: string[] = this.tags.map((x: Tag): string => x.name);
    return allTags.join(', ');
  }

  get hashColor(): string {
    return '#' + this.color;
  }

  set hashColor(color: string) {
    this.color = color.replace('#', '');
  }

  fromInterface(m: MessageInterface): Message {
    this.id = m.id;
    this.id_user = m.id_user;
    this.body = Utils.urldecode(m.body);
    this.type = m.type;
    this.done = m.done;
    this.is_private = m.is_private;
    this.tags = m.tags.map((t: TagInterface): Tag => {
      return new Tag().fromInterface(t);
    });
    this.date = m.date;
    this.color = m.color;

    return this;
  }

  toInterface(): MessageInterface {
    return {
      id: this.id,
      id_user: this.id_user,
      body: this.body,
      type: this.type,
      done: this.done,
      is_private: this.is_private,
      tags: this.tags.map((x: Tag): TagInterface => x.toInterface()),
      date: this.date,
      color: this.color,
      tag_list: this.tag_list,
    };
  }
}
