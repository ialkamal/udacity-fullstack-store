import { Component, Input } from '@angular/core';
import { ProductType } from '../models/product';



@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  @Input() product: ProductType = { id: '', name: '', price: '', category: '' };
}
