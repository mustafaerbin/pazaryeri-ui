import {Observable, of as observableOf} from 'rxjs';
import {AppStore} from '../utils/app.store';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {CustomErrorHandler} from '../../error/custom-error-handler';
import {AppError} from '../../error/dto/app-error';
import {HttpStatus} from '../utils/constants';

export abstract class AbstractResolve {

  private appStore: AppStore;
  private router: Router;

  constructor(appStore: AppStore, router: Router) {
    this.appStore = appStore;
    this.router = router;
  }

  protected resolveAction(data: Observable<any>) {

    return data.pipe(
      map(res => {
        if (res.status === HttpStatus.OK) {
          return res.data;
        } else {
          return this.handleError(res.status, res.errorMessage);
        }
      }),
      catchError((error, caught) => {
        return this.handleError(HttpStatus.INTERNAL_SERVER_ERROR, 'Unhandled server error.');
      })
    );
  }

  private handleError(status: number, message: string): Observable<any> {
    CustomErrorHandler.handleError(AppError.new(status, message));
    this.appStore.addMessage({severity: 'error', summary: '', detail: message}, false);
    this.appStore.loading = false;
    return observableOf(null);
  }

}
