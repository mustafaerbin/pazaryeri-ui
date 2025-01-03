import { RouterModule, Routes } from '@angular/router';
import { HedefSorgulaComponent } from './component/sorgula/hedef-sorgula.component';
import { NgModule } from '@angular/core';
import { HedefTanimlaComponent } from './component/tanimla/hedef-tanimla.component';
import { HedefResolve } from './service/hedef.resolve';
import { HedefGuncelleComponent } from './component/guncelle/hedef-guncelle.component';
import { HedefGoruntuleComponent } from './component/goruntule/hedef-goruntule.component';

const routes: Routes = [
  {
    path: '',
    component: HedefSorgulaComponent,
    data: {
      id: 'hedef_sorgula',
      title: 'Hedef Sorgula',
    }
  },
  {
    path: 'tanimla',
    component: HedefTanimlaComponent,
    data: {
      id: 'hedef_tanimla',
      title: 'Hedef Tanımla',
    }
  },
  {
    path: ':id/goruntule',
    component: HedefGoruntuleComponent,
    data: {
      id: 'hedef_goruntule',
      title: 'Hedef Görüntüle',
    },
    resolve: {
      entity: HedefResolve
    }
  },
  {
    path: ':id/guncelle',
    component: HedefGuncelleComponent,
    data: {
      id: 'hedef_guncelle',
      title: 'Hedef Güncelle',
    },
    resolve: {
      entity: HedefResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HedefRoutingModule {}
