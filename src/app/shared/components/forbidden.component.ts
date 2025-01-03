import {Component} from '@angular/core';
import {AbstractComponent} from './abstract-component';
import {AppStore} from '../utils/app.store';
import {Message} from 'primeng/api';

@Component({
  templateUrl: '../../../assets/pages/403.html',
  selector: 'app-forbidden'
})
export class ForbiddenComponent extends AbstractComponent {
  message: Message;

  constructor(appStore: AppStore) {
    super(appStore);

    if (this.appStore._message) {
      this.message = this.appStore._message;
      this.appStore._message = '';
    }
  }
}
