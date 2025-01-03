import {ErrorService} from './error.service';
import {environment} from '../../../environments/environment';
import {CustomErrorHandler} from '../custom-error-handler';
import {ErrorHandler} from '@angular/core';

export function customErrorHandlerInitializerFactory(errorService: ErrorService) {
  return environment.production ? new CustomErrorHandler(errorService) : new ErrorHandler();
}
