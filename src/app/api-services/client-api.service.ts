import { Injectable } from '@angular/core';
import { GuardService, HttpService } from '../app-core-module/services';
import { ApiServiceConfig, StaticConfig } from '../app-static-config';
import { Subject, Observable } from 'rxjs';
import { GlobalVariable } from '../app-core-module/global-variable';
import {Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ClientApiService {
  private httpError$ = new Subject<any>();
  readonly onHttpError$: Observable<any> = this.httpError$.asObservable();

  constructor(
    private httpService: HttpService, private http: HttpClient,
    private gv: GlobalVariable,
    private guardSev: GuardService,
  ) {}

  private httpErrorHandler(error): any {
    // console.log(error);
    this.httpError$.next(error);
    return error;
  }

  public customerRegister(req: any) {
    const formattedReq = {
      // userName: req.value.userName || 0,

      first_name: req.value.firstName || '',
      last_name: req.value.lastName || '',
      email: req.value.email || '',
      phoneNumber: req.value.phoneNumber || '',
      // image: "string",
      // nic: "string",
      // dob: "2022-09-11T06:31:12.216Z",
      // mobile_phone: 0,
      // work_phone: 0,
      role: 'SuperAdmin',
      password: req.value.password || '',
      r_password: req.value.password,
      is_primary: true,
      // address: "string",
      // city: "string",
      // state: "string",
      // country: "string",
      // postal_code: "string",
      // company_name: "string",
      // company_website: "string",
      package_id: 0,
      // stripe_token: "string"
    };
    return new Promise((resolve, reject) =>
      this.httpService
        .httpPost(
          this.gv.webAppConfig.API_URL,
          ApiServiceConfig.CLIENT_API_SERVICE,
          '/user',
          formattedReq,
          {}
        )
        .then((data: any) => {
          console.log(data);
          console.log(data.status);
          if (data && data.status === 1) {
            console.log(data);
            resolve(data);
          } else {
            reject(this.httpErrorHandler(data));
          }
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        })
    );
  }

  public customerLogin(req: any) {
   /* const formattedReq = {
      email: req.value.email || 0,
      password: req.value.password || ''
    };*/
    return new Promise((resolve, reject) =>
      this.httpService
        .httpPost(
          this.gv.webAppConfig.API_URL,
          ApiServiceConfig.CLIENT_API_SERVICE,
          '/auth/login',
          req,
          {}
        )
        .then((data: any) => {
          console.log(data);
          if (data && data.access_token) {
            resolve(data);
          } else {
            reject(this.httpErrorHandler(data));
          }
        })
        .catch((error: any) => {
          console.log(error);
          console.log(error.status);
          reject(error);
        })
    );
  }

  public customerLogout() {
    return new Promise((resolve, reject) =>
      this.httpService
        .httpPut(
          this.gv.webAppConfig.API_URL,
          ApiServiceConfig.CLIENT_API_SERVICE,
          '/user/logout',
          '',
          {}
        )
        .then((data: any) => {
          if (data) {
            resolve(data);
          } else {
            reject('');
          }
        })
        .catch((error: any) => {
          reject(error);
        })
    );
  }

  public createProduct(req: any) {
    const formattedReq = {
      itemName: req.value.itemName || 0,
      qty: req.value.qty || 0,
      sellingPrice: req.value.sellingPrice || 0,
      stockStatus: req.value.stockStatus || 0,
    };
    return new Promise((resolve, reject) =>
      this.httpService
        .httpPost(
          this.gv.webAppConfig.API_URL,
          ApiServiceConfig.CLIENT_API_SERVICE,
          '/item/create',
          formattedReq,
          {}
        )
        .then((data: any) => {
          console.log(data);
          console.log(data.responseCode);
          if (data && data.responseCode === 500) {
            console.log(data);
            resolve(data);
          } else {
            reject(this.httpErrorHandler(data));
          }
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        })
    );
  }

  public getAllProducts() {
    return new Promise((resolve, reject) =>
      this.httpService
        .httpGet(
          this.gv.webAppConfig.API_URL,
          ApiServiceConfig.CLIENT_API_SERVICE,
          '/item/allItems',
          {},
          {}
        )
        .then((data: any) => {
          console.log(data);
          console.log(data.responseCode);
          if (data && data.responseCode === 500) {
            console.log(data);
            resolve(data);
          } else {
            reject(this.httpErrorHandler(data));
          }
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        })
    );
  }

  public createRole(req: any) {
    const formattedReq = {
      itemName: req.value.itemName || 0,
      qty: req.value.qty || 0,
      sellingPrice: req.value.sellingPrice || 0,
      stockStatus: req.value.stockStatus || 0,

      /*branchId: 0,
      compId: 0,
      createdAt: "2022-08-01T11:43:14.546Z",
      id: 0,
      rateForComision: 0,
      role: "string",
      status: 0,
      updatedAt: "2022-08-01T11:43:14.546Z",
      userName: "string"*/
    };
    return new Promise((resolve, reject) =>
      this.httpService
        .httpPost(
          this.gv.webAppConfig.API_URL,
          ApiServiceConfig.CLIENT_API_SERVICE,
          '/role/create',
          formattedReq,
          {}
        )
        .then((data: any) => {
          console.log(data);
          console.log(data.responseCode);
          if (data && data.responseCode === 200) {
            console.log(data);
            resolve(data);
          } else {
            reject(this.httpErrorHandler(data));
          }
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        })
    );
  }

  fileUpload(file): Observable<any> {
    const baseApiUrl = this.gv.webAppConfig.API_URL.PUBLIC + '/upload';
    // Returns an observable
    // Create form data
    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append('file', file, file.name);
    // Make http post request over api
    // with formData as req
    var headerValue: any = {};
    if (this.gv.authentication && this.gv.authentication.token) {
      headerValue.accessToken = 'BEARER ' + this.gv.authentication.token;
    }
    console.log(this.gv.authentication);
    const header = new HttpHeaders(); // .set('Content-Type', 'multipart/form-data');
    const httpHeaders = this.setHeader(header, headerValue);
    return this.http.post(baseApiUrl, formData, {headers: httpHeaders})
  }

  private setHeader(header: any, headerValue: any) {
    header = header.set('lang', this.gv.language.lanKey || 'en');

    if (headerValue) {
      for (const [key, value] of Object.entries(headerValue)) {
        header = header.set(key, value);
      }
    }

    return header;
  }
}
