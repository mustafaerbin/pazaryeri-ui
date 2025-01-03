import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {

  handlers: { [key: string]: DetachedRouteHandle } = {};

  private static getKey(route: ActivatedRouteSnapshot) {
    if (!!route.data['id']) {
      return this.findCompKey(route);
    }
    return null;
  }

  private static findCompKey(route: ActivatedRouteSnapshot) {
    let key = route.data['id'];
    if (!route.component || !route.routeConfig) {
      key = null;
    }
    if (!route.parent) {
      if (!!key) {
        return key;
      }
      return null;
    }
    let retkey = this.findCompKey(route.parent);
    if (!!retkey) {
      if (!!key) {
        retkey = retkey + '_' + key;
      }
    } else {
      retkey = key;
    }
    return retkey;
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const key = CustomReuseStrategy.getKey(route);
    return !!(route.data['reuse'] && !!key) && !!route.component;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const key = CustomReuseStrategy.getKey(route);
    if (route.data['reuse'] && !!key) {
      this.handlers[key] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = CustomReuseStrategy.getKey(route);
    return !!(route.data['reuse'] && !!key && !!this.handlers[key]);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if(!route.component) { // @ts-ignore
      return null;
    }

    const key = CustomReuseStrategy.getKey(route);
    if (!!key) {
      return this.handlers[key];
    }
    // @ts-ignore
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const sameRouteConfig = future.routeConfig === curr.routeConfig;
    if (sameRouteConfig && future.routeConfig && !this.hasChild(future)) {
      // https://github.com/angular/angular/issues/20993
      return !!future.data['reuse'];
    }
    return sameRouteConfig;
  }

  private hasChild(route: ActivatedRouteSnapshot) {
    return route.children.length > 0;
  }
}
