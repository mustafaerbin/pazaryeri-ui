import {Observable} from "rxjs";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import {Injectable} from "@angular/core";
import {InitService} from "./init-service";
import {AbstractResolve} from "./abstract-resolve";
import {AppStore} from "../utils/app.store";

@Injectable()
export class InitDataResolve extends AbstractResolve  {

  constructor(private service: InitService,
              router: Router,
              appStore: AppStore) {

    super(appStore, router);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    //return this.resolveAction(this.service.get(route.data['init']));
    return null
  }
}
