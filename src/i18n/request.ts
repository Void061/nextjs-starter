import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieStore = await cookies();
  const localeCookies = cookieStore.get('locale');
  let locale = 'it';

  if (localeCookies) {
    locale =
      localeCookies.value === 'en' || localeCookies.value === 'it'
        ? localeCookies.value
        : 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
