import UsersList from '@/components/custom/UsersList';
import AddNewUser from '@/components/custom/AddNewUser';
import CountrySelector from '@/components/custom/CountrySelector';
import ThemeToggler from '@/components/custom/ThemeToggler';
import { isUserAlreadyLogged } from '@/actions/auth';

export default async function HomePage() {
  const isLogged = await isUserAlreadyLogged();

  return (
    <div>
      <div className='max-w-[800px]'>
        <ThemeToggler />
        <CountrySelector />
        <UsersList />
        <AddNewUser isLogged={isLogged} />
      </div>
    </div>
  );
}
