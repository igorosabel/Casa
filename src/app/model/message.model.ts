import { MessageInterface, TagInterface } from '@interfaces/message.interfaces';
import Tag from '@model/tag.model';
import Utils from '@services/utils.class';

export default class Message {
  tagList: string = '';

  constructor(
    public id: number | null = null,
    public idUser: number = -1,
    public body: string = '',
    public type: number = 0,
    public done: boolean = false,
    public isPrivate: boolean = false,
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
    this.idUser = m.idUser;
    this.body = Utils.urldecode(m.body);
    this.type = m.type;
    this.done = m.done;
    this.isPrivate = m.isPrivate;
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
      idUser: this.idUser,
      body: Utils.urlencode(this.body),
      type: this.type,
      done: this.done,
      isPrivate: this.isPrivate,
      tags: this.tags.map((t: Tag): TagInterface => t.toInterface()),
      date: this.date,
      color: this.color,
      tagList: this.tagList,
    };
  }
}
