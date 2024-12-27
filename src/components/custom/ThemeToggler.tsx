'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { EThemes } from '@/common/types';

const ThemeToggler = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant='secondary'
      size='icon'
      onClick={() => {
        setTheme(theme === EThemes.DARK ? EThemes.LIGHT : EThemes.DARK);
      }}
    >
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};

export default ThemeToggler;
