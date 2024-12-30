'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Button from '@/components/custom/Button';
import { signInWithEmailAndPassword } from '@/actions/auth';
import { AUTH_ROUTES } from '@/routes';
import { useToast } from '@/hooks/use-toast';
import {
  SigninFormFields,
  signinValidation,
} from '@/actions/auth/validation/signinValidationSchema';
import { SUPABASE_AUTH_ERRORS } from '@/actions/auth/common/constants';
import useUserApi from '@/entities/User/useUserApi';

export function SigninForm() {
  const t = useTranslations('Auth');
  const { getMe } = useUserApi();
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormFields>({
    resolver: zodResolver(signinValidation),
  });

  const onSubmit = async (userPayload: SigninFormFields) => {
    const { error } = await signInWithEmailAndPassword({
      email: userPayload.email,
      password: userPayload.password,
    });

    if (error) {
      let errorMsg = error.message;

      if (errorMsg === SUPABASE_AUTH_ERRORS.SIGNIN_INVALID_CREDENTIALS) {
        errorMsg = t('invalid-credentials');
      }

      toast({
        title: errorMsg,
        variant: 'destructive',
      });

      return;
    }

    const getMeResponse = await getMe();

    if (getMeResponse) {
      setTheme(getMeResponse.theme);
    }
  };

  return (
    <div className='m-auto max-w-lg'>
      <form onSubmit={handleSubmit(onSubmit)} className='p-6 md:p-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-2xl font-bold'>{t('welcome-back')}</h1>
            <p className='text-balance text-muted-foreground'>
              {t('signin-title')}
            </p>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='email'>{t('email')}</Label>
            <Input
              {...register('email')}
              id='email'
              type='email'
              placeholder={t('email-placeholder')}
            />
            {errors.email && (
              <span className='text-sm text-destructive'>
                {t('email-error')}
              </span>
            )}
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>{t('password')}</Label>
              <a
                href='#'
                className='ml-auto text-sm underline-offset-2 hover:underline'
              >
                {t('forgot-password')}
              </a>
            </div>
            <Input
              {...register('password')}
              id='password'
              type='password'
              placeholder={t('password-placeholder')}
            />
            {errors.password && (
              <span className='text-sm text-destructive'>
                {t('password-error')}
              </span>
            )}
          </div>
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            type='submit'
            className='w-full'
          >
            {t('signin')}
          </Button>
          <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>
              {t('or-continue-with')}
            </span>
          </div>
          <div className='grid grid-cols-1 gap-4'>
            <Button variant='outline' className='w-full'>
              <>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                  <path
                    d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                    fill='currentColor'
                  />
                </svg>
                <span className='sr-only'>{t('login-with-google')}</span>
              </>
            </Button>
          </div>
          <div className='text-center text-sm'>
            {t('dont-have-an-account')}
            <Link
              href={AUTH_ROUTES.SIGN_UP}
              className='underline underline-offset-4'
            >
              {t('signup')}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}