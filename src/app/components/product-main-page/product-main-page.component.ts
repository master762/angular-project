import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-main-page',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-main-page.component.html',
  styleUrl: './product-main-page.component.scss',
})
export class ProductMainPageComponent implements OnInit {
  filters = ['New Arrival', 'Bestseller', 'Featured Products'];
  activeFilter = this.filters[0];
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
        this.displayedProducts = this.allProducts.slice(0, 8);
      },
      error: () => {
        console.error('Failed to load products.');
      },
    });
  }

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
    // фильтрация не применяется, так как входные данные не содержат признаков (например, нет метки "new", "featured" и т.п.)
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
