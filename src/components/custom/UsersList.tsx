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
import { useGetAllUsers } from '@/entities/User/useUserQueries';

const UsersList = () => {
  const t = useTranslations('HomePage');
  const { data: users, isLoading, isFetching } = useGetAllUsers();

  if (isLoading) {
    return <div>{t('loading')}...</div>;
  }

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>{t('id')}</TableHead>
          <TableHead>{t('name')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching && (
          <TableRow>
            <TableCell className='font-medium'>...</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
        )}

        {users
          ?.slice()
          ?.reverse()
          .map((user) => (
            <TableRow key={user.id}>
              <TableCell className='font-medium'>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default UsersList;
