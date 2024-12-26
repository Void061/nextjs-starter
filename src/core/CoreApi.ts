import { BASE_API_URI } from '@/core/common/constants';
import CoreApiError from '@/core/CoreApiError';
import { BaseApiResponse } from '@/entities/common/types';

class CoreApi {
  protected readonly baseUrl: string;

  constructor() {
    this.baseUrl = BASE_API_URI;
  }

  isError<T>(
    responseToAnalyze: BaseApiResponse<T>
  ): responseToAnalyze is CoreApiError {
    return responseToAnalyze instanceof CoreApiError;
  }

  async get<T>(path: string): Promise<T | CoreApiError> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        headers: { 'Content-Type': 'application/json' },
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
      const response = await fetch(`${this.baseUrl}${path}`, {
        headers: {
          'Content-Type': 'application/json',
        },
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
