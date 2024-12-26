'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import Button from '@/components/custom/Button';
import CreateUserForm from '@/components/custom/CreateUserForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AddNewUser = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations('HomePage');

  return (
    <div className='fixed bottom-4 right-3'>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button onClick={() => setIsOpen(true)}>{t('create-new-user')}</Button>

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
    </div>
  );
};

export default AddNewUser;
