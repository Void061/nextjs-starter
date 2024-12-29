'use client';

import { useQuery } from '@tanstack/react-query';

import usePostApi from '@/entities/Post/usePostApi';

const useGetAllPosts = () => {
  const postApi = usePostApi();

  return useQuery({
    queryKey: ['posts'],
    queryFn: () => postApi.findAll(),
    staleTime: 30 * 1000,
  });
};

export { useGetAllPosts };
