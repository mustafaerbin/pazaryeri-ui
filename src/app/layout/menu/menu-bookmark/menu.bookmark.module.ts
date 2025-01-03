import {NgModule} from '@angular/core';
import {MenuBookmarkComponent} from './menu-bookmark.component';
import {CommonModule} from '@angular/common';
import {SkeletonModule} from 'primeng/skeleton';
import {MenuService} from '../menu.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    MenuBookmarkComponent
  ],
  imports: [
    CommonModule,
    SkeletonModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    MenuBookmarkComponent
  ],
  providers: [
    MenuService
  ]
})
export class MenuBookmarkModule {}
