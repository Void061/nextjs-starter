'use client';

import { useQuery } from '@tanstack/react-query';

import useThemeApi from '@/entities/Theme/useThemeApi';

const useGetAllThemes = () => {
  const themesApi = useThemeApi();

  return useQuery({
    queryKey: ['themes'],
    queryFn: () => themesApi.findAll(),
    staleTime: 30 * 1000,
  });
};

export { useGetAllThemes };
