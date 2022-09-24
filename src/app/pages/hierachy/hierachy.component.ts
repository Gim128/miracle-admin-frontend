import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientApiService} from '../../api-services';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-hierachy',
    // moduleId: module.id,
    templateUrl: 'hierachy.component.html',
    styleUrls: ['./hierachy.component.scss']
})

export class HierachyComponent implements OnInit {
    public productForm: FormGroup;
    public submitted = false;
    loading: boolean = false;
    file: File = null;

    constructor(
      private clientApiSev: ClientApiService) {}

    ngOnInit() {
     //
    }

}
