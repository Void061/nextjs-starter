export interface ISignupWithCredentialsParams {
  email: string;
  password: string;
  name: string;
  surname: string;
  theme: string;
  country: string;
}

export interface ISigninWithCredentialsParams {
  email: string;
  password: string;
}

export interface IAuthResponse {
  data?: unknown;
  error: Error | null;
}

export interface IMyAccountParams {
  email: string;
  password: string;
  name: string;
  surname: string;
  theme: string;
  country: string;
}
