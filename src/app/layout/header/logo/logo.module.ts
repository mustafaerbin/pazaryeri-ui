import {NgModule} from '@angular/core';
import {LogoComponent} from './logo.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    LogoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoComponent
  ]
})
export class LogoModule {

}
