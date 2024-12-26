import UsersList from '@/components/custom/UsersList';
import AddNewUser from '@/components/custom/AddNewUser';
import CountrySelector from '@/components/custom/CountrySelector';

export default function HomePage() {
  return (
    <div>
      <div className='max-w-[800px]'>
        <CountrySelector />
        <UsersList />
        <AddNewUser />
      </div>
    </div>
  );
}
