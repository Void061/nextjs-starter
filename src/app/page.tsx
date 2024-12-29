import PostsList from '@/components/custom/PostsList';
import AddNewPost from '@/components/custom/AddNewPost';
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
        <PostsList />
        <AddNewPost isLogged={isLogged} />
      </div>
    </div>
  );
}
