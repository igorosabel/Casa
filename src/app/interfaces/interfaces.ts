export interface LoginData {
  email: string;
  pass: string;
}

export interface LoginResult {
  status: string;
  id: number;
  name: string;
  token: string;
}

export interface RegisterData {
  email: string;
  name: string;
  pass: string;
  conf_pass: string;
}

export interface StatusResult {
  status: string;
}
