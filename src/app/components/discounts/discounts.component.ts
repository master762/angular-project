import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../interfaces/product.interface';
@Component({
  selector: 'app-discounts',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.scss'
})
export class DiscountsComponent implements OnInit{
    allProducts: Product[] = [];
  displayedProducts: Product[] = [];
  baseUrl = 'http://localhost:1452';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>('http://localhost:1452/api/products/').subscribe({
      next: (data) => {
        this.allProducts = data.map((product) => ({
          ...product,
          isLiked: false,
          displayPrice: product.discount_price || product.price,
        }));

        this.displayedProducts = this.getRandomProducts(this.allProducts, 4);
      },
      error: () => {
        console.error('Failed to load products.');
      },
    });
  }

  getRandomProducts(products: Product[], count: number): Product[] {
    return [...products].sort(() => Math.random() - 0.5).slice(0, count);
  }

  toggleLike(product: Product): void {
    product.isLiked = !product.isLiked;
  }

  getProductImage(product: Product): string {
    const imagePath = product.images[0];
    return imagePath.startsWith('http')
      ? imagePath
      : `${this.baseUrl}/${imagePath}`.replace(/([^:]\/)\/+/g, '$1');
  }
}


