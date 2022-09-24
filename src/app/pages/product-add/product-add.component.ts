import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientApiService} from '../../api-services';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-product-add',
    // moduleId: module.id,
    templateUrl: 'product-add.component.html',
    styleUrls: ['./product-add.component.scss']
})

export class ProductAddComponent implements OnInit {
    public productForm: FormGroup;
    public submitted = false;
    loading: boolean = false;
    file: File = null;

    constructor(
      private clientApiSev: ClientApiService, private toastr: ToastrService,
      private fb: FormBuilder
    ) {}

    ngOnInit() {
     this.initForm();
    }

  initForm() {
    this.productForm = this.fb.group({
      itemName: ['', Validators.required],
      qty: [''],
      sellingPrice: [''],
      stockStatus: [''],
      description: [''],
    });
  }

  onChange(event) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.clientApiSev.fileUpload(this.file).subscribe(
      (event: any) => {
        console.log(event);
        // console.log(event[0].original.Location);
        if (typeof (event) === 'object') {
          // this.shortLink = event.link;
          this.loading = false;
        }
      }
    );
  }

  onSubmit(form) {
    console.log(form.value);
    console.log(this.productForm.value);
    if (this.productForm.valid) {
      this.submitted = true;
      /*"imageByItemDTOS": [
        {
          "id": 0,
          "imageName": "string",
          "imagePath": "string",
          "imageType": "string"
        }
      ],*/
      this.clientApiSev
        .createProduct(form || {})
        .then((data: any) => {
          console.log(data);
          this.productForm.reset();
          this.toastr.success('Product Created Successfully', '', {});
          this.submitted = false;
        })
        .catch((error: any) => {
          console.log(error);
          console.log(error.error.message);
          this.submitted = false;
          this.toastr.error(error.error.message, '', {});
        });
    } else {
      this.validateAllFormFields(this.productForm);
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
