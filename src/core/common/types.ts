export interface IApiError {
  fault: IApiErrorFault;
}

interface IApiErrorFault {
  message: string;
  status: number;
}

export interface IRequestHeaders {
  'Accept-language': string;
  Authorization?: string;
  'Content-Type': string;
}
