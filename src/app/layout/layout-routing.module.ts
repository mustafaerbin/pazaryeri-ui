import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutMainComponent} from './layout-main/layout-main.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../domain/domain.module').then(m => m.DomainModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
