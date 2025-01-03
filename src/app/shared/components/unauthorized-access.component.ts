import {Component} from '@angular/core';
import {AppStore} from '../utils/app.store';
import {AbstractComponent} from './abstract-component';
import {Message} from 'primeng/api';

@Component({
  templateUrl: '../../../assets/pages/401.html',
  selector: 'app-unauthorized-access'
})
export class UnauthorizedAccessComponent extends AbstractComponent {
  message: Message;

  constructor(appStore: AppStore) {
    super(appStore);

    if (this.appStore._message) {
      this.message = this.appStore._message;
      this.appStore._message = '';
    }
  }
}
