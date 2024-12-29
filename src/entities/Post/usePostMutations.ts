'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ICreatePostParams } from '@/entities/Post/common/types';
import usePostApi from '@/entities/Post/usePostApi';

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const postApi = usePostApi();

  return useMutation({
    mutationKey: ['createPost'],
    mutationFn: (postData: ICreatePostParams) => postApi.create(postData),
    onSuccess: (result) => {
      if (result) queryClient.invalidateQueries({ queryKey: ['posts'] });

      return result;
    },
  });
};

export { useCreatePost };
