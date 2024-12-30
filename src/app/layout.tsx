import React from 'react';

import '@/styles/globals.css';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import { Toaster } from '@/components/ui/toaster';
import { getUserPreferences } from '@/actions/preferences';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const preferences = await getUserPreferences();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme={`${preferences?.theme || 'dark'}`}
              disableTransitionOnChange
            >
              <main>{children}</main>
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
