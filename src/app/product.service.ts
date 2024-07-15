import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl= 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }


  getAllProducts(): Observable<Product[]>{
    fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>console.log(json))
        return this.http.get<Product[]>(this.apiUrl);
  }
}
