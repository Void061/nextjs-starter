'use client';

import { BaseApiResponse } from '@/entities/common/types';
import useCoreApi from '@/core/client/useCoreApi';
import { USERS_API_ROUTES } from '@/entities/User/common/constants';
import { ITheme } from '@/entities/Theme/common/types';
import CoreApiError from '@/core/CoreApiError';
import {
  IChangeCountryParams,
  ISwitchThemeParams,
} from '@/entities/User/common/types';
import { ICountry } from '@/entities/Country/common/types';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

function useUserApi() {
  const coreApi = useCoreApi();

  const switchTheme = async (
    themeParams: ISwitchThemeParams
  ): Promise<ITheme | CoreApiError> => {
    // User not logged, change country locally
    const isLogged = await isLoggedIn();

    if (!isLogged)
      return {
        id: themeParams.themeName,
        value: themeParams.themeName,
        title: themeParams.themeName,
      };

    return await coreApi.patch<BaseApiResponse<ITheme>, ISwitchThemeParams>(
      USERS_API_ROUTES.SWITCH_THEME,
      themeParams
    );
  };

  const changeCountry = async (
    countryParams: IChangeCountryParams
  ): Promise<ICountry | CoreApiError> => {
    // User not logged, change country locally
    const isLogged = await isLoggedIn();

    if (!isLogged)
      return {
        id: countryParams.countryName,
        value: countryParams.countryName,
        title: countryParams.countryName,
      };

    return await coreApi.patch<BaseApiResponse<ICountry>, IChangeCountryParams>(
      USERS_API_ROUTES.CHANGE_COUNTRY,
      countryParams
    );
  };

  const isLoggedIn = async (): Promise<boolean> => {
    const supabase = createSupabaseBrowserClient();

    const { data } = await supabase.auth.getSession();

    return !!data?.session;
  };

  return {
    isLoggedIn,
    switchTheme,
    changeCountry,
  };
}

export default useUserApi;
