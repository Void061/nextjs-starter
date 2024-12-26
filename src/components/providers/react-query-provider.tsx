'use client';

import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/query-core';

interface IReactQueryProviderProps {
  children?: React.ReactNode;
}

export function ReactQueryProvider({ children }: IReactQueryProviderProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
