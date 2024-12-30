'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import useUserApi from '@/entities/User/useUserApi';
import { ECountries, EThemes } from '@/common/types';
import CoreApiError from '@/core/CoreApiError';
import { UpdateLocale } from '@/lib/update-locale';
import { IUpdateProfileParams } from '@/entities/User/common/types';

const useSwitchTheme = () => {
  const usersApi = useUserApi();
  const { setTheme } = useTheme();

  return useMutation({
    mutationKey: ['switch-theme'],
    mutationFn: (theme: EThemes) => usersApi.switchTheme({ themeName: theme }),
    onSuccess: (result) => {
      if (!(result instanceof CoreApiError)) {
        setTheme(result.value);
      }
    },
  });
};

const useChangeCountry = () => {
  const usersApi = useUserApi();
  const router = useRouter();

  return useMutation({
    mutationKey: ['change-country'],
    mutationFn: (country: ECountries) =>
      usersApi.changeCountry({ countryName: country }),
    onSuccess: (result) => {
      if (!(result instanceof CoreApiError)) {
        UpdateLocale(result.value);

        router.refresh();
      }
    },
  });
};

const useUpdateProfile = () => {
  const usersApi = useUserApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: (updateProfileParams: IUpdateProfileParams) =>
      usersApi.updateProfile(updateProfileParams),
    onSuccess: (result) => {
      if (!(result instanceof CoreApiError)) {
        queryClient.invalidateQueries({ queryKey: ['my-account'] });
      }

      return result;
    },
  });
};

export { useSwitchTheme, useChangeCountry, useUpdateProfile };
