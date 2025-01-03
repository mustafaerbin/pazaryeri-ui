import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DomainComponent} from './domain.component';
import {InitDataResolve} from '../shared/resolvers/init-data.resolve';
import {UnderConstructionComponent} from '../shared/components/under-construction.component';
import {BookmarkResolve} from '../shared/resolvers/bookmark.resolve';
import {UnauthorizedAccessComponent} from '../shared/components/unauthorized-access.component';
import {PageNotFoundComponent} from '../shared/components/page-not-found.component';
import {ServerErrorComponent} from '../shared/components/server-error.component';
import {ForbiddenComponent} from '../shared/components/forbidden.component';

const routes: Routes = [
  {
    path: '', component: DomainComponent,
    data: {
      id: 'domain_component',
      init: 'app/init',
    },
    resolve: {
      initValue: InitDataResolve,
      bookmarkData: BookmarkResolve,
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
        data: {
          messageBroadcastTimeout: 500
        }
      },
      {
        path: 'hedefler',
        loadChildren: () => import('./hedefler/hedefler.module').then(m => m.HedeflerModule),
        data: {
          messageBroadcastTimeout: 500
        }
      },
      {
        path: 'hedef',
        loadChildren: () => import('./tanimlamalar/hedef/hedef.module').then(m => m.HedefModule),
        data: {
          messageBroadcastTimeout: 500
        }
      },
      {
        path: 'under',
        component: UnderConstructionComponent,
        data: {
          id: 'ana_sayfa',
        }
      },
      {
        path: '401',
        component: UnauthorizedAccessComponent,
        data: {
          id: '401',
        }
      },
      {
        path: '403',
        component: ForbiddenComponent,
        data: {
          id: '403',
        }
      },
      {
        path: '404',
        component: PageNotFoundComponent,
        data: {
          id: '404',
        }
      },
      {
        path: '500',
        component: ServerErrorComponent,
        data: {
          id: '500',
        }
      }
    ]
  }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DomainRoutingModule {
}
