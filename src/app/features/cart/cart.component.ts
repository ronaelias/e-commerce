// import { Component, OnInit } from '@angular/core'
// import { CartService } from '../../shared/services/cart.service'
// import { Observable } from 'rxjs'
// import { iProduct } from '../../shared/models/product.model'
// import { Router } from '@angular/router'
// import { CheckoutService } from '../../shared/services/checkout.service'

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.scss'],
// })
// export class CartComponent implements OnInit {
//   cartProducts$: Observable<iProduct[]>
//   editMode: { [key: number]: boolean } = {}

//   constructor(
//     private cartService: CartService,
//     private router: Router,
//     private checkoutService: CheckoutService
//   ) {
//     this.cartProducts$ = this.cartService.cartProducts$
//   }

//   ngOnInit() {}

//   // Helper function to check if the product category is men's or women's clothing
//   isClothingCategory(category: string): boolean {
//     const clothingCategories = ["men's clothing", "women's clothing"]
//     return clothingCategories.includes(category.toLowerCase())
//   }

//   getTotalPrice(cart: iProduct[]): number {
//     return cart.reduce(
//       (total, product) => total + product.price * product.quantity,
//       0
//     )
//   }

//   getTotalItems(cart: iProduct[]): number {
//     return cart.reduce((total, product) => total + product.quantity, 0)
//   }

//   removeFromCart(product: iProduct) {
//     this.cartService.removeFromCart(product.id, product.size, product.color)
//   }

//   toggleEdit(productId: number) {
//     this.editMode[productId] = !this.editMode[productId]
//   }

//   saveChanges(product: iProduct) {
//     this.cartService.updateProduct(product)
//     this.toggleEdit(product.id) // Exit edit mode after saving
//   }

//   editProduct(product: iProduct) {
//     this.cartService.removeFromCart(product.id, product.size, product.color)
//     this.router.navigate([`/product-detail/${product.id}`])
//   }

//   async proceedToCheckout() {
//     try {
//       // Transfer cart data to IndexedDB
//       await this.checkoutService.transferCartToCheckout()
//       // Navigate to the checkout page
//       this.router.navigate(['/checkout'])
//     } catch (error) {
//       console.error('Failed to transfer cart to IndexedDB:', error)
//     }
//   }
// }

import { Component, OnInit } from '@angular/core'
import { CartService } from '../../shared/services/cart.service'
import { Observable } from 'rxjs'
import { iProduct } from '../../shared/models/product.model'
import { Router } from '@angular/router'
import { CheckoutService } from '../../shared/services/checkout.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts$: Observable<iProduct[]>

  constructor(
    private cartService: CartService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {
    this.cartProducts$ = this.cartService.cartProducts$
  }

  ngOnInit() {}

  isClothingCategory(category: string): boolean {
    const clothingCategories = ["men's clothing", "women's clothing"]
    return clothingCategories.includes(category.toLowerCase())
  }

  async editProduct(product: iProduct) {
    const { id, size, color } = product
    await this.cartService.removeFromCart(id, size, color)
    this.router.navigate([`/product-detail/${product.id}`])
  }

  getTotalPrice(cart: iProduct[]): number {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  }

  getTotalItems(cart: iProduct[]): number {
    return cart.reduce((total, product) => total + product.quantity, 0)
  }

  async removeProductFromCart(product: iProduct) {
    const { id, size, color } = product
    await this.cartService.removeFromCart(id, size, color)
  }

  async proceedToCheckout() {
    try {
      await this.checkoutService.transferCartToCheckout()
      this.router.navigate(['/checkout'])
    } catch (error) {
      console.error('Error transferring cart to checkout:', error)
      alert('Failed to proceed to checkout. Please try again.')
    }
  }
}
// import { Component, OnInit } from '@angular/core'
// import { CartService } from '../../shared/services/cart.service'
// import { Observable } from 'rxjs'
// import { iProduct } from '../../shared/models/product.model'
// import { Router } from '@angular/router'
// import { CheckoutService } from '../../shared/services/checkout.service'

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.scss'],
// })
// export class CartComponent implements OnInit {
//   cartProducts$: Observable<iProduct[]>
//   editMode: { [key: number]: boolean } = {}

//   constructor(
//     private cartService: CartService,
//     private router: Router,
//     private checkoutService: CheckoutService
//   ) {
//     this.cartProducts$ = this.cartService.cartProducts$
//   }

//   ngOnInit() {}

//   // Helper function to check if the product category is men's or women's clothing
//   isClothingCategory(category: string): boolean {
//     const clothingCategories = ["men's clothing", "women's clothing"]
//     return clothingCategories.includes(category.toLowerCase())
//   }

//   getTotalPrice(cart: iProduct[]): number {
//     return cart.reduce(
//       (total, product) => total + product.price * product.quantity,
//       0
//     )
//   }

//   getTotalItems(cart: iProduct[]): number {
//     return cart.reduce((total, product) => total + product.quantity, 0)
//   }

//   removeFromCart(product: iProduct) {
//     this.cartService.removeFromCart(product.id, product.size, product.color)
//   }

//   toggleEdit(productId: number) {
//     this.editMode[productId] = !this.editMode[productId]
//   }

//   saveChanges(product: iProduct) {
//     this.cartService.updateProduct(product)
//     this.toggleEdit(product.id) // Exit edit mode after saving
//   }

//   editProduct(product: iProduct) {
//     this.cartService.removeFromCart(product.id, product.size, product.color)
//     this.router.navigate([`/product-detail/${product.id}`])
//   }

//   async proceedToCheckout() {
//     try {
//       // Transfer cart data to IndexedDB
//       await this.checkoutService.transferCartToCheckout()
//       // Navigate to the checkout page
//       this.router.navigate(['/checkout'])
//     } catch (error) {
//       console.error('Failed to transfer cart to IndexedDB:', error)
//     }
//   }
// }
