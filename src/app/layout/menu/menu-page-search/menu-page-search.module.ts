import {NgModule} from '@angular/core';
import {MenuPageSearchComponent} from './menu-page-search.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    MenuPageSearchComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    MenuPageSearchComponent
  ]
})
export class MenuPageSearchModule {

}
