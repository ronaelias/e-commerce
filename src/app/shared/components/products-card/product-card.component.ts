import { Component, Input, OnInit } from '@angular/core'
import { BehaviorSubject, Observable, switchMap } from 'rxjs'
import { iProduct } from '../../models/product.model'
import { Router } from '@angular/router'
import { ProductService } from '../../../features/services/product.service'
import { SearchService } from '../../../features/services/search.service'
import { FavoriteService } from '../../services/favorite.service'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: iProduct
  //favoriteProducts: Set<number> = new Set<number>();
  //cartProducts: Set<number> = new Set<number>();

  constructor(
    private router: Router,
    private favoriteService: FavoriteService,
    private cartService: CartService
  ) {}

  ngOnInit() {}

  viewProductDetail(productId: number) {
    this.router.navigate([`/product-detail/${productId}`])
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

  addToCart() {
    this.router.navigate([`/product-detail/${this.product.id}`])
  }

  // toggleCart(productId: number) {
  //   if (this.cartProducts.has(productId)) {
  //     this.cartProducts.delete(productId);
  //   } else {
  //     this.cartProducts.add(productId);
  //   }
  // }

  // isInCart(productId: number): boolean {
  //   return this.cartProducts.has(productId);
  // }

  // trackByProductId(index: number, product: iProduct): number {
  //   return product.id;
  // }
}
