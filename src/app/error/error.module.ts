import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ErrorComponent} from './component/error.component';
import {ErrorService} from './service/error.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ErrorComponent
  ],
  providers: [
    ErrorService
  ],
  exports: [
    ErrorComponent
  ]
})
export class ErrorModule {
}
