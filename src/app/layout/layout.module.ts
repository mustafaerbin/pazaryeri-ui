import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutMainModule } from './layout-main/layout-main.module';
import { HeaderModule } from './header/header.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [],
  imports: [
    LayoutMainModule,
    CommonModule,
    HeaderModule,
    LayoutRoutingModule,
    MenuModule
  ]
})
export class LayoutModule {
}
