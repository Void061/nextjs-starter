'use client';

import { useQuery } from '@tanstack/react-query';

import useCountryApi from '@/entities/Country/useCountryApi';

const useGetAllCountries = () => {
  const countryApi = useCountryApi();

  return useQuery({
    queryKey: ['countries'],
    queryFn: () => countryApi.findAll(),
    staleTime: Infinity,
  });
};

export { useGetAllCountries };
