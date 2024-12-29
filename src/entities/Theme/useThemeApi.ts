'use client';

import { BaseApiResponse } from '@/entities/common/types';
import useCoreApi from '@/core/client/useCoreApi';
import { ITheme } from '@/entities/Theme/common/types';
import { THEMES_API_ROUTE } from '@/entities/Theme/common/constants';

function useThemeApi() {
  const coreApi = useCoreApi();

  const findAll = async (): Promise<ITheme[]> => {
    const response =
      await coreApi.get<BaseApiResponse<ITheme[]>>(THEMES_API_ROUTE);

    if (coreApi.isError(response)) {
      return [];
    }

    return response;
  };

  return {
    findAll,
  };
}

export default useThemeApi;
