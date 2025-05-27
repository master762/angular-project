import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../../interfaces';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  filters = ['New Arrival', 'Bestseller', 'Featured Products'];
  activeFilter = this.filters[0];
  allProducts: Product[] = [];
  displayedProducts: Product[] = [];
  isLoading = true;
  error: string | null = null;
  baseUrl = 'http://localhost:1452';

  // Пагинация
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;
  visiblePages: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }
  ratingSortDirection: 'asc' | 'desc' = 'desc';
  toggleRatingSort(): void {
    // Меняем направление сортировки
    this.ratingSortDirection =
      this.ratingSortDirection === 'desc' ? 'asc' : 'desc';

    // Сортируем продукты
    this.allProducts.sort((a, b) => {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;

      return this.ratingSortDirection === 'desc'
        ? ratingB - ratingA
        : ratingA - ratingB;
    });

    // Обновляем отображение
    this.currentPage = 1;
    this.updateDisplayedProducts();
    this.updateVisiblePages();
  }
  fetchProducts(): void {
    this.http.get<Product[]>('http://localhost:1452/api/products/').subscribe({
      next: (data) => {
        this.allProducts = data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          discount_price: product.discount_price,
          images: product.images || [],
          rating: product.rating,
          isLiked: false,
          displayPrice: product.discount_price || product.price,
        }));

        this.calculatePagination();
        this.updateDisplayedProducts();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching products:', err);
      },
    });
  }

  private calculatePagination(): void {
    this.totalPages = Math.ceil(this.allProducts.length / this.itemsPerPage);
    this.updateVisiblePages();
  }

  private updateVisiblePages(): void {
    if (this.totalPages <= 5) {
      this.visiblePages = Array.from(
        { length: this.totalPages },
        (_, i) => i + 1
      );
    } else {
      if (this.currentPage <= 3) {
        this.visiblePages = [1, 2, 3, 4, this.totalPages];
      } else if (this.currentPage >= this.totalPages - 2) {
        this.visiblePages = [
          1,
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages,
        ];
      } else {
        this.visiblePages = [
          1,
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          this.totalPages,
        ];
      }
    }
  }

  private updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedProducts = this.allProducts.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.updateDisplayedProducts();
    this.updateVisiblePages();
  }

  nextPage(): void {
    this.changePage(this.currentPage + 1);
  }

  prevPage(): void {
    this.changePage(this.currentPage - 1);
  }
  public getProductImage(product: Product): string {
    if (product.images[0].startsWith('http')) {
      return product.images[0];
    }
    return `${this.baseUrl}/${product.images[0]}`.replace(/([^:]\/)\/+/g, '$1');
  }

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }

  toggleLike(product: Product): void {
    product.isLiked = !product.isLiked;
  }
}
