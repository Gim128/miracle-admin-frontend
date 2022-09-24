import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientApiService} from '../../api-services';
import {GuardService} from '../../app-core-module/services';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

export class LoginDto {
  email: string;
  password: string;

  constructor(formValue: RawFormValue) {
    this.email = formValue.email;
    this.password = formValue.password;
  }
}

export interface RawFormValue {
  email: string;
  password: string;
}

@Component({
    selector: 'app-login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public regForm: FormGroup;
  public submitted = false;

  public canvas: any;

  constructor(
    private clientApiSev: ClientApiService, private toastr: ToastrService, private router: Router,
    private guardSev: GuardService, private fb: FormBuilder
  ) {}

  ngOnInit() {
      this.initForm();
    }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  get LoginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit(form: FormGroup) {
    console.log('email', form.value.email);
    if (this.loginForm.valid) {
      const article = new LoginDto(this.loginForm.value as RawFormValue);
      console.log(article);
      console.log(article['LoginDto']);

      // Convert to JSON
      const jsonString = JSON.stringify(LoginDto);
      console.log('JSON string:', jsonString);

      this.submitted = true;
      this.clientApiSev
        .customerLogin(article || {})
        .then((data: any) => {
          console.log(data);
          this.submitted = false;
          this.guardSev.authorized(data || {});
          this.router.navigate(['dashboard']);
        })
        .catch((error: any) => {
          console.log(error);
          console.log(error.error.message);
          this.submitted = false;
          this.toastr.error(error.error.message, '', {});
        });
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
