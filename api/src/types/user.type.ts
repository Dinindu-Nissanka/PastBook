export interface IUserInput {
  name: string;
  password: string;
  email: string;
}

export interface User {
  name: string;
  token?: string;
  email: string;
}
