'use client';

import { useMemo, useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { Check, ChevronsUpDown } from 'lucide-react';

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
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useGetAllCountries } from '@/entities/Country/useCountryQueries';
import { useChangeCountry } from '@/entities/User/useUserMutations';
import CoreApiError from '@/core/CoreApiError';
import { useToast } from '@/hooks/use-toast';
import { KNOWN_ERRORS } from '@/common/constants';
import { ECountries } from '@/common/types';

const CountrySelector = () => {
  const t = useTranslations('Global');
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>();
  const locale = useLocale();
  const { data: countries } = useGetAllCountries();
  const { mutateAsync } = useChangeCountry();
  const { toast } = useToast();

  useMemo(() => {
    const _locale = countries?.find((country) => country.value === locale);

    setValue(_locale?.value);
  }, [locale, countries]);

  const handleChangCountry = async (country: string) => {
    const selectedCountry =
      country === ECountries.EN ? ECountries.EN : ECountries.IT;

    const response = await mutateAsync(selectedCountry);

    if (response instanceof CoreApiError) {
      let errorMsg = response.message;

      if (response.message === KNOWN_ERRORS.FAILED_TO_FETCH) {
        errorMsg = t('generic-error');
      }

      toast({
        title: errorMsg,
        variant: 'destructive',
      });
    } else {
      setValue(country);
      setOpen(false);
    }
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
          {countries?.find((language) => language.value === value)?.title}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandGroup>
              {countries?.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(currentValue) => handleChangCountry(currentValue)}
                >
                  {country.title}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === country.value ? 'opacity-100' : 'opacity-0'
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
