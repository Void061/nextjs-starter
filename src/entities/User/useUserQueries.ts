'use client';

import { useQuery } from '@tanstack/react-query';

import useUserApi from '@/entities/User/useUserApi';

const useGetMyAccount = () => {
  const userApi = useUserApi();

  return useQuery({
    queryKey: ['my-account'],
    queryFn: () => userApi.getMe(),
    staleTime: 30 * 1000,
  });
};

export { useGetMyAccount };
