'use client';

import { useTranslations } from 'next-intl';

import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { useGetAllPosts } from '@/entities/Post/usePostQueries';

const PostsList = () => {
  const t = useTranslations('HomePage');
  const { data: posts, isLoading, isFetching } = useGetAllPosts();

  if (isLoading) {
    return <div>{t('loading')}...</div>;
  }

  return (
    <Table>
      <TableCaption>{t('post-list')}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>{t('id')}</TableHead>
          <TableHead>{t('title')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching && (
          <TableRow>
            <TableCell className='font-medium'>...</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
        )}

        {posts
          ?.slice()
          ?.reverse()
          .map((post) => (
            <TableRow key={post.id}>
              <TableCell className='font-medium'>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default PostsList;
