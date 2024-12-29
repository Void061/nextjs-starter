'use client';

export function UpdateLocale(newLocale: string) {
  document.cookie = `locale=${newLocale}; path=/; max-age=31536000;`;
}
