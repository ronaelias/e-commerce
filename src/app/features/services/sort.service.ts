import { Injectable } from '@angular/core';
import { iProduct } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private apiUrl = environment.apiUrl;
  private productsUrl = `${this.apiUrl}/product`;

  constructor() {}

  sortByTitleAsc(): Observable<iProduct[]> {
    return from(
      fetch(`${this.productsUrl}?sort=asc`)
        .then(res => res.json())
    );
  }

  sortByTitleDesc(): Observable<iProduct[]> {
    return from(
      fetch(`${this.productsUrl}?sort=desc`)
        .then(res => res.json())
    );
  }

  sortByPriceAsc(): Observable<iProduct[]> {
    return from(
      fetch(`${this.productsUrl}?sort=price-asc`)
        .then(res => res.json())
    );
  }

  sortByPriceDesc(): Observable<iProduct[]> {
    return from(
      fetch(`${this.productsUrl}?sort=price-desc`)
        .then(res => res.json())
    );
  }
}
