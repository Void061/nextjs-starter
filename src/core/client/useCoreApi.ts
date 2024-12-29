'use client';

import { useLocale } from 'next-intl';

import { DEFAULT_HEADERS } from '@/core/common/constants';
import CoreApiError from '@/core/CoreApiError';
import { BaseApiResponse } from '@/entities/common/types';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

function useCoreApi() {
  const supabase = createSupabaseBrowserClient();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL!;
  const currentLocale = useLocale();

  const isError = <T>(
    responseToAnalyze: BaseApiResponse<T>
  ): responseToAnalyze is CoreApiError => {
    return responseToAnalyze instanceof CoreApiError;
  };

  const getHeaders = async (): Promise<HeadersInit> => {
    const accessToken = await getAccessToken();

    return {
      ...DEFAULT_HEADERS,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      'Accept-language': `${currentLocale}`,
    };
  };

  const getAccessToken = async (): Promise<string | undefined> => {
    const { data: session } = await supabase.auth.getSession();

    return session?.session?.access_token;
  };

  const get = async <T>(path: string): Promise<T | CoreApiError> => {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers: await getHeaders(),
      });

      if (!response.ok) {
        const errorBody = await response.json();

        return new CoreApiError({
          fault: {
            message: errorBody.message || 'An error occurred',
            status: response.status,
          },
        });
      }

      return (await response.json()) as T;
    } catch (exception) {
      const message = (exception as Error)?.message || 'Network error';

      return new CoreApiError({
        fault: {
          message,
          status: 500,
        },
      });
    }
  };

  const post = async <T, Body>(
    path: string,
    body: Body
  ): Promise<T | CoreApiError> => {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers: await getHeaders(),
        method: 'POST',
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.json();

        return new CoreApiError({
          fault: {
            message: errorBody.message || 'An error occurred',
            status: response.status,
          },
        });
      }

      return (await response.json()) as T;
    } catch (exception) {
      const message = (exception as Error)?.message || 'Network error';

      return new CoreApiError({
        fault: {
          message,
          status: 500,
        },
      });
    }
  };

  const patch = async <T, Body>(
    path: string,
    body: Body
  ): Promise<T | CoreApiError> => {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers: await getHeaders(),
        method: 'PATCH',
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.json();

        return new CoreApiError({
          fault: {
            message: errorBody.message || 'An error occurred',
            status: response.status,
          },
        });
      }

      return (await response.json()) as T;
    } catch (exception) {
      const message = (exception as Error)?.message || 'Network error';

      return new CoreApiError({
        fault: {
          message,
          status: 500,
        },
      });
    }
  };

  return {
    get,
    post,
    patch,
    isError,
  };
}

export default useCoreApi;
