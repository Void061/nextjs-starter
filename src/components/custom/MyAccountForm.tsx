'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Button from '@/components/custom/Button';
import { useToast } from '@/hooks/use-toast';
import {
  MyAccountFormFields,
  myAccountValidation,
} from '@/actions/auth/validation/myAccountValidationSchema';
import { useGetMyAccount } from '@/entities/User/useUserQueries';
import { useUpdateProfile } from '@/entities/User/useUserMutations';
import CoreApiError from '@/core/CoreApiError';

export function MyAccountForm() {
  const myAccountTranslations = useTranslations('My-Account');
  const authTranslations = useTranslations('Auth');
  const { data: myAccountData, isPending } = useGetMyAccount();
  const { mutateAsync } = useUpdateProfile();

  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<MyAccountFormFields>({
    values: {
      name: myAccountData?.name as string,
      surname: myAccountData?.surname as string,
    },
    resolver: zodResolver(myAccountValidation),
  });

  const onSubmit = async (myAccountData: MyAccountFormFields) => {
    const response = await mutateAsync(myAccountData);

    if (response instanceof CoreApiError) {
      toast({
        title: response.message,
        variant: 'destructive',
      });

      return;
    }

    setValue('name', response.name);
    setValue('surname', response.surname);
  };

  if (isPending) {
    return <div>Loading informations...</div>;
  }

  return (
    <div className='m-auto max-w-lg'>
      <form onSubmit={handleSubmit(onSubmit)} className='p-6 md:p-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-2xl font-bold'>
              {myAccountTranslations('page-title')}
            </h1>
            <p className='text-balance text-muted-foreground'>
              {myAccountTranslations('you-can-edit-your-account')}
            </p>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='name'>{authTranslations('name')}</Label>
            <Input
              {...register('name')}
              id='name'
              type='name'
              placeholder={authTranslations('name-placeholder')}
            />
            {errors.name && (
              <span className='text-sm text-destructive'>
                {authTranslations('name-error')}
              </span>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='surname'>{authTranslations('surname')}</Label>
            <Input
              {...register('surname')}
              id='surname'
              type='surname'
              placeholder={authTranslations('surname-placeholder')}
            />
            {errors.surname && (
              <span className='text-sm text-destructive'>
                {authTranslations('surname-error')}
              </span>
            )}
          </div>

          <Button
            isLoading={isSubmitting}
            disabled={!isDirty || isSubmitting}
            type='submit'
            className='w-full'
          >
            {myAccountTranslations('save-changes')}
          </Button>
        </div>
      </form>
    </div>
  );
}
