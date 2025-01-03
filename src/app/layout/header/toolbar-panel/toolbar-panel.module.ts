import {NgModule} from '@angular/core';
import {ToolbarPanelComponent} from './toolbar-panel.component';
import {LayoutToolbarService} from './service/layout-toolbar.service';
import {CommonModule} from '@angular/common';
import {LogoModule} from '../logo/logo.module';
import {AvatarModule} from 'primeng/avatar';
import {MenuModule} from 'primeng/menu';
import {LegaSearchModule} from '../lega-search/lega-search.module';
import {TranslateModule} from '@ngx-translate/core';
import {SkeletonModule} from 'primeng/skeleton';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {BadgeModule} from 'primeng/badge';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import {RippleModule} from 'primeng/ripple';
import {AngularDeviceInformationService} from 'angular-device-information';
import {DialogModule} from 'primeng/dialog';
import {MegaMenuModule} from 'primeng/megamenu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LayoutInfoPanelService } from '../info-panel/service/layout-info-panel.service';
import {SharedModule} from '../../../shared/shared.module';
import { SearchOptionSelectorComponent } from './search-option-selector/search-option-selector.component';
import {ShotcutIconsModule} from "../shortcut-icons/shotcut-icons.module";

@NgModule({
  declarations: [
    ToolbarPanelComponent,
    SearchOptionSelectorComponent
  ],
    imports: [
        LogoModule,
        OverlayPanelModule,
        BadgeModule,
        DropdownModule,
        LegaSearchModule,
        CommonModule,
        MenuModule,
        AvatarModule,
        TranslateModule,
        SkeletonModule,
        ButtonModule,
        StyleClassModule,
        RippleModule,
        DialogModule,
        MegaMenuModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ShotcutIconsModule
    ],
    exports: [
        ToolbarPanelComponent,
        SearchOptionSelectorComponent
    ],
  providers: [
    LayoutToolbarService,
    LayoutInfoPanelService,
    AngularDeviceInformationService
  ]
})
export class ToolbarPanelModule {
}
