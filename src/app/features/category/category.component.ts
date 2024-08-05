import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-listing/services/product.service';
import { Product } from '../../product.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories = [
    'men\'s clothing',
    'jewelery',
    'electronics',
    'women\'s clothing'
  ];

  selectedCategory$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  products$!: Observable<Product[]>;
  products: Product[] = [];
  favoriteProducts: Set<number> = new Set<number>();
  cartProducts: Set<number> = new Set<number>();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.selectedCategory$.pipe(
      switchMap(category => 
        category ? this.productService.getProductsByCategory(category) : this.productService.getAllProducts()
      )
    );
  }

  scrollToCategory(category: string) {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth'});
    }
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
}
