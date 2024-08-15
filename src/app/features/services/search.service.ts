import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { iProduct } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  private productsSubject = new BehaviorSubject<iProduct[]>([]);
  products$ = this.productsSubject.asObservable();

  private filtersSubject = new BehaviorSubject<{ [key: string]: string[] }>({
    fabric: [],
    gender: [],
    color: [],
    style: [],
    type: []
  });
  filters$ = this.filtersSubject.asObservable();

  private apiUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  setProducts(products: iProduct[]) {
    this.productsSubject.next(products);
  }

  fetchAllProducts(): Observable<iProduct[]> {
    return this.http.get<iProduct[]>(this.apiUrl).pipe(
      map(products => {
        this.productsSubject.next(products);
        return products;
      })
    );
  }

  searchProducts(query: string): Observable<iProduct[]> {
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

  updateSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  updateFilters(filters: { [key: string]: string[] }): void {
    this.filtersSubject.next(filters);
  }

  getFilteredProducts(): Observable<iProduct[]> {
    return combineLatest([this.searchQuery$, this.products$, this.filters$]).pipe(
      map(([searchQuery, products, filters]) => {
        return products.filter(product => {
          const title = product.title.toLowerCase();
          const description = product.description.toLowerCase();

          const matchesFabric = filters['fabric'].length ? filters['fabric'].some(f => title.includes(f.toLowerCase())) : true;
          const matchesGender = filters['gender'].length ? filters['gender'].some(g => title.includes(g.toLowerCase())) : true;
          const matchesColor = filters['color'].length ? filters['color'].some(c => title.includes(c.toLowerCase())) : true;
          const matchesStyle = filters['style'].length ? filters['style'].some(s => title.includes(s.toLowerCase())) : true;
          const matchesType = filters['type'].length ? filters['type'].some(t => title.includes(t.toLowerCase())) : true;

          return matchesFabric && matchesGender && matchesColor && matchesStyle && matchesType;
        });
      })
    );
  }
}

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { iProduct } from '../../shared/models/product.model';
// import { environment } from '../../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class SearchService {
//   private searchQuerySubject = new BehaviorSubject<string>('');
//   searchQuery$ = this.searchQuerySubject.asObservable();

//   private productsSubject = new BehaviorSubject<iProduct[]>([]);
//   products$ = this.productsSubject.asObservable();

//   private filtersSubject = new BehaviorSubject<{ [key: string]: string[] }>({
//     fabric: [],
//     gender: [],
//     color: [],
//     style: [],
//     type: []
//   });
//   filters$ = this.filtersSubject.asObservable();

//   private apiUrl = environment.apiUrl + '/products';

//   constructor(private http: HttpClient) {}

//   setSearchQuery(query: string) {
//     this.searchQuerySubject.next(query);
//   }

//   setProducts(products: iProduct[]) {
//     this.productsSubject.next(products);
//   }

//   fetchAllProducts(): Observable<iProduct[]> {
//     return this.http.get<iProduct[]>(this.apiUrl).pipe(
//       map(products => {
//         this.productsSubject.next(products);
//         return products;
//       })
//     );
//   }

//     searchProducts(query: string): Observable<iProduct[]> {
//     return combineLatest([this.searchQuery$, this.products$]).pipe(
//       map(([searchQuery, products]) => {
//         if (searchQuery) {
//           return products.filter(product => 
//             product.title.toLowerCase().includes(searchQuery.toLowerCase()));
//         } else {
//           return products;
//         }
//       })
//     );
//   }

  

//   updateSearchQuery(query: string): void {
//     this.searchQuerySubject.next(query);
//   }

//   updateFilters(filters: { [key: string]: string[] }): void {
//     this.filtersSubject.next(filters);
//   }

//   getFilteredProducts(): Observable<iProduct[]> {
//     return this.http.get<iProduct[]>(`${this.apiUrl}/products`);
//   }

//   getFilteredProductsByCategory(category: string): Observable<iProduct[]> {
//     const url = `${this.apiUrl}/products?category=${category}`;
//     return this.http.get<iProduct[]>(url);
//   }
// }
