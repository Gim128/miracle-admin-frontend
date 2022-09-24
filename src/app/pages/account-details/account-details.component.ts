import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-account-details',
    moduleId: module.id,
    templateUrl: 'account-details.component.html',
    styleUrls: ['./account-details.component.scss']
})

export class AccountDetailsComponent implements OnInit {

  public myForm: FormGroup;

    ngOnInit() {
      this.initForm();
    }

  initForm() {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      contact: new FormControl(''),
      message: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
  }
}
