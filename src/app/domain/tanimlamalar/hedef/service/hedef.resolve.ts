import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import { AbstractResolve } from '../../../../shared/resolvers/abstract-resolve';
import { AppStore } from '../../../../shared/utils/app.store';
import { Hedef } from '../dto/hedef';
import { HedefService } from './hedef.service';



@Injectable()
export class HedefResolve extends AbstractResolve  {

  constructor(private service: HedefService,
              router: Router,
              appStore: AppStore) {
    super(appStore, router);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Hedef> {
    return this.resolveAction(this.service.get(route.paramMap.get('id')));
  }
}
