import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientApiService} from '../../api-services';

@Component({
    selector: 'app-products',
    moduleId: module.id,
    templateUrl: 'products.component.html',
    styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  constructor(private router: Router, private clientApiSev: ClientApiService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  addProduct() {
    this.router.navigate(['product-add']);
  }

  getAllProducts() {
    this.clientApiSev
      .getAllProducts()
      .then((data: any) => {
        console.log(data);
      })
      .catch((error: any) => {
        console.log(error);
        console.log(error.error.message);
      });
  }

}
