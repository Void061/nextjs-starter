'use client';

import { BaseApiResponse } from '@/entities/common/types';
import useCoreApi from '@/core/client/useCoreApi';
import { ICountry } from '@/entities/Country/common/types';
import { COUNTRIES_API_ROUTE } from '@/entities/Country/common/constants';

function useCountryApi() {
  const coreApi = useCoreApi();

  const findAll = async (): Promise<ICountry[]> => {
    const response =
      await coreApi.get<BaseApiResponse<ICountry[]>>(COUNTRIES_API_ROUTE);

    if (coreApi.isError(response)) {
      return [];
    }

    return response;
  };

  return {
    findAll,
  };
}

export default useCountryApi;
