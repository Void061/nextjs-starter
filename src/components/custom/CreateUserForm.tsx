'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import {
  CreateUserFormFields,
  createUserValidation,
} from '@/entities/User/common/validation/createUserValidation';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateUser } from '@/entities/User/useUserMutations';
import Button from '@/components/custom/Button';

interface ICreateUserFormProps {
  setOpenDialog: (open: boolean) => void;
}

const CreateUserForm = ({ setOpenDialog }: ICreateUserFormProps) => {
  const t = useTranslations('HomePage');
  const form = useForm<CreateUserFormFields>({
    resolver: zodResolver(createUserValidation),
  });
  const { mutateAsync, isPending, isSuccess } = useCreateUser();

  const onSubmit = async (userPayload: CreateUserFormFields) => {
    const userData = {
      ...userPayload,
      avatar: 'https://i.imgur.com/yhW6Yw1.jpg',
    };

    try {
      await mutateAsync(userData);

      setOpenDialog(false);
    } catch (err) {
      console.error(err);
    }
  };

  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input
                  onChange={(v) => field.onChange(v)}
                  placeholder={t('email-description')}
                />
              </FormControl>

              {errors.email && (
                <span className='text-sm text-destructive'>
                  {t('email-error')}
                </span>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input
                  onChange={(v) => field.onChange(v)}
                  placeholder={t('name-description')}
                />
              </FormControl>
              {errors.name && (
                <span className='text-sm text-destructive'>
                  {t('name-error')}
                </span>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <Input
                  onChange={(v) => field.onChange(v)}
                  type='password'
                  placeholder={t('password-description')}
                />
              </FormControl>
              {errors.password && (
                <span className='text-sm text-destructive'>
                  {t('password-error')}
                </span>
              )}
            </FormItem>
          )}
        />

        <div className='flex items-center space-x-2 pt-4'>
          <Button
            variant='outline'
            type='button'
            onClick={() => setOpenDialog(false)}
          >
            {t('cancel')}
          </Button>
          <Button
            isLoading={isPending || isSuccess}
            disabled={isPending || isSuccess}
            type='submit'
          >
            {t('confirm')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateUserForm;
