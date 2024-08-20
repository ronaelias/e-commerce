import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CheckoutService } from '../../shared/services/checkout.service'
import { iProduct } from '../../shared/models/product.model'
import { Router } from '@angular/router'
import { CartService } from '../../shared/services/cart.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutCart: iProduct[] = []
  addressForm: FormGroup

  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
    })
  }

  async ngOnInit() {
    this.checkoutCart = await this.checkoutService.getCheckoutCart() // Fetch items from IndexedDB
  }

  // async completeCheckout() {
  //   if (this.addressForm.valid) {
  //     try {
  //       await this.checkoutService.completeCheckout(this.checkoutCart)
  //       await this.checkoutService.clearCheckoutData()
  //       alert('Your order is on the way!')
  //       this.router.navigate(['/product-listing']) // Navigate to the product listing page
  //     } catch (error) {
  //       console.error('Checkout failed:', error)
  //       alert('Checkout failed. Please try again.')
  //     }
  //   } else {
  //     alert('Please fill in all the required fields.')
  //   }
  // }

  async completeCheckout() {
    if (this.addressForm.valid) {
      try {
        // Complete checkout and clear data
        await this.checkoutService.completeCheckout(this.checkoutCart)
        await this.checkoutService.clearCheckoutData()

        // Clear the cart in CartService as well
        await this.checkoutService.clearCartData()

        // Notify user and navigate to product listing
        alert('Your order is on the way!')
        this.router.navigate(['/product-listing'])
      } catch (error) {
        console.error('Checkout failed:', error)
        alert('Checkout failed. Please try again.')
      }
    } else {
      alert('Please fill in all required fields.')
    }
  }

  getTotalPrice(): number {
    return this.checkoutCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  }
}
