import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../product-listing/services/product.service';
import { Product } from '../../../../product.model';
import { Router } from '@angular/router';
import { SearchService } from '../../../../search.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
// export class ProductDetailComponent implements OnInit {
//   product: Product | undefined;

//   constructor(private route: ActivatedRoute, private productService: ProductService) {}

//   ngOnInit() {
//     const productId = this.route.snapshot.paramMap.get('id');
//     if (productId) {
//       this.productService.getProductById(productId).subscribe(
//         (product: Product) => {
//           this.product = product;
//         }
//       );
//     }
//   }
// }

export class ProductDetailComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  favoriteProducts: Set<number> = new Set<number>();
  cartProducts: Set<number> = new Set<number>();

  quantity = signal(0);

  constructor(private productService: ProductService, private searchService: SearchService, private router: Router) {}

  decrement() {
    if(this.quantity() > 0){
      this.quantity.set(this.quantity() - 1);
    }
    
  }
  increment() {
    this.quantity.set(this.quantity() + 1);
  }

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

