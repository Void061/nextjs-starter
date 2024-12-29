import { ECountries, EThemes } from '@/common/types';

export interface ISwitchThemeParams {
  themeName: EThemes;
}

export interface IChangeCountryParams {
  countryName: ECountries;
}
