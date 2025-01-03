import {Component} from '@angular/core';
import {AbstractComponent} from "./abstract-component";
import {AppStore} from "../utils/app.store";
import { CardModule } from 'primeng/card';
import { SharedModule } from '../shared.module';

@Component({
  template: `
    <p-card [title]="'label.sayfa.yapim.asamasinda' | translate">
      {{ 'label.sayfa.yapim.asamasinda' | translate }}
    </p-card>`,
  imports: [
    CardModule,
    SharedModule
  ],
  standalone: true
})
export class UnderConstructionComponent extends AbstractComponent {
  constructor(appStore: AppStore) {
    super(appStore);
  }
}
