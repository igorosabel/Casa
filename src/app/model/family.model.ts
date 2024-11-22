import { FamilyInterface, MemberInterface } from '@interfaces/user.interfaces';
import Member from '@model/member.model';
import { urldecode, urlencode } from '@osumi/tools';

export default class Family {
  constructor(
    public id: number = -1,
    public name: string | null = null,
    public members: Member[] = []
  ) {}

  fromInterface(f: FamilyInterface): Family {
    this.id = f.id;
    this.name = urldecode(f.name);
    this.members = f.members.map((m: MemberInterface): Member => {
      return new Member().fromInterface(m);
    });

    return this;
  }

  toInterface(): FamilyInterface {
    return {
      id: this.id,
      name: urlencode(this.name),
      members: this.members.map((m: Member): MemberInterface => {
        return m.toInterface();
      }),
    };
  }
}
