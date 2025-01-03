import { NgModule } from '@angular/core';
import { HedefSorgulaComponent } from './component/sorgula/hedef-sorgula.component';
import { SharedModule } from '../../../shared/shared.module';
import { HedefRoutingModule } from './hedef-routing.module';
import { HedefService } from './service/hedef.service';
import { HedefStore } from './service/hedef.store';
import { HedefResolve } from './service/hedef.resolve';
import { HedefTanimlaComponent } from './component/tanimla/hedef-tanimla.component';
import { HedefGuncelleComponent } from './component/guncelle/hedef-guncelle.component';
import { HedefGoruntuleComponent } from './component/goruntule/hedef-goruntule.component';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  imports: [
    SharedModule,
    HedefRoutingModule,
    InputNumberModule
  ],
  declarations: [
    HedefSorgulaComponent,
    HedefTanimlaComponent,
    HedefGuncelleComponent,
    HedefGoruntuleComponent
  ],
  providers: [
    HedefService,
    HedefStore,
    HedefResolve
  ],
})

export class HedefModule {}
