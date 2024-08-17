import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { iProduct } from '../models/product.model'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProductsSubject = new BehaviorSubject<
    { product: iProduct; color: string; size: string; quantity: number }[]
  >([])
  cartProducts$ = this.cartProductsSubject.asObservable()

  addToCart(cartItem: {
    product: iProduct
    color: string
    size: string
    quantity: number
  }) {
    const currentCart = this.cartProductsSubject.getValue()
    this.cartProductsSubject.next([...currentCart, cartItem])
  }

  getCartItems() {
    return this.cartProducts$
  }
}
