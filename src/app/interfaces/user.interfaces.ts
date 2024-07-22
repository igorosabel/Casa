export interface FamilyInterface {
  id: number;
  name: string;
  members: MemberInterface[];
}

export interface MemberInterface {
  idUser: number;
  isAdmin: boolean;
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  token: string;
  color: string;
  family: FamilyInterface | null;
}

export interface NewPassData {
  pass: string;
  conf: string;
  token: string;
}

export interface UserResult {
  status: string;
  user: UserInterface;
}

export interface ChangePassInterface {
  current: string;
  new_pass: string;
  conf_pass: string;
}
