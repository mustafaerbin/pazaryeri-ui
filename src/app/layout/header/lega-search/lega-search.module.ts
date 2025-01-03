import {NgModule} from '@angular/core';
import {LegaSearchComponent} from './lega-search.component';
import {CommonModule} from '@angular/common';
import {LegaSearchService} from './lega-search.service';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {InputTextModule} from 'primeng/inputtext';
import { LegaSearchFormComponent } from './lega-search-form/lega-search-form.component';
import {TabViewModule} from 'primeng/tabview';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {StyleClassModule} from 'primeng/styleclass';

@NgModule({
  declarations: [
    LegaSearchComponent,
    LegaSearchFormComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    OverlayPanelModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    TabViewModule,
    SelectButtonModule,
    FormsModule,
    DropdownModule,
    StyleClassModule
  ],
  exports: [
    LegaSearchComponent
  ],
  providers: [
    LegaSearchService
  ]
})
export class LegaSearchModule {

}
