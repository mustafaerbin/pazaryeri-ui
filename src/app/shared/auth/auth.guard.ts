import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {Observable, of as observableOf} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, map} from 'rxjs/operators';
import {AppStore} from '../utils/app.store';
import {HttpStatus} from '../utils/constants';

@Injectable()
export class AuthGuard  {

  constructor(public auth: AuthService,
              public router: Router,
              private appStore: AppStore) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.auth.checkSession().pipe(map(res => {
      if(res.status === HttpStatus.OK) {

      } else {
        window.location.href = "/auth/login?expired";
        return observableOf(false);
      }
    }),
    catchError(err => {
      window.location.href = "/auth/login?expired";
      return observableOf(false);
    }));

    if (next.data.authLink) {

      if (this.appStore.yetkiMap.has(next.data.authLink)) {
        if (!this.appStore.yetkiMap.get(next.data.authLink)) {
          this.router.navigate(['401']);
        }
        return true;
      }

      return this.auth.isAuthenticated(next.data.authLink).pipe(
        map(res => {
          if (res.status === HttpStatus.OK) {
            this.appStore.yetkiMap.set(next.data.authLink, res.data);
            return res.data;
          } else if (res.status === HttpStatus.UNAUTHORIZED) {
            this.router.navigate(['401']);
            return observableOf(false);
          } else if (res.status === HttpStatus.ACCESS_DENIED) {
            this.router.navigate(['403']);
          } else{
            return observableOf(false);
          }
        }),
        catchError(err => {
          return observableOf(false);
        })
      );
    }
    return false;
  }
}
