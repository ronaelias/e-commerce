import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../product.model';
import { Router } from '@angular/router';
import { SearchService } from '../../../../search.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  filteredProducts$!: Observable<Product[]>;
  searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  favoriteProducts: Set<number> = new Set<number>();
  cartProducts: Set<number> = new Set<number>();
  userName: string | null = '';

  constructor(private productService: ProductService, private searchService: SearchService, private router: Router) {}

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