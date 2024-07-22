import { MemberInterface } from '@interfaces/user.interfaces';

export default class Member {
  constructor(public idUser: number = -1, public isAdmin: boolean = false) {}

  fromInterface(m: MemberInterface): Member {
    this.idUser = m.idUser;
    this.isAdmin = m.isAdmin;

    return this;
  }

  toInterface(): MemberInterface {
    return {
      idUser: this.idUser,
      isAdmin: this.isAdmin,
    };
  }
}
