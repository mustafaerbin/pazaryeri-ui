import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AbstractBaseComponent} from '../../shared/components/abstract-base-component';
import {AppStore} from '../../shared/utils/app.store';
import {LayoutInfoPanelService} from './info-panel/service/layout-info-panel.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent extends AbstractBaseComponent implements OnInit {


  constructor(appStore: AppStore,
              private infoPanelService: LayoutInfoPanelService) {
    super(appStore);
  }

  ngOnInit(): void {

  }

}
