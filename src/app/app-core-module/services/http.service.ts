import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { GlobalVariable } from '../global-variable';
import { GuardService } from './guard.service';
// import { stringify } from 'querystring';

@Injectable()
export class HttpService {
  constructor( public gVariable: GlobalVariable,
    private httpClient: HttpClient,
    private gv: GlobalVariable,
    private guardSev: GuardService
  ) {}

  private httpError$ = new Subject<any>();
  readonly onHttpError$: Observable<any> = this.httpError$.asObservable();

  private setHeader(header: any, headerValue: any) {
    header = header.set('lang', this.gv.language.lanKey || 'en');

    if (headerValue) {
      for (const [key, value] of Object.entries(headerValue)) {
        header = header.set(key, value);
      }
    }

    return header;
  }

  private httpErrorHandler(error): any {
    switch (error.status) {
      case 304:
        const eTag = error.headers.get('Etag');
        if (eTag) {
          error.errorMessage = eTag.replace(/"/g, '');
        }
        break;
      case 401:
        error.errorMessage = 'User not authorized';
        this.guardSev.unauthorized();
        break;
      case 400:
        error.errorMessage = 'Unknown Error';
        break;
      case 500:
        error.errorMessage = 'System Error';
        break;
      default:
        break;
    }
    if (this.gv.platformBrowser) {
      console.log(error);
    }
    this.httpError$.next(error);
    return error;
  }

  public httpGet(
    apiUrl: any,
    sevConfig: any,
    path: string,
    body: any,
    headerValue: any
  ) {
    return new Promise((resolve, reject) => {
      if (this.gVariable.authentication && this.gVariable.authentication.sessionId) {
        headerValue.sessionId = this.gVariable.authentication.sessionId;
      }
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, headerValue);
      let apiPath: string;
      apiPath = apiUrl.PUBLIC;
      if (!this.gv.platformBrowser) {
        apiPath = apiUrl.PRIVATE;
      }
      const url = apiPath + sevConfig.ROUTE_PATH + path;
      return this.httpClient
        .get(url, { headers: httpHeaders })
        .toPromise()
        .then(response => {
          this.log(false, 'GET', url, body, 'Success', response);
          resolve(response);
        })
        .catch(error => {
          this.log(true, 'GET', url, body, error.status, error);
          reject(this.httpErrorHandler(error));
        });
    });
  }

  public httpPost(
    apiUrl: any,
    sevConfig: any,
    path: string,
    body: any,
    headerValue: any
  ) {
    return new Promise((resolve, reject) => {
      const reqBody: string = JSON.stringify(body);
      let header: HttpHeaders;
      if (this.gVariable.authentication && this.gVariable.authentication.sessionId) {
        headerValue.sessionId = this.gVariable.authentication.sessionId;
      }
      header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, headerValue);
      let apiPath = apiUrl.PUBLIC;
      if (!this.gv.platformBrowser) {
        apiPath = apiUrl.PRIVATE;
      }
      const url = apiPath + sevConfig.ROUTE_PATH + path;
      return this.httpClient
        .request('POST', url, { body: reqBody, headers: httpHeaders })
        .toPromise()
        .then(response => {
          this.log(false, 'POST', url, body, 'Success', response);
          resolve(response);
        })
        .catch(error => {
          this.log(true, 'POST', url, body, error.status, error);
          reject(this.httpErrorHandler(error));
        });
    });
  }

  public httpPut(
    apiUrl: any,
    sevConfig: any,
    path: string,
    body: any,
    headerValue: any
  ) {
    return new Promise((resolve, reject) => {
      const reqBody = JSON.stringify(body);
      if (this.gVariable.authentication && this.gVariable.authentication.sessionId) {
        headerValue.sessionId = this.gVariable.authentication.sessionId;
      }
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, headerValue);
      let apiPath = apiUrl.PUBLIC;
      if (!this.gv.platformBrowser) {
        apiPath = apiUrl.PRIVATE;
      }
      const url = apiPath + sevConfig.ROUTE_PATH + path;
      // console.log(url);
      return this.httpClient
        .request('PUT', url, { body: reqBody, headers: httpHeaders })
        .toPromise()
        .then(response => {
          this.log(false, 'PUT', url, body, 'Success', response);
          resolve(response);
        })
        .catch(error => {
          this.log(true, 'PUT', url, body, error.status, error);
          reject(this.httpErrorHandler(error));
        });
    });
  }

  public httpDelete(
    apiUrl: any,
    sevConfig: any,
    path: string,
    body: any,
    headerValue: any
  ) {
    return new Promise((resolve, reject) => {
      const reqBody = JSON.stringify(body);
      if (this.gVariable.authentication && this.gVariable.authentication.sessionId) {
        headerValue.sessionId = this.gVariable.authentication.sessionId;
      }
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, headerValue);
      let apiPath = apiUrl.PUBLIC;
      if (!this.gv.platformBrowser) {
        apiPath = apiUrl.PRIVATE;
      }
      const url = apiPath + sevConfig.ROUTE_PATH + path;
      // console.log(url);
      return this.httpClient
        .request('DELETE', url, { body: reqBody, headers: httpHeaders })
        .toPromise()
        .then(response => {
          this.log(false, 'DELETE', url, body, 'Success', response);
          resolve(response);
        })
        .catch(error => {
          this.log(true, 'DELETE', url, body, error.status, error);
          reject(this.httpErrorHandler(error));
        });
    });
  }

  public httpRestApiCall(
    method: string,
    url: string,
    body: any,
    headerValue: any
  ) {
    return new Promise((resolve, reject) => {
      const reqBody = JSON.stringify(body);
      if (this.gVariable.authentication && this.gVariable.authentication.sessionId) {
        headerValue.sessionId = this.gVariable.authentication.sessionId;
      }
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, headerValue);
      // console.log(apiUrl);
      return this.httpClient
        .request(method, url, { body: reqBody, headers: httpHeaders })
        .toPromise()
        .then(response => {
          this.log(false, method, url, body, 'Success', response);
          resolve(response);
        })
        .catch(error => {
          this.log(true, method, url, body, error.status, error);
          reject(this.httpErrorHandler(error));
        });
    });
  }

  private log(isError, method, url, body, status, json) {
    if (!this.gv.platformBrowser) {
      try {
        const log: any = {
          method,
          path: url,
          request: JSON.stringify(body || {}),
          status,
        };

        console.log(new Date());
        if (!isError) {
          log.response = JSON.stringify({});
          console.log(log);
        } else {
          log.error = JSON.stringify(json);
          console.log(log);
        }
      } catch (e) {
        console.log(new Date());
        console.log(e);
      }
    }
  }
}
