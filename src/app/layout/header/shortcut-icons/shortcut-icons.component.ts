import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {LayoutToolbarDto} from '../toolbar-panel/dto/layout-toolbar-dto';
import {AbstractBaseComponent} from '../../../shared/components/abstract-base-component';
import {AppStore} from '../../../shared/utils/app.store';
import {NavigationStart, Router} from '@angular/router';
import {OverlayPanel} from 'primeng/overlaypanel';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-shortcut-icons',
  templateUrl: './shortcut-icons.component.html',
  styleUrls: ['./shortcut-icons.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ShortcutIconsComponent extends AbstractBaseComponent implements OnInit {

  @Input('toolbarData') toolbarData: LayoutToolbarDto;

  @ViewChild('shortcutHamburgerMenuOverlay') menuOverlay: OverlayPanel;

  loading: boolean = false;

  constructor(appStore: AppStore,
              private router: Router) {
    super(appStore);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      this.menuOverlay.hide();
    });

    //this.loading = true;
    this.appStore.initYetkiMulti(
      [], () => {
        this.loading = false;
      });

  }

  navigate(url: string) {
    this.router.navigate([url], {
      state: {
        freshRoute: true
      }
    });
  }
}
