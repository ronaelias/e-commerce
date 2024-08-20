import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductService } from '../../../services/product.service'
import { iProduct } from '../../../../shared/models/product.model'
import { Router } from '@angular/router'
//import { SearchService } from '../../../services/search.service'
import { Observable, of, switchMap } from 'rxjs'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
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
  @Input() product!: iProduct
  favoriteProducts: Set<number> = new Set<number>()
  cartProducts: Set<number> = new Set<number>()
  products$!: Observable<iProduct[]>
  currentCategory: string | undefined

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!

    this.productService.getProductById(productId).subscribe((product) => {
      this.product = { ...product, quantity: product.quantity || 1 }
      this.currentCategory = this.product.category
      this.loadProducts()
    })

    this.route.paramMap.subscribe((params) => {
      const productId = +params.get('id')!
      this.loadProduct(productId)
    })
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe((product) => {
      this.product = { ...product, quantity: product.quantity || 1 }
      this.currentCategory = this.product.category
      this.loadProducts() // Load similar products
    })
  }

  loadProducts(): void {
    const category = this.currentCategory || ''
    this.products$ = this.productService.getProductsByCategory(category).pipe(
      switchMap((products: iProduct[]) => {
        const filteredProducts = products.filter(
          (product) => product.id !== this.product.id
        )
        return of(filteredProducts)
      })
    )
  }

  toggleFavorite(productId: number): void {
    if (this.favoriteProducts.has(productId)) {
      this.favoriteProducts.delete(productId)
    } else {
      this.favoriteProducts.add(productId)
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.has(productId)
  }

  toggleCart(productId: number): void {
    if (this.cartProducts.has(productId)) {
      this.cartProducts.delete(productId)
    } else {
      this.cartProducts.add(productId)
    }
  }

  isInCart(productId: number): boolean {
    return this.cartProducts.has(productId)
  }

  // trackByProductId(index: number, product: iProduct): number {
  //   return product.id;
  // }

  // viewProductDetail(productId: number) {
  //   this.router.navigate([`/product-detail-card/${productId}`]);
  // }
}
