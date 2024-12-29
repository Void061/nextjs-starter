import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';

import {
  getSupportedCountries,
  getUserPreferences,
} from '@/actions/preferences';
import { ECountries } from '@/common/types';

export default getRequestConfig(async () => {
  const supportedCountries = await getSupportedCountries();
  const cookieStore = await cookies();
  const preferences = await getUserPreferences();
  const currentHeaders = await headers();

  const localeCookies = cookieStore.get('locale');
  const acceptLanguage = currentHeaders.get('accept-language');
  const country = acceptLanguage?.split(',')[0]?.split('-')[0] || null;

  const countryDetected = supportedCountries.find(
    (supportedCountry) => supportedCountry.value === country
  );

  // Check user preferences or local changes or country detected or default EN
  const locale =
    preferences?.country ||
    localeCookies?.value ||
    countryDetected?.value ||
    ECountries.EN;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
