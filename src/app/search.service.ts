import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { Product } from './product.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // res$ = new Subject<Product[]>();

  // constructor(private $http: HttpClient) { }

  // doSearch(q: string) {
  //   return this.$http
  //   .get<Product[]>('https://fakestoreapi.com/products')
  //   .pipe(
  //     map(items =>
  //       items.filter(
  //       item => item.title.toLowerCase().indexOf
  //       (q.toLowerCase()) !== -1
  //     )
  //   )
  // );
  // }


  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.fetchProducts().pipe(
      map(products => products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase())))
    );
  }
 

}
