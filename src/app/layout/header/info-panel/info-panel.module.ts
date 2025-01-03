import {NgModule} from '@angular/core';
import {InfoPanelComponent} from './info-panel.component';
import {SharedModule} from '../../../shared/shared.module';
import {CommonModule} from '@angular/common';
import {LayoutInfoPanelService} from './service/layout-info-panel.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    InfoPanelComponent
  ],
  providers: [
    LayoutInfoPanelService
  ],
  exports: [
    InfoPanelComponent
  ]
})
export class InfoPanelModule {

}
