import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AbstractBaseComponent} from "../../../shared/components/abstract-base-component";
import {AppStore} from "../../../shared/utils/app.store";

@Component({
  selector: 'app-supervisor-mode',
  templateUrl: './supervisor-mode.component.html',
  styleUrls: ['./supervisor-mode.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SupervisorModeComponent extends AbstractBaseComponent{

  @Input() isSupervised: boolean;

  constructor(appStore: AppStore) {
    super(appStore);
  }
}
