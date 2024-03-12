import {
  FamilyInterface,
  MemberInterface,
} from 'src/app/interfaces/user.interfaces';
import { Member } from 'src/app/model/member.model';
import { Utils } from 'src/app/services/utils.class';

export class Family {
  constructor(
    public id: number = -1,
    public name: string = '',
    public members: Member[] = []
  ) {}

  fromInterface(f: FamilyInterface): Family {
    this.id = f.id;
    this.name = Utils.urldecode(f.name);
    this.members = f.members.map((m: MemberInterface): Member => {
      return new Member().fromInterface(m);
    });

    return this;
  }

  toInterface(): FamilyInterface {
    return {
      id: this.id,
      name: Utils.urlencode(this.name),
      members: this.members.map((m: Member): MemberInterface => {
        return m.toInterface();
      }),
    };
  }
}
