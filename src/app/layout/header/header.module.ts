import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {SharedModule} from '../../shared/shared.module';
import {LayoutInfoPanelService} from './info-panel/service/layout-info-panel.service';
import {LayoutToolbarService} from './toolbar-panel/service/layout-toolbar.service';
import {AvatarModule} from 'primeng/avatar';
import {BadgeModule} from 'primeng/badge';
import {SupervisorModeComponent} from './supervisor-mode/supervisor-mode.component';
import {ToolbarPanelModule} from './toolbar-panel/toolbar-panel.module';
import {InfoPanelModule} from './info-panel/info-panel.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SupervisorModeComponent,
  ],
  imports: [
    ToolbarPanelModule,
    InfoPanelModule,
    SharedModule,
    BadgeModule,
    AvatarModule,
  ],
  providers: [
    LayoutInfoPanelService,
    LayoutToolbarService,
  ],
  exports: [
    HeaderComponent,
    SupervisorModeComponent,
  ]
})
export class HeaderModule {

}
