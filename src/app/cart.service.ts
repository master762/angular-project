import { Injectable } from '@angular/core';
import { Product } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: {product: Product, quantity: number}[] = [];
  private baseUrl = 'http://localhost:1452';

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getProductImage(product: Product): string {
    if (!product.images || product.images.length === 0) return '';
    const image = product.images[0];
    return image.startsWith('http') ? image : `${this.baseUrl}/${image}`;
  }

  addToCart(product: Product): void {
    
    const productCopy = {
      id: product.id,
      name: product.name,
      price: product.price,
      discount_price: product.discount_price,
      displayPrice: product.displayPrice || product.price,
      images: product.images ? [...product.images] : [],
      brand: product.brand
      
    };

    const existingItem = this.cartItems.find(item => item.product.id === productCopy.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        product: productCopy,
        quantity: 1
      });
    }
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  getCartItems(): {product: Product, quantity: number}[] {
    return this.cartItems;
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.product.displayPrice || item.product.price) * item.quantity, 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.05;
  }

  getShipping(): number {
    return 29; 
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax() + this.getShipping();
  }

  clearCart(): void {
    this.cartItems = [];
  }
}