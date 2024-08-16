import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { iProduct } from '../../models/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../../../features/services/product.service';
import { SearchService } from '../../../features/services/search.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: iProduct | undefined;
  favoriteProducts: Set<number> = new Set<number>();
  cartProducts: Set<number> = new Set<number>();

  constructor(
    private productService: ProductService, 
    private searchService: SearchService,
    private router: Router
  ) {}
    
  ngOnInit() {}

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
