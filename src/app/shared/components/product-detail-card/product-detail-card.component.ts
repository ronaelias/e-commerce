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

import { Component, Input, OnInit } from '@angular/core'
import { iProduct } from '../../models/product.model'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../../../features/services/product.service'
import { Observable, of, switchMap } from 'rxjs'
import { FavoriteService } from '../../services/favorite.service'
import { CartService } from '../../services/cart.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-product-detail-card',
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss'],
})
export class ProductDetailCardComponent implements OnInit {
  @Input() product!: iProduct
  //cartProducts: Set<number> = new Set<number>();
  quantity: number = 1
  formSubmitted = false
  productForm: FormGroup
  selectedSize: string | null = null
  selectedColor: string | null = null

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private favoriteService: FavoriteService
  ) {
    this.productForm = this.fb.group({
      size: [null, Validators.required],
      color: [null, Validators.required],
      quantity: [1, [Validators.min(1)]],
    })
  }

  ngOnInit(): void {
    this.quantity = this.product.quantity || 1
    if (this.product) {
      this.productForm.patchValue({
        quantity: this.product.quantity || 1,
      })
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteService.isFavorite(productId)
  }

  onFavoriteToggled(productId: number) {
    if (this.isFavorite(productId)) {
      this.favoriteService.removeFavorite(productId)
    } else {
      this.favoriteService.addFavorite(this.product)
    }
  }

  // toggleCart(productId: number): void {
  //   if (this.cartProducts.has(productId)) {
  //     this.cartProducts.delete(productId);
  //   } else {
  //     this.cartProducts.add(productId);
  //   }
  // }

  // isInCart(productId: number): boolean {
  //   return this.cartProducts.has(productId);
  // }

  addToCart() {
    this.formSubmitted = true
    if (this.productForm.valid) {
      this.cartService.addToCart({
        product: this.product,
        color: this.productForm.value.color,
        size: this.productForm.value.size,
        quantity: this.productForm.value.quantity,
      })
      //this.router.navigate(['/cart']) // Navigate to the cart component
    }
  }

  get f() {
    return this.productForm.controls
  }

  // selectSize(size: string) {
  //   this.selectedSize = size
  // }

  // selectColor(color: string) {
  //   this.selectedColor = color
  // }

  selectSize(size: string) {
    this.selectedSize = size
    this.productForm.controls['size'].setValue(size)
  }

  selectColor(color: string) {
    this.selectedColor = color
    this.productForm.controls['color'].setValue(color)
  }

  updateQuantity(change: number) {
    const currentQuantity = this.productForm.controls['quantity'].value
    const newQuantity = currentQuantity + change
    this.productForm.controls['quantity'].setValue(newQuantity)
  }

  decrement() {
    if (this.product.quantity > 1) {
      this.product.quantity -= 1
    }
  }

  increment() {
    this.product.quantity += 1
  }

  // updateQuantity(change: number) {
  //   const currentQuantity = this.productForm.controls['quantity'].value
  //   const newQuantity = currentQuantity + change
  //   this.productForm.controls['quantity'].setValue(newQuantity)
  // }

  // viewProductDetail(productId: number) {
  //   this.router.navigate([`/product-detail-card/${productId}`]);
  // }
}
