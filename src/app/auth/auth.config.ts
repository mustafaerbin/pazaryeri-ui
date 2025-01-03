import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8282',
  clientId: 'tedas-hrys-ui-ng',
  tokenEndpoint: 'http://localhost:8282/oauth2/token',
  redirectUri: window.location.origin + '/',
  responseType: 'code',
  oidc: true,
  strictDiscoveryDocumentValidation: true,
  useSilentRefresh: true,

  // TODO: dev only
  skipIssuerCheck: true,
  requireHttps: false,
  showDebugInformation: true
}