import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../cart.service';
import { RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent,
    CommonModule,
    CurrencyPipe,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  baseUrl = 'http://localhost:1452';

  constructor(public cartService: CartService) {}

  incrementQuantity(productId: number): void {
    this.cartService.updateQuantity(
      productId, 
      this.getCurrentQuantity(productId) + 1
    );
  }

  decrementQuantity(productId: number): void {
    this.cartService.updateQuantity(
      productId, 
      this.getCurrentQuantity(productId) - 1
    );
  }

  private getCurrentQuantity(productId: number): number {
    const item = this.cartService.getCartItems()
      .find(item => item.product.id === productId);
    return item ? item.quantity : 1;
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  checkout(): void {
    this.cartService.clearCart();
  }

  getProductImage(product: Product): string {
    if (!product.images || product.images.length === 0) return '';
    const image = product.images[0];
    return image.startsWith('http') ? image : `${this.baseUrl}/${image}`;
  }
}