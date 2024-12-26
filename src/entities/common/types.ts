import CoreApiError from '@/core/CoreApiError';

export type BaseApiResponse<T> = T | CoreApiError;
