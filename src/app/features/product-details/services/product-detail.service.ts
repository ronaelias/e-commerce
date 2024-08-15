import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iProduct } from '../../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<iProduct[]> {
    return this.http.get<iProduct[]>(this.apiUrl);
  }
  
  getProductById(id: number): Observable<iProduct> {
    return this.http.get<iProduct>(`${this.apiUrl}/${id}`);
  }
}
