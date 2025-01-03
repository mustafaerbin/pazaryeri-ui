import {NgModule} from "@angular/core";
import {ShortcutIconsComponent} from "./shortcut-icons.component";
import {CommonModule} from "@angular/common";
import {BadgeModule} from "primeng/badge";
import {TooltipModule} from "primeng/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from '@angular/router';
import {OverlayPanelModule} from "primeng/overlaypanel";

@NgModule({
  declarations: [
    ShortcutIconsComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        BadgeModule,
        TooltipModule,
        TranslateModule,
        OverlayPanelModule
    ],
  exports: [
    ShortcutIconsComponent
  ]
})
export class ShotcutIconsModule {
}
