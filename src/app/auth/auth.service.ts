import { Injectable } from '@angular/core';
import { authConfig } from './auth.config';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oauthService: OAuthService, private router: Router) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.oauthService.setupAutomaticSilentRefresh();
      } else {
        this.oauthService.initLoginFlow();
      }
    });

    // Handle token expiration and redirect to login page
    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_expires') {
        this.handleTokenExpiry();
      }
    });

    // Handle errors
    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_error' || event.type === 'session_terminated') {
        this.handleSessionError();
      }
    });
  }

  private handleTokenExpiry() {
    this.oauthService.silentRefresh().catch(error => {
      this.oauthService.initLoginFlow();
    });
  }

  private handleSessionError() {
    this.oauthService.logOut();
    this.router.navigate(['/login']);
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  public get identityClaims() {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  public get accessToken() {
    return this.oauthService.getAccessToken();
  }
}
