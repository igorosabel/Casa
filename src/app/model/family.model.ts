import { FamilyInterface, MemberInterface } from '@interfaces/user.interfaces';
import Member from '@model/member.model';
import Utils from '@services/utils.class';

export default class Family {
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
