import { Injectable } from '@angular/core'
import { openDB, IDBPDatabase } from 'idb'
import { iProduct } from '../models/product.model'
import { CartService } from './cart.service'

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private dbPromise: Promise<IDBPDatabase>

  constructor(private cartService: CartService) {
    // Initialize IndexedDB with the correct store name
    this.dbPromise = openDB('MyAppDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('checkout')) {
          db.createObjectStore('checkout', { keyPath: 'id' })
        }
      },
    })
  }

  private async initDB() {
    // Ensure consistency in database initialization
    return openDB('MyAppDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('checkout')) {
          db.createObjectStore('checkout', { keyPath: 'id' })
        }
      },
    })
  }

  // Transfer cart items from CartService to IndexedDB for checkout
  async transferCartToCheckout(): Promise<void> {
    try {
      const db = await this.dbPromise
      const tx = db.transaction('checkout', 'readwrite')
      const store = tx.objectStore('checkout')

      const cartProducts = this.cartService.getCartProducts() // Get products from cart

      // Clear previous checkout data
      await store.clear()

      // Store each product in IndexedDB
      for (const product of cartProducts) {
        await store.put(product)
      }

      await tx.done
      console.log('Cart transferred to IndexedDB successfully.')
    } catch (error) {
      console.error('Error transferring cart to IndexedDB:', error)
      throw error
    }
  }

  // Get all checkout items from IndexedDB
  async getCheckoutCart(): Promise<iProduct[]> {
    try {
      const db = await this.dbPromise
      const tx = db.transaction('checkout', 'readonly')
      const store = tx.objectStore('checkout')
      return await store.getAll()
    } catch (error) {
      console.error('Error fetching checkout cart from IndexedDB:', error)
      throw error
    }
  }

  // Clear the checkout cart after checkout is complete
  async clearCheckoutData(): Promise<void> {
    try {
      const db = await this.dbPromise
      const tx = db.transaction('checkout', 'readwrite')
      const store = tx.objectStore('checkout')
      await store.clear() // Clear all data in the store
      await tx.done
      console.log('Checkout data cleared from IndexedDB.')
    } catch (error) {
      console.error('Error clearing checkout data:', error)
      throw error
    }
  }

  // Simulate the completion of checkout by sending data to the server
  async completeCheckout(products: iProduct[]): Promise<void> {
    // Simulate sending data to the server
    try {
      console.log('Sending checkout data to server:', products)
      // Here you could add an HTTP request to send the data to your backend server
    } catch (error) {
      throw new Error('Failed to complete checkout')
    }
  }

  async clearCartData(): Promise<void> {
    this.cartService.clearCart()
  }
}
