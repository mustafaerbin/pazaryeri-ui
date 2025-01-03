import {AuthService} from '../auth/auth.service';

export function appAuthInitializerFactory(authService: AuthService) : (() => Promise<void>) {

  return (): Promise<void> => {
    // return new Promise<void>((resolve) => {
    //   authService.checkSession().subscribe(data => {
    //     resolve();
    //   });
    // });
    return ;
  }
}
