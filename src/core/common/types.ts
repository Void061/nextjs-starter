export interface IApiError {
  fault: IApiErrorFault;
}

interface IApiErrorFault {
  message: string;
  status: number;
}
