import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { iProduct } from '../../models/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../../../features/product-listing/services/product.service';
import { SearchService } from '../../../features/services/search.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: iProduct | undefined;
  //@Input() filterAndSortComponent!: FilterAndSortComponent;
  // products$!: Observable<iProduct[]>;
  // filteredProducts$!: Observable<iProduct[]>;
  // searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  favoriteProducts: Set<number> = new Set<number>();
  cartProducts: Set<number> = new Set<number>();
  // userName: string | null = '';

  constructor(
    private productService: ProductService, 
    private searchService: SearchService,
    private router: Router
  ) {}
    
  ngOnInit() {
    // this.products$ = this.productService.getAllProducts();

    // Subscribe to products and set them in search service
    // this.products$.subscribe(products => {
    //   this.searchService.setProducts(products);
    // });

    // Combine searchQuery$ with the product list
    // this.filteredProducts$ = this.searchQuery$.pipe(
    //   switchMap(query => this.searchService.searchProducts(query))
    // );

    // Initial setup for userName
    // this.userName = localStorage.getItem('name');

    // this.filteredProducts$ = this.filterAndSortComponent.filterProducts();
  }

  // onSearchQueryChange(query: string) {
  //   this.searchQuery$.next(query);
  // }

  viewProductDetail(productId: number) {
    this.router.navigate([`/product-detail-card/${productId}`]);
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

  trackByProductId(index: number, product: iProduct): number {
    return product.id;
  }
}
