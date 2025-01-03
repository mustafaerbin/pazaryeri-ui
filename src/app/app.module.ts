import { APP_INITIALIZER, ErrorHandler, Injector, LOCALE_ID, NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { CustomReuseStrategy } from './shared/config/custom-reuse';
import { PageNotFoundComponent } from './shared/components/page-not-found.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { AuthService } from './shared/auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { AppStore } from './shared/utils/app.store';
import { AppRoutingModule } from './app-routing.module';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import localeTR from '@angular/common/locales/tr';
import { UnauthorizedAccessComponent } from './shared/components/unauthorized-access.component';
import { CustomHttpInterceptorService } from './shared/config/custom-http-inteceptor.service';
import { LoginPageComponent } from './login/login-page.component';
import { WebpackTranslateLoader } from './shared/config/webpack-translate-loader';
import { translateInitializerFactory } from './shared/config/translate-initializer-factory';
import { ErrorModule } from './error/error.module';
import { customErrorHandlerInitializerFactory } from './error/service/custom-error-handler-initializer-factory';
import { ErrorService } from './error/service/error.service';
import { LayoutModule } from './layout/layout.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { LegaSearchModule } from './layout/header/lega-search/lega-search.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ForbiddenComponent } from './shared/components/forbidden.component';
import { ServerErrorComponent } from './shared/components/server-error.component';
import { appAuthInitializerFactory } from './shared/config/app-auth-initializer-factory';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule } from 'angular-oauth2-oidc';

registerLocaleData(localeTR);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/tr/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    UnauthorizedAccessComponent,
    ForbiddenComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MessagesModule,
    SharedModule,
    ErrorModule,
    LayoutModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    LegaSearchModule,
    ProgressSpinnerModule,
    NgIdleKeepaliveModule.forRoot(),
    NgOptimizedImage
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: translateInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appAuthInitializerFactory,
      deps: [AuthService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    { provide: LOCALE_ID, useValue: 'tr' },
    { provide: ErrorHandler, useFactory: customErrorHandlerInitializerFactory, deps: [ErrorService] },
    MessageService,
    ConfirmationService,
    Title,
    AuthGuard,
    AuthService,
    AppStore
  ], bootstrap: [AppComponent]
})
export class AppModule {
}
