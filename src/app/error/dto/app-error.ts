import {HttpStatus} from '../../shared/utils/constants';

export class AppError extends Error {
  status: number;
  handled: boolean = false;

  static new(status: number, message: string): AppError {
    const instance = new AppError();
    instance.status = status;
    instance.message = message;
    return instance;
  }

  static cloneFromError(error: Error): AppError {
    const instance = AppError.new(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    instance.stack = error.stack;
    return instance;
  }
}
