import {Injector} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {LOCATION_INITIALIZED} from "@angular/common";

export function translateInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      translate.use('tr').subscribe(() => {
      }, err => {
        console.error(`Problem with 'tr' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}
