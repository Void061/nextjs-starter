'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import Button from '@/components/custom/Button';
import CreateUserForm from '@/components/custom/CreateUserForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { buttonVariants } from '@/components/ui/button';
import { AUTH_ROUTES } from '@/routes';
import { logout } from '@/actions/auth';
import { useToast } from '@/hooks/use-toast';

interface IAddNewUserProps {
  isLogged?: boolean;
}

const AddNewUser = ({ isLogged }: IAddNewUserProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggindOut] = useState<boolean>(false);
  const { toast } = useToast();
  const t = useTranslations('HomePage');

  const handleLogout = async () => {
    setIsLoggindOut(true);

    const { error } = await logout();

    if (error) {
      toast({
        title: t('generic-error'),
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
            <Button
              isLoading={isLoggingOut}
              disabled={isLoggingOut}
              onClick={handleLogout}
              className='max-w-sm'
            >
              {t('signout')}
            </Button>
            <Button onClick={() => setIsOpen(true)}>
              {t('create-new-user')}
            </Button>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('create-user-form-title')}</DialogTitle>
              <DialogDescription>
                {t('create-user-form-description')}
              </DialogDescription>
            </DialogHeader>

            <CreateUserForm setOpenDialog={setIsOpen} />
          </DialogContent>
        </Dialog>
      ) : (
        <Link href={AUTH_ROUTES.SIGN_IN} className={buttonVariants()}>
          {t('signin-to-add-new-user')}
        </Link>
      )}
    </div>
  );
};

export default AddNewUser;
