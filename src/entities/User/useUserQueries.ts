'use client';

import { useQuery } from '@tanstack/react-query';

import { UserApi } from '@/entities/User/UserApi';

const useGetAllUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => UserApi.getAll(),
    staleTime: 30 * 1000,
  });

export { useGetAllUsers };
