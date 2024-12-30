'use client';

import { BaseApiResponse } from '@/entities/common/types';
import useCoreApi from '@/core/client/useCoreApi';
import { USERS_API_ROUTES } from '@/entities/User/common/constants';
import { ITheme } from '@/entities/Theme/common/types';
import CoreApiError from '@/core/CoreApiError';
import {
  IChangeCountryParams,
  ISwitchThemeParams,
  IUpdateProfileParams,
  IUserProfile,
} from '@/entities/User/common/types';
import { ICountry } from '@/entities/Country/common/types';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { logout } from '@/actions/auth';

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

  const getMe = async (): Promise<IUserProfile | void> => {
    const response = await coreApi.get<BaseApiResponse<IUserProfile>>(
      USERS_API_ROUTES.GET_ME
    );

    if (coreApi.isError(response)) {
      await logout();

      return;
    }

    return response;
  };

  const updateProfile = async (
    updateProfileParams: IUpdateProfileParams
  ): Promise<IUserProfile | CoreApiError> => {
    const response = coreApi.patch<
      BaseApiResponse<IUserProfile>,
      IUpdateProfileParams
    >(USERS_API_ROUTES.UPDATE_PROFILE, updateProfileParams);

    if (coreApi.isError(response)) {
      return response;
    }

    return response;
  };

  return {
    getMe,
    isLoggedIn,
    switchTheme,
    changeCountry,
    updateProfile,
  };
}

export default useUserApi;
