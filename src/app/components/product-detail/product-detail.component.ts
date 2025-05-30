import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../interfaces/product.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Добавьте этот импорт


@Component({
  selector: 'app-product-detail',
  standalone: true,
   imports: [
    CommonModule, 
    CurrencyPipe,
    RouterModule,
    HttpClientModule // Добавьте этот модуль
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;
  error: string | null = null;
  baseUrl = 'http://localhost:1452';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProduct(productId);
    } else {
      this.error = 'Product ID not provided';
      this.isLoading = false;
    }
  }

  fetchProduct(id: string): void {
    this.http.get<Product>(`${this.baseUrl}/api/products/${id}`).subscribe({
      next: (data) => {
        this.product = {
          ...data,
          displayPrice: data.discount_price || data.price,
          isLiked: false
        };
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching product:', err);
      }
    });
  }

  getProductImage(product: Product): string {
    if (product.images[0].startsWith('http')) {
      return product.images[0];
    }
    return `${this.baseUrl}/${product.images[0]}`.replace(/([^:]\/)\/+/g, '$1');
  }

  toggleLike(): void {
    if (this.product) {
      this.product.isLiked = !this.product.isLiked;
    }
  }
}