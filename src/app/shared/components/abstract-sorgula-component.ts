import {AbstractComponent} from './abstract-component';
import {AppStore} from '../utils/app.store';
import {Col} from "./abstract-base-component";

export abstract class AbstractSorgulaComponent extends AbstractComponent {

  constructor(appStore: AppStore) {
    super(appStore);
  }

  public temizleAction() {
    this.appStore.clearMessage();
    this.temizle();
  }

  protected abstract temizle();

  static removeCol(cols: Col[], field: string){
    const index = cols.findIndex((data) => {
      return data.field === field;
    });
    if (index !== -1) {
      cols.splice(index,1);
    }
    return cols;
  }

  static removeOperations(opts, id: string){
    const index = opts.findIndex((data) => {
      return data.id === id;
    });
    if (index !== -1) {
      opts.splice(index,1);
    }
    return opts;
  }

}
