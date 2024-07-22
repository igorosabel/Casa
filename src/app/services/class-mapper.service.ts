import { Injectable } from '@angular/core';
import { MessageInterface, TagInterface } from '@interfaces/message.interfaces';
import { UserInterface } from '@interfaces/user.interfaces';
import Message from '@model/message.model';
import Tag from '@model/tag.model';
import User from '@model/user.model';

@Injectable({
  providedIn: 'root',
})
export default class ClassMapperService {
  getUsers(us: UserInterface[]): User[] {
    return us.map((u: UserInterface): User => {
      return this.getUser(u);
    });
  }

  getUser(u: UserInterface): User {
    return new User().fromInterface(u);
  }

  getTags(ts: TagInterface[]): Tag[] {
    return ts.map((t: TagInterface): Tag => {
      return this.getTag(t);
    });
  }

  getTag(t: TagInterface): Tag {
    return new Tag().fromInterface(t);
  }

  getMessages(ms: MessageInterface[]): Message[] {
    return ms.map((m: MessageInterface): Message => {
      return this.getMessage(m);
    });
  }

  getMessage(m: MessageInterface): Message {
    return new Message().fromInterface(m);
  }
}
