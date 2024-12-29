'use client';

import { BaseApiResponse } from '@/entities/common/types';
import { ICreatePostParams, IPost } from '@/entities/Post/common/types';
import { POSTS_API_ROUTE } from '@/entities/Post/common/constants';
import useCoreApi from '@/core/client/useCoreApi';

function usePostApi() {
  const coreApi = useCoreApi();

  const findAll = async (): Promise<IPost[]> => {
    const response =
      await coreApi.get<BaseApiResponse<IPost[]>>(POSTS_API_ROUTE);

    if (coreApi.isError(response)) {
      return [];
    }

    return response;
  };
  const create = async (postData: ICreatePostParams): Promise<boolean> => {
    const response = await coreApi.post<
      BaseApiResponse<IPost>,
      ICreatePostParams
    >(POSTS_API_ROUTE, postData);

    return !coreApi.isError(response);
  };

  return {
    findAll,
    create,
  };
}

export default usePostApi;
