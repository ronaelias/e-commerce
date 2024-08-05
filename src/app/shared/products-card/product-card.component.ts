import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Product } from '../../product.model';
import { Router } from '@angular/router';
import { ProductService } from '../../features/product-listing/services/product.service';
import { SearchService } from '../../search.service';
import { FilterAndSortComponent } from '../../features/filter-and-sort/filter-and-sort.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
 // @Input() products: Product[] = [];
  products$!: Observable<Product[]>;
  filteredProducts$!: Observable<Product[]>;
  searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  favoriteProducts: Set<number> = new Set<number>();
  cartProducts: Set<number> = new Set<number>();
  userName: string | null = '';

  constructor(private productService: ProductService, private searchService: SearchService,
     private router: Router, private filterAndSortComponent: FilterAndSortComponent) {}

  ngOnInit() {
    this.products$ = this.productService.getAllProducts();
    this.filteredProducts$ = this.searchQuery$.pipe(
      switchMap(query => this.searchService.searchProducts(query))
    );

    this.products$.subscribe(products => {
      this.searchService.setProducts(products);
    });

    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery$.next(query);
    });

    this.userName = localStorage.getItem('name');
    this.filteredProducts$ = this.filterAndSortComponent.filterProducts('');
  }

  viewProductDetail(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }

  toggleFavorite(productId: number) {
    if (this.favoriteProducts.has(productId)) {
      this.favoriteProducts.delete(productId);
    } else {
      this.favoriteProducts.add(productId);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.has(productId);
  }

  toggleCart(productId: number) {
    if (this.cartProducts.has(productId)) {
      this.cartProducts.delete(productId);
    } else {
      this.cartProducts.add(productId);
    }
  }

  isInCart(productId: number): boolean {
    return this.cartProducts.has(productId);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
  
}