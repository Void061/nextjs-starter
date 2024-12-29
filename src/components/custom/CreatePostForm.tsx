'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Button from '@/components/custom/Button';
import { useToast } from '@/hooks/use-toast';
import { useCreatePost } from '@/entities/Post/usePostMutations';
import {
  CreatePostFormFields,
  createPostValidation,
} from '@/entities/Post/common/validation/createPostValidation';

interface ICreatePostFormProps {
  setOpenDialog: (open: boolean) => void;
}

const CreatePostForm = ({ setOpenDialog }: ICreatePostFormProps) => {
  const t = useTranslations('HomePage');
  const form = useForm<CreatePostFormFields>({
    resolver: zodResolver(createPostValidation),
  });
  const { toast } = useToast();
  const { mutateAsync, isPending } = useCreatePost();

  const onSubmit = async (postPayload: CreatePostFormFields) => {
    const result = await mutateAsync(postPayload);

    if (result) {
      setOpenDialog(false);
    } else {
      toast({
        title: t('error'),
        description: t('generic-error'),
        variant: 'destructive',
      });
    }
  };

  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('title')}</FormLabel>
              <FormControl>
                <Input
                  onChange={(v) => field.onChange(v)}
                  placeholder={t('title-description')}
                />
              </FormControl>

              {errors.title && (
                <span className='text-sm text-destructive'>
                  {t('title-error')}
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
          <Button isLoading={isPending} disabled={isPending} type='submit'>
            {t('confirm')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;
