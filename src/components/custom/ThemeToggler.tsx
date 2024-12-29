'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { EThemes } from '@/common/types';
import { useGetAllThemes } from '@/entities/Theme/useThemeQueries';
import { useSwitchTheme } from '@/entities/User/useUserMutations';
import CoreApiError from '@/core/CoreApiError';
import { KNOWN_ERRORS } from '@/common/constants';
import { useToast } from '@/hooks/use-toast';

const ThemeToggler = () => {
  const t = useTranslations('Global');
  const { data: themes } = useGetAllThemes();
  const { mutateAsync } = useSwitchTheme();
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleChangeTheme = async (theme: string) => {
    const themeToggler = theme === EThemes.DARK ? EThemes.LIGHT : EThemes.DARK;
    const result = await mutateAsync(themeToggler);

    if (result instanceof CoreApiError) {
      if (result.message === KNOWN_ERRORS.FAILED_TO_FETCH) {
        toast({
          title: t('generic-error'),
          variant: 'destructive',
        });
      } else {
        toast({
          title: result.message,
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Button
      variant='secondary'
      size='icon'
      onClick={() => handleChangeTheme(theme as string)}
    >
      {themes?.map((theme) => {
        if (theme.value === EThemes.LIGHT) {
          return (
            <Sun
              key={theme.id}
              className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
            />
          );
        }

        if (theme.value === EThemes.DARK) {
          return (
            <Moon
              key={theme.id}
              className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
            />
          );
        }
      })}

      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};

export default ThemeToggler;
