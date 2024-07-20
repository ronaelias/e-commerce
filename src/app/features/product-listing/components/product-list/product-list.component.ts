import { Component, OnInit } from '@angular/core';
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
  products: Product[] = [];
  filteredProducts: Product[] = [];
  favoriteProducts: Set<number> = new Set<number>();
  cartProducts: Set<number> = new Set<number>();

  constructor(private productService: ProductService, private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.searchService.setProducts(products);
    });

    this.searchService.searchProducts('').subscribe((products: Product[]) => {
      this.filteredProducts = products;
    });

    this.searchService.searchQuery$.subscribe(query => {
      this.searchService.searchProducts(query).subscribe((products: Product[]) => {
        this.filteredProducts = products;
      });
    });
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
}
