'use client';

import { SupabaseClient } from '@supabase/supabase-js';

import { BASE_API_URI, DEFAULT_HEADERS } from '@/core/common/constants';
import CoreApiError from '@/core/CoreApiError';
import { BaseApiResponse } from '@/entities/common/types';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

class CoreApi {
  protected readonly baseUrl: string;
  protected readonly supabase: SupabaseClient;

  constructor() {
    this.baseUrl = BASE_API_URI;
    this.supabase = createSupabaseBrowserClient();
  }

  isError<T>(
    responseToAnalyze: BaseApiResponse<T>
  ): responseToAnalyze is CoreApiError {
    return responseToAnalyze instanceof CoreApiError;
  }

  async getAccessToken(): Promise<string | undefined> {
    const { data: session } = await this.supabase.auth.getSession();

    return session?.session?.access_token;
  }

  async get<T>(path: string): Promise<T | CoreApiError> {
    try {
      const accessToken = await this.getAccessToken();
      const headers = {
        ...DEFAULT_HEADERS,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      };

      const response = await fetch(`${this.baseUrl}${path}`, {
        headers,
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
  }

  async post<T, Body>(path: string, body: Body): Promise<T | CoreApiError> {
    try {
      const accessToken = await this.getAccessToken();
      const headers = {
        ...DEFAULT_HEADERS,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      };

      const response = await fetch(`${this.baseUrl}${path}`, {
        headers,
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
  }
}

export default CoreApi;
