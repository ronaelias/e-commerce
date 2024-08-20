import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { iProduct } from '../models/product.model'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts: iProduct[] = []
  private cartProductsSubject = new BehaviorSubject<iProduct[]>(
    this.cartProducts
  )
  cartProducts$ = this.cartProductsSubject.asObservable()

  addToCart(product: iProduct) {
    // Check if the product with the same id, size, and color exists in the cart
    const existingProductIndex = this.cartProducts.findIndex(
      (p) =>
        p.id === product.id &&
        p.size === product.size &&
        p.color === product.color
    )

    if (existingProductIndex > -1) {
      // Update quantity if found
      this.cartProducts[existingProductIndex].quantity += product.quantity
    } else {
      // Add new product
      this.cartProducts.push(product)
    }

    // Update the observable
    this.cartProductsSubject.next([...this.cartProducts])
  }

  removeFromCart(productId: number, size: string, color: string) {
    this.cartProducts = this.cartProducts.filter(
      (p) => !(p.id === productId && p.size === size && p.color === color)
    )
    this.cartProductsSubject.next([...this.cartProducts])
  }

  isInCart(productId: number, size: string = '', color: string = ''): boolean {
    return this.cartProducts.some(
      (p) => p.id === productId && p.size === size && p.color === color
    )
  }

  getCartProducts(): iProduct[] {
    return this.cartProductsSubject.getValue()
  }

  updateProduct(updatedProduct: iProduct) {
    // Remove the old product if it exists
    this.removeFromCart(
      updatedProduct.id,
      updatedProduct.size,
      updatedProduct.color
    )

    // Add the updated product
    this.addToCart(updatedProduct)
  }

  clearCart() {
    this.cartProducts = []
    this.cartProductsSubject.next([...this.cartProducts])
  }
}
