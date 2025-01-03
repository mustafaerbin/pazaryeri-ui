import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppStore} from './shared/utils/app.store';
import {AbstractComponent} from './shared/components/abstract-component';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {ConfirmationService} from 'primeng/api';
import {Keepalive} from '@ng-idle/keepalive';
import {environment} from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    AuthService
  ]
})
export class AppComponent extends AbstractComponent implements OnInit {

  constructor(appStore: AppStore,
              private idle: Idle,
              private keepAlive: Keepalive,
              translate: TranslateService,
              private confirmationService: ConfirmationService,
              protected authService: AuthService) {
    super(appStore);
    translate.setDefaultLang('tr');
    translate.use('tr');
  }

  ngOnInit(): void {

    this.appStore.translate.addLangs(['tr']);
    this.appStore.translate.setDefaultLang('tr');
    this.appStore.translate.use('tr');
    this.appStore.init();


    if (environment.production) {
      this.keepAlive.interval(60);
     // this.keepAlive.request('');
      // this.keepAlive.onPing.subscribe(() => this.resumeSession.bind(this));

      this.idle.setIdle(60 * 6);
      this.idle.setTimeout(60);
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      this.idle.setKeepaliveEnabled(true);

      this.idle.onTimeoutWarning.subscribe(() => {
        this.confirmationService.confirm({
          header: this.appStore.translate.instant('label.oturum.idle.bilgilendirme.title'),
          icon: 'pi pi-exclamation-triangle',
          message: this.appStore.translate.instant('label.oturum.idle.bilgilendirme'),
          key: 'idleCd',
          accept: this.resumeSession.bind(this),
          reject: this.logout.bind(this)
        });
      });

      this.idle.onTimeout.subscribe(() => {
        this.logout();
      });

      this.idle.watch();
    }

  }

  public resumeSession() {
    /*this.subscribeToResponseBase(this.authService.checkSession(), (data) => {
      this.idle.watch();
    }, (err) => {
      window.location.href = '/logout';
    });*/
  }

  public logout() {
    window.location.href = '/logout';
  }

  protected startFN() {
    this.appStore.loading = false;
  }

  protected endFN() {
    this.appStore.loading = false;
  }
}
