import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductType } from './models/product';

const baseURL = 'http://backend-dev.us-east-1.elasticbeanstalk.com/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(baseURL);
  }
}
