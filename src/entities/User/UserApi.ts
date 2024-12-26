import { IUser, IUserCreateParams } from '@/entities/User/common/types';
import { BaseApiResponse } from '@/entities/common/types';
import CoreApi from '@/core/CoreApi';

const coreApi = new CoreApi();

export const UserApi = {
  getAll: async (): Promise<IUser[]> => {
    const response = await coreApi.get<BaseApiResponse<IUser[]>>('/users');

    if (coreApi.isError(response)) {
      return [];
    }

    return response;
  },
  addOne: async (userData: IUserCreateParams): Promise<boolean> => {
    const response = await coreApi.post<
      BaseApiResponse<IUserCreateParams>,
      IUserCreateParams
    >('/users', userData);

    return !coreApi.isError(response);
  },
};
