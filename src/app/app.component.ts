import { Component } from '@angular/core';
import {GlobalVariable} from './app-core-module/global-variable';
import {ToastrService} from 'ngx-toastr';
import {HttpService} from './app-core-module/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private httpSev: HttpService, private toastr: ToastrService, private gv: GlobalVariable) {
    this.httpSev.onHttpError$.subscribe((data: any) => {
      // console.log(data);
      if (this.gv.platformBrowser) {
        this.toastr.error(data.errorMessage || 'Error', '', {});
        if (data.status === 401) {
          // this.guardSev.unauthorized();
        }
      }
    });
  }
}
