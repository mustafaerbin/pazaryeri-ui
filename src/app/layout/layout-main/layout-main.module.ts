import {NgModule} from '@angular/core';
import {LayoutMainComponent} from './layout-main.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {HeaderModule} from '../header/header.module';

@NgModule({
  declarations: [
    LayoutMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    HeaderModule
  ]
})
export class LayoutMainModule {}
