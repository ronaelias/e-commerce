// import { Component, OnInit } from '@angular/core';
// import { iProduct } from '../../models/product.model';
// import { ProductService } from '../../../features/product-listing/services/product.service';
// import { SearchService } from '../../../features/services/search.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { environment } from '../../../../environments/environment';
// import { switchMap } from 'rxjs';

// @Component({
//   selector: 'app-product-detail-card',
//   templateUrl: './product-detail-card.component.html',
//   styleUrls: ['./product-detail-card.component.scss']
// })
// export class ProductDetailCardComponent implements OnInit {
//   products: iProduct[] = [];
//   filteredProducts: iProduct[] = [];
//   favoriteProducts: Set<number> = new Set<number>();
//   cartProducts: Set<number> = new Set<number>();
//   private apiUrl = environment.apiUrl;

//   constructor(
//     private productService: ProductService,
//     private searchService: SearchService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   decrement(product: iProduct) {
//     if (product.quantity > 0) {
//       product.quantity -= 1;
//     }
//   }

//   increment(product: iProduct) {
//     product.quantity += 1;
//   }

//   ngOnInit() {
//     this.productService.getAllProducts().subscribe((products: iProduct[]) => {
//       this.products = products.map(product => ({ ...product, quantity: 0 }));
//       this.searchService.setProducts(this.products);
//     });

//     this.searchService.searchProducts('').subscribe((products: iProduct[]) => {
//       this.filteredProducts = products;
//     });

//     this.searchService.searchQuery$.subscribe(query => {
//       this.searchService.searchProducts(query).subscribe((products: iProduct[]) => {
//         this.filteredProducts = products;
//       });
//     });
//   }

//   // ngOnInit() {
//   //   this.productService.getAllProducts().pipe(
//   //     switchMap((products: iProduct[]) => {
//   //       this.products = products.map(product => ({ ...product, quantity: 0 }));
//   //       this.searchService.setProducts(this.products);
//   //       return this.route.paramMap; // Retrieve route parameters
//   //     }),
//   //     switchMap(params => {
//   //       const productId = +params.get('id')!;
//   //       if (productId) {
//   //         this.filteredProducts = this.products.filter(product => product.id === productId);
//   //       }
//   //       return this.searchService.searchProducts(''); // Use an empty query to get all products
//   //     })
//   //   ).subscribe();
//   // }

//   viewProductDetail(productId: number) {
//     this.router.navigate([`/products/${productId}`]);
//   }
  

//   toggleFavorite(productId: number) {
//     if (this.favoriteProducts.has(productId)) {
//       this.favoriteProducts.delete(productId);
//     } else {
//       this.favoriteProducts.add(productId);
//     }
//   }

//   isFavorite(productId: number): boolean {
//     return this.favoriteProducts.has(productId);
//   }

//   toggleCart(productId: number) {
//     if (this.cartProducts.has(productId)) {
//       this.cartProducts.delete(productId);
//     } else {
//       this.cartProducts.add(productId);
//     }
//   }

//   isInCart(productId: number): boolean {
//     return this.cartProducts.has(productId);
//   }

//   trackById(index: number, product: iProduct): number {
//     return product.id;
//   }

//   trackByProductId(index: number, product: iProduct): number {
//     return product.id;
//   }
// }

import { Component, Input, OnInit } from '@angular/core';
import { iProduct } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../features/product-listing/services/product.service';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail-card',
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss']
})
export class ProductDetailCardComponent implements OnInit {
  @Input() product!: iProduct;
  favoriteProducts: Set<number> = new Set<number>();
  cartProducts: Set<number> = new Set<number>();
  //prod
  products$!: Observable<iProduct[]>;
  currentCategory: string | undefined;
  categories: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    
    this.productService.getProductById(productId).subscribe(product => {
      this.product = { ...product, quantity: product.quantity || 1 };
      this.currentCategory = this.product.category;
      //this.loadCategories();
      this.loadProducts();
    });
  }
  
  loadProducts(): void {
    const category = this.currentCategory || '';
    this.products$ = this.productService.getProductsByCategory(category).pipe(
      switchMap((products: iProduct[]) => {
        const filteredProducts = products.filter(product => product.id !== this.product.id);
        return of(filteredProducts);
      })
    );
  }
  

  // loadCategories(): void {
  //   this.productService.getCategories().subscribe(
  //     (categories: string[]) => {
  //       this.categories = categories;
  //     },
  //   );
  // }
  


  toggleFavorite(productId: number): void {
    if (this.favoriteProducts.has(productId)) {
      this.favoriteProducts.delete(productId);
    } else {
      this.favoriteProducts.add(productId);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.has(productId);
  }

  toggleCart(productId: number): void {
    if (this.cartProducts.has(productId)) {
      this.cartProducts.delete(productId);
    } else {
      this.cartProducts.add(productId);
    }
  }

  isInCart(productId: number): boolean {
    return this.cartProducts.has(productId);
  }


  quantity: number = 1;

  decrement() {
    if (this.product.quantity > 1) {
      this.product.quantity -= 1;
    }
  }

  increment() {
    this.product.quantity += 1;
  }

  addToCart() {
    // Implement add to cart logic
  }

  // trackByProductId(index: number, product: iProduct): number {
  //   return product.id;
  // }

  selectedSize: string | null = null;
  selectedColor: string | null = null;

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  viewProductDetail(productId: number) {
    this.router.navigate([`/product-detail-card/${productId}`]);
  }
}
