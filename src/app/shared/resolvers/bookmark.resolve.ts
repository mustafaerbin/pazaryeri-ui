import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import {AppStore} from '../utils/app.store';
import {AbstractResolve} from './abstract-resolve';

@Injectable()
export class BookmarkResolve extends AbstractResolve  {

  constructor(private _appStore: AppStore,
              router: Router) {
    super(_appStore, router);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._appStore.getData('route');
  }
}
