import {Observable} from 'rxjs';
import {AbstractBaseComponent} from './abstract-base-component';
import {AppStore} from '../utils/app.store';

export abstract class AbstractComponent extends AbstractBaseComponent {

  constructor(appStore: AppStore) {
    super(appStore);
  }

  protected subscribeToValueChange(valueChanges: Observable<any>, func: Function) {
    valueChanges.subscribe((data: any) => {
      func.bind(this, data).call();
    });
  }

  protected startFN() {
    this.appStore.loading = false;
    this.appStore.clearMessage();
  }

  protected endFN() {
    if (this.appStore.waitingServices == undefined || this.appStore.waitingServices.length == 0) {
      this.appStore.loading = false;
    }
  }
}
