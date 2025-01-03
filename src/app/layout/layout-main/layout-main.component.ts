import {Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {LayoutMainService} from './layout-main.service';
import {AbstractBaseComponent} from '../../shared/components/abstract-base-component';
import {AppStore} from '../../shared/utils/app.store';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutMainComponent extends AbstractBaseComponent implements OnInit {

  constructor(appStore: AppStore,
              public layoutMainService: LayoutMainService,
              public renderer: Renderer2,
              public ngZone: NgZone) {
    super(appStore);
  }

  ngOnInit(): void {

  }

  routerActive(event: any) {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
      document.getElementById("mainContent").scrollTop = 0;
      }, 1000);
    });
  }
}
