'use server';

import { IPreferences } from '@/actions/preferences/common/types';
import { EThemes } from '@/common/types';
import { ICountry } from '@/entities/Country/common/types';
import serverCoreApi from '@/core/server/serverCoreApi';
import { COUNTRIES_API_ROUTE } from '@/entities/Country/common/constants';
import { BaseApiResponse } from '@/entities/common/types';
import { PREFERENCES_API_ROUTE } from '@/actions/preferences/common/constants';

export async function getUserPreferences(): Promise<IPreferences> {
  const coreApi = serverCoreApi();
  const response = await coreApi.get<BaseApiResponse<IPreferences>>(
    PREFERENCES_API_ROUTE
  );

  if (coreApi.isError(response)) return { theme: EThemes.DARK };

  return {
    theme: response?.theme || EThemes.DARK,
    country: response?.country,
  };
}

export async function getSupportedCountries(): Promise<ICountry[]> {
  const coreApi = serverCoreApi();
  const response =
    await coreApi.get<BaseApiResponse<ICountry[]>>(COUNTRIES_API_ROUTE);

  if (coreApi.isError(response)) return [];

  return response;
}
