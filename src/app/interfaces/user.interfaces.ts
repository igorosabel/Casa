export interface UserInterface {
  id: number;
  name: string;
  email: string;
  token: string;
  color: string;
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
