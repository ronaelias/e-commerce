import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { iProduct } from '../../../../shared/models/product.model';
import { Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';

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
  products: iProduct[] = [];
  filteredProducts: iProduct[] = [];
  favoriteProducts: Set<number> = new Set<number>();
  cartProducts: Set<number> = new Set<number>();

  constructor(private productService: ProductService, private searchService: SearchService, private router: Router) {}

  decrement(product: iProduct) {
    if(product.quantity > 0){
      product.quantity -= 1;
    } 
  }

  increment(product: iProduct) {
    product.quantity += 1;
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products: iProduct[]) => {
      this.products = products.map(product => ({ ...product, quantity: 0 }));
      this.searchService.setProducts(this.products);
    });

    this.searchService.searchProducts('').subscribe((products: iProduct[]) => {
      this.filteredProducts = products;
    });

    this.searchService.searchQuery$.subscribe(query => {
      this.searchService.searchProducts(query).subscribe((products: iProduct[]) => {
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

  trackById(index: number, product: iProduct): number {
    return product.id;
  }
}