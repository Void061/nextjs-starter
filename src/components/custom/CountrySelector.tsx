'use client';

import { useMemo, useState } from 'react';

import { useLocale } from 'next-intl';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { languages } from '@/i18n/languages';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const CountrySelector = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>();
  const locale = useLocale();
  const router = useRouter();

  useMemo(() => {
    const _locale = languages.find((language) => language.value === locale);

    setValue(_locale?.value);
  }, [locale]);

  const handleChangCountry = (language: string) => {
    if (language !== value) {
      document.cookie = `locale=${language}; path=/; max-age=31536000;`;

      setValue(language);

      router.refresh();
    }

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {languages.find((language) => language.value === value)?.label}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => handleChangCountry(currentValue)}
                >
                  {language.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === language.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelector;
