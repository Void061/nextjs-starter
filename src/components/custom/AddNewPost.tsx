'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import Button from '@/components/custom/Button';
import CreatePostForm from '@/components/custom/CreatePostForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { buttonVariants } from '@/components/ui/button';
import { AUTH_ROUTES, MY_ACCOUNT_ROUTE } from '@/routes';
import { logout } from '@/actions/auth';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface IAddNewPostProps {
  isLogged?: boolean;
}

const AddNewPost = ({ isLogged }: IAddNewPostProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggindOut] = useState<boolean>(false);
  const { toast } = useToast();
  const homeTranslations = useTranslations('HomePage');
  const myAccountTranslations = useTranslations('My-Account');

  const handleLogout = async () => {
    setIsLoggindOut(true);

    const { error } = await logout();

    if (error) {
      toast({
        title: homeTranslations('generic-error'),
        variant: 'destructive',
      });
    }

    setIsLoggindOut(false);
  };

  return (
    <div className='fixed bottom-4 right-3'>
      {isLogged ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <div className='flex flex-col gap-2'>
            <Link href={MY_ACCOUNT_ROUTE} className={cn(buttonVariants())}>
              {myAccountTranslations('page-title')}
            </Link>
            <Button
              isLoading={isLoggingOut}
              disabled={isLoggingOut}
              onClick={handleLogout}
              className='max-w-sm'
            >
              {homeTranslations('signout')}
            </Button>
            <Button onClick={() => setIsOpen(true)}>
              {homeTranslations('create-new-post')}
            </Button>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {homeTranslations('create-post-form-title')}
              </DialogTitle>
              <DialogDescription>
                {homeTranslations('create-post-form-description')}
              </DialogDescription>
            </DialogHeader>

            <CreatePostForm setOpenDialog={setIsOpen} />
          </DialogContent>
        </Dialog>
      ) : (
        <Link href={AUTH_ROUTES.SIGN_IN} className={buttonVariants()}>
          {homeTranslations('signin-to-add-new-post')}
        </Link>
      )}
    </div>
  );
};

export default AddNewPost;
