import {AbstractComponent} from './abstract-component';
import {AppStore} from '../utils/app.store';

export abstract class AbstractTanimlaComponent extends AbstractComponent {

  constructor(appStore: AppStore) {
    super(appStore);
  }
}
