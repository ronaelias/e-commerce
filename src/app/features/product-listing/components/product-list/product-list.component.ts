import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { defaultIfEmpty, switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { iProduct } from '../../../../shared/models/product.model';
import { Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { SortService } from '../../../services/sort.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  products$!: Observable<iProduct[]>;
  filteredProducts$!: Observable<iProduct[]>;
  searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  favoriteProducts: Set<number> = new Set<number>();
  cartProducts: Set<number> = new Set<number>();
  userName: string | null = '';
  sortedProducts: iProduct[] = [];
  products: iProduct[] = [];

  constructor(private productService: ProductService, 
    private searchService: SearchService, 
    private sortService: SortService, private router: Router) {}

  ngOnInit() {
    this.products$ = this.productService.getAllProducts();
    this.filteredProducts$ = this.searchQuery$.pipe(
      switchMap(query => this.searchService.searchProducts(query)),
      defaultIfEmpty([])
    );

    this.products$.subscribe(products => {
      this.searchService.setProducts(products);
    });

    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery$.next(query);
    });

    this.userName = localStorage.getItem('name');
    this.fetchProducts();
  }

  trackByProductId(index: number, product: iProduct): number {
    return product.id;
  }
 

  showSort = false;

  toggleSort() {
    this.showSort = !this.showSort;
  }

  // fetchProducts() {
  //   this.products$ = this.productService.getAllProducts();
  //   this.products$.subscribe(products => {
  //     this.searchService.setProducts(products);
  //   });
  // }
  fetchProducts() {
    this.products$.subscribe(products => {
      this.searchService.setProducts(products);
    });
  }
  @Output() sortOptionChanged = new EventEmitter<string>();

  sort(option: string) {
    this.sortOptionChanged.emit(option);
  }

  sortProducts(option: string) {
    switch(option) {
      case 'asc':
        this.sortService.sortByTitleAsc().subscribe(sortedProducts => {
          this.filteredProducts$ = new Observable(observer => observer.next(sortedProducts));
        });
        break;
      case 'desc':
        this.sortService.sortByTitleDesc().subscribe(sortedProducts => {
          this.filteredProducts$ = new Observable(observer => observer.next(sortedProducts));
        });
        break;
      case 'price-asc':
        this.sortService.sortByPriceAsc().subscribe(sortedProducts => {
          this.filteredProducts$ = new Observable(observer => observer.next(sortedProducts));
        });
        break;
      case 'price-desc':
        this.sortService.sortByPriceDesc().subscribe(sortedProducts => {
          this.filteredProducts$ = new Observable(observer => observer.next(sortedProducts));
        });
        break;
    }
  }
  
}
