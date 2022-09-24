import { Injectable } from '@angular/core';
@Injectable()
export class GlobalVariable {

  private LANGUAGE: any = {};
  private PLATFORM_BROWSER: boolean;
  private WEB_APP_CONFIG: any = {};
  private AUTHORIZED = false;
  private AUTHENTICATION: any = {};
  private GOOGLE_OAUTH: any = {};

  get platformBrowser(): boolean {
    return this.PLATFORM_BROWSER;
  }
  set platformBrowser(value: boolean) {
    this.PLATFORM_BROWSER = value;
  }

  get language(): any {
    return this.LANGUAGE;
  }
  set language(value: any) {
    this.LANGUAGE = value;
  }

  get webAppConfig(): any {
    return this.WEB_APP_CONFIG;
  }
  set webAppConfig(value: any) {
    this.WEB_APP_CONFIG = value;
  }

  get authorized(): boolean {
    return this.AUTHORIZED;
  }
  set authorized(value: boolean) {
    this.AUTHORIZED = value;
  }

  get authentication(): any {
    return this.AUTHENTICATION;
  }
  set authentication(value: any) {
    this.AUTHENTICATION = value;
  }

  get googleOAuth(): any {
    return this.GOOGLE_OAUTH;
  }
  set googleOAuth(value: any) {
    this.GOOGLE_OAUTH = value;
  }
}
