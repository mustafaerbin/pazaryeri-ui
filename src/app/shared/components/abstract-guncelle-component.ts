import {AbstractComponent} from './abstract-component';
import {AppStore} from '../utils/app.store';

export abstract class AbstractGuncelleComponent extends AbstractComponent {


  constructor(appStore: AppStore) {
    super(appStore);
  }
}
