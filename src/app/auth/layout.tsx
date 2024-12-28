import React from 'react';

import { redirect } from 'next/navigation';

import { isUserAlreadyLogged } from '@/actions/auth';
import { HOME_ROUTE } from '@/routes';

interface IAuthLayoutProps {
  children?: React.ReactNode;
}
export default async function AuthLayout({ children }: IAuthLayoutProps) {
  const alreadyLogged = await isUserAlreadyLogged();

  if (alreadyLogged) {
    redirect(HOME_ROUTE);
  }

  return <>{children}</>;
}
