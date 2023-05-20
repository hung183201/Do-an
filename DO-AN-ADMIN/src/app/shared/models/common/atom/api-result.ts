export interface ApiResult<T> {
  data: T;
  isError: boolean;
  message: string;
  code: ApiCode,
}

export enum ApiCode {
  Success = 0,
  GeneralError = 100,
  InvalidArgument = 105,
  UnAuthorizedAccess = 401,
  BusinessError = 400,
  InternalError = 500,
  ValidationError = 600,
  Warning = 800
}
