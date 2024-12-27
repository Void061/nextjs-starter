'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserApi } from '@/entities/User/UserApi';
import { IUserCreateParams } from '@/entities/User/common/types';

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addUser'],
    mutationFn: (userData: IUserCreateParams) => UserApi.addOne(userData),
    onSuccess: (result) => {
      if (result) queryClient.invalidateQueries({ queryKey: ['users'] });

      return result;
    },
  });
};

export { useCreateUser };
