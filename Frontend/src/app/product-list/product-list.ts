import { Component } from '@angular/core';
import { ProductService } from '../product-service';
import { ProductType } from '../models/product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products: ProductType[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data: ProductType[]) => {
      this.products = data;
    });
  }
}
