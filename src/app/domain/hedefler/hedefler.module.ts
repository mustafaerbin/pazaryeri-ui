import { NgModule } from '@angular/core';
import { HedeflerRoutingModule } from './hedefler-routing.module';
import { HedeflerComponent } from './component/hedefler.component';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AmacHedefComponent } from './component/amac-hedef/amac-hedef.component';
import { FaaliyetComponent } from './component/faaliyet/faaliyet.component';
import { IsBirlikComponent } from './component/is-birlik/is-birlik.component';
import { HedefOranComponent } from './component/hedef-oran/hedef-oran.component';
import { BoyutKumeComponent } from './component/boyut-kume/boyut-kume.component';
import { KaynakComponent } from './component/kaynak/kaynak.component';
import { RiskComponent } from './component/risk/risk.component';
import { OzetComponent } from './component/ozet/ozet.component';
import { HedefTarihceComponent } from './component/hedef-tarihce/hedef-tarihce.component';
import { DosyaComponent } from './component/dosya/dosya.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HedeflerRoutingModule,
    AmacHedefComponent,
    FaaliyetComponent,
    IsBirlikComponent,
    HedefOranComponent,
    BoyutKumeComponent,
    KaynakComponent,
    RiskComponent,
    OzetComponent,
    HedefTarihceComponent,
    DosyaComponent
  ],
  declarations: [
    HedeflerComponent
  ],
  providers: [
    DatePipe
  ]
})
export class HedeflerModule {

}
