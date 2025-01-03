import {NgModule} from '@angular/core';
import {MenuComponent} from './menu.component';
import {MenuService} from './menu.service';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {SkeletonModule} from 'primeng/skeleton';
import {MenuBookmarkModule} from './menu-bookmark/menu.bookmark.module';
import {MenuPageSearchModule} from './menu-page-search/menu-page-search.module';

@NgModule({
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    MenuBookmarkModule,
    MenuPageSearchModule,
    CommonModule,
    TranslateModule,
    RouterModule,
    SharedModule,
    SkeletonModule
  ],
  providers: [
    MenuService
  ]
})
export class MenuModule {

}
