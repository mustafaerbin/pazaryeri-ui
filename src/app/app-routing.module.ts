import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login/login-page.component';
import { AuthDemoComponent } from './auth-demo/auth-demo.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path: 'login',
    component: LoginPageComponent,
    data: {
      id: 'login',
      newNode: true,
    },
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
  },
  {
    path: 'auth-demo',
    component: AuthDemoComponent,
    canActivate: [authGuard],
  },
  /*{
    path: 'auth-redirect',
    component: AuthRedirectComponent todo Mehmet Yıldırım 'ın branchine bu sınıf gönderilmemiş ondan dolayı comment'e alındı.
  },*/
  {path: '**', redirectTo: '/404'}
];

export const AppRoutingModule: ModuleWithProviders<any> = RouterModule.forRoot(routes,
  {useHash: true, onSameUrlNavigation: 'reload', paramsInheritanceStrategy: 'always',
    initialNavigation: 'enabledBlocking'});
