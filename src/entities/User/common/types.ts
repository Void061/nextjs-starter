export interface IUser {
  id: number;
  name: string;
}

export interface IUserCreateParams {
  email: string;
  password: string;
  avatar: string;
  name: string;
}
