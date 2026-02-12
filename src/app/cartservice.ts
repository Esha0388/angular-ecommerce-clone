import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cartservice {
  private cartItems: any[] = [];
  orders: any[] = [];

  cartCount$ = new BehaviorSubject<number>(0);

  private updateCartCount() {
    this.cartCount$.next(this.cartItems.length);
  }

  addToCart(product: any) {
    const existing = this.cartItems.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity++; 
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
      this.updateCartCount(); 
    }
  }

  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.updateCartCount(); 
  }

  increaseQty(productId: number) {
    const item = this.cartItems.find((item) => item.id === productId);
    if (item) item.quantity++;

  }

  decreaseQty(productId: number) {
    const item = this.cartItems.find((item) => item.id === productId);

    if (item) {
      item.quantity--;

      if (item.quantity <= 0) {
        this.removeItem(productId); 
      }
    }

  }

  
  getItems() {
    return this.cartItems;
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  isInCart(productId: number): boolean {
    return this.cartItems.some((item) => item.id === productId);
  }

  getCartCount() {
    return this.cartItems.length;
  }

placeOrder() {
  if (this.cartItems.length === 0) return;

  const newOrder = {
    id: Date.now(),
    date: new Date(),
    products: [...this.cartItems],
    total: this.getTotalPrice()
  };

  this.orders.unshift(newOrder); 
  this.cartItems = [];           
  this.updateCartCount();        
}

getOrderById(orderId: number) {
  return this.orders.find((o) => o.id === orderId);
}
getOrders() {
  return this.orders;
}
}