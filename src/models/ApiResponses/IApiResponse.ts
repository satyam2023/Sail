export interface IApiResponse<T> extends ApiResponse {
  data?: T;
  content?:T;
}

interface ApiResponse {
  isSuccess: boolean;
  errors?: IError;
}

export interface Error {
  timestamp: number;
  key: string;
  message: string;
}
export interface IError {
  error: Error;
}
