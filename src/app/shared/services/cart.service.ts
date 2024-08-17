import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {}

  getCartItems() {
    return this.cartItems.asObservable();
  }

  addToCart(product: iProduct, color: string, size: string) {
    const currentItems = this.cartItems.value;
    currentItems.push({ ...product, color, size });
    this.cartItems.next(currentItems);
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.value.filter(item => item.id !== productId);
    this.cartItems.next(currentItems);
  }
}
