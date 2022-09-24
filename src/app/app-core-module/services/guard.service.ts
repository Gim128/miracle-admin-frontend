import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { LocalStorageService } from './local-storage.service';
import { Observable, Subject } from 'rxjs';
// import {SocialLoginService} from './social-login.service';
import { GlobalVariable } from '../global-variable';
import { StaticConfig } from '../../app-static-config';

@Injectable()
export class GuardService implements CanActivate {
  private subject = new Subject<any>();
  readonly onAccountAuthorized$: Observable<any> = this.subject.asObservable();

  constructor(
    private router: Router,
    // private socialLoginSev: SocialLoginService,
    private gv: GlobalVariable,
    private storage: LocalStorageService
  ) {
    this.SetAuthentication();
  }

  public SetAuthentication() {
    try {
      if (this.gv.platformBrowser) {
        const authentication = this.storage.get('_auth_client_mira');
        this.gv.authentication = authentication || {};
        this.gv.authorized = authentication.authorized || false;
        this.subject.next(authentication);
      }
    } catch (e) {
      this.gv.authorized = false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    /*if (this.gv.authorized) {
      return true;
    } else {
      this.unauthorized();
      return false;
    }*/
    const currentUser = this.gv.authentication.user;
    const role = route.data['role'];
    if (currentUser) {
      if (role && role.indexOf(currentUser.role) > -1) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public authorized(value: any) {
    value.authorized = true;
    if (this.gv.platformBrowser) {
      this.storage.set('_auth_client_mira', value);
    }
    this.SetAuthentication();
  }

  public unauthorized() {
    this.gv.authorized = false;
    if (this.gv.platformBrowser) {
      this.storage.remove('_auth_client_mira');
      /*switch (this.gv.authentication.oauthProvider) {
        case 'google':
          this.socialLoginSev.logoutGoogle();
          break;
        case 'facebook':
          this.socialLoginSev.logoutFacebook().then(() => {});
          break;
        default:
          break;
      }*/
      // TODO this.router.navigate(['/']).then(() => {});
    }
  }
}
