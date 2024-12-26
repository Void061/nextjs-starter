import { IApiError } from '@/core/common/types';

class CoreApiError extends Error {
  public error: IApiError;

  constructor(error: IApiError) {
    super(error.fault.message);
    this.error = error;
  }
}

export default CoreApiError;
