'use client';

import { useMutation } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import useUserApi from '@/entities/User/useUserApi';
import { ECountries, EThemes } from '@/common/types';
import CoreApiError from '@/core/CoreApiError';
import { UpdateLocale } from '@/lib/update-locale';

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

export { useSwitchTheme, useChangeCountry };
