import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  setProducts(products: Product[]) {
    this.productsSubject.next(products);
  }

  fetchAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => {
        this.productsSubject.next(products);
        return products;
      })
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    return combineLatest([this.searchQuery$, this.products$]).pipe(
      map(([searchQuery, products]) => {
        if (searchQuery) {
          return products.filter(product => 
            product.title.toLowerCase().includes(searchQuery.toLowerCase()));
        } else {
          return products;
        }
      })
    );
  }
}

