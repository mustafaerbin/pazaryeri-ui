import {Component} from '@angular/core';
import {AbstractComponent} from './abstract-component';
import {AppStore} from '../utils/app.store';
import {Message} from 'primeng/api';

@Component({
  templateUrl: '../../../assets/pages/404.html',
})
export class PageNotFoundComponent extends AbstractComponent {
  message: Message;

  constructor(appStore: AppStore) {
    super(appStore);

    if (this.appStore._message) {
      this.message = this.appStore._message;
      this.appStore._message = '';
    }
  }
}
