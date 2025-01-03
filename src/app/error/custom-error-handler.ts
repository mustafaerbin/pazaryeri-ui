import {ErrorHandler} from '@angular/core';
import {ErrorService} from './service/error.service';
import {AppError} from './dto/app-error';
import {HttpStatus} from '../shared/utils/constants';

export class CustomErrorHandler implements ErrorHandler {

  private static errorService: ErrorService;

  constructor(private errorService: ErrorService) {
    CustomErrorHandler.errorService = errorService;
  }

  static handleError(error: AppError): void {
    if (!CustomErrorHandler.errorService) {
      return;
    }

    if (error.status !== HttpStatus.BAD_REQUEST && error.status !== HttpStatus.NO_DATA_FOUND) {
      CustomErrorHandler.errorService.addError(error);
    }
  }

  handleError(error: any) {
    CustomErrorHandler.handleError(AppError.cloneFromError(error));
  };
}
