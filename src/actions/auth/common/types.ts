export interface IWithUserCredentialsParams {
  email: string;
  password: string;
  name: string;
  surname: string;
  theme: string;
  country: string;
}

export interface IAuthResponse {
  data?: unknown;
  error: Error | null;
}
