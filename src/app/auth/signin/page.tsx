import Link from 'next/link';

import { AUTH_ROUTES } from '@/routes';

export default async function SigninPage() {
  return (
    <div>
      <Link href={AUTH_ROUTES.SIGN_UP}>SIGNUP</Link>
    </div>
  );
}
