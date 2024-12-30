import { ECountries, EThemes } from '@/common/types';

export interface ISwitchThemeParams {
  themeName: EThemes;
}

export interface IChangeCountryParams {
  countryName: ECountries;
}

export interface IUserProfile {
  email: string;
  name: string;
  surname: string;
  country: string;
  theme: string;
}
