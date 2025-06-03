import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../interfaces/product.interface';
import { RouterLink } from '@angular/router';

type SortField = 'rating' | 'price' | 'date';
type SortDirection = 'asc' | 'desc';

interface SortOption {
  field: SortField;
  label: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, HttpClientModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
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

  // Сортировка
  currentSort: { field: SortField; direction: SortDirection } | null = null;
  isSortDropdownOpen = false;
  sortOptions: SortOption[] = [
    { field: 'rating', label: 'By rating' },
    { field: 'price', label: 'By price' },
    { field: 'date', label: 'By date' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  toggleSortDropdown(): void {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
  }

  applySort(field: SortField): void {
    if (this.currentSort?.field === field) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = { field, direction: 'desc' };
    }

    this.isSortDropdownOpen = false;
    this.executeSort();
  }

  executeSort(): void {
    if (!this.currentSort) return;

    this.allProducts.sort((a, b) => {
      let valueA, valueB;

      switch (this.currentSort!.field) {
        case 'rating':
          valueA = a.rating || 0;
          valueB = b.rating || 0;
          break;
        case 'price':
          valueA = a.discount_price ?? a.price;
          valueB = b.discount_price ?? b.price;
          break;
        case 'date':
          valueA = new Date(a.createdAt || '').getTime();
          valueB = new Date(b.createdAt || '').getTime();
          break;
      }

      return this.currentSort!.direction === 'desc' ? valueB - valueA : valueA - valueB;
    });

    this.currentPage = 1;
    this.updateDisplayedProducts();
    this.updateVisiblePages();
  }

  getSortIcon(field: SortField): string {
    if (this.currentSort?.field !== field) return '';
    return this.currentSort.direction === 'asc' ? '↑' : '↓';
  }

  fetchProducts(): void {
    this.http.get<Product[]>('http://localhost:1452/api/products/').subscribe({
      next: (data) => {
        this.allProducts = data.map((product) => ({
          ...product,
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

  getProductImage(product: Product): string {
    if (!product.images || product.images.length === 0) return '';
    if (product.images[0].startsWith('http')) {
      return product.images[0];
    }
    return `${this.baseUrl}/${product.images[0]}`.replace(/([^:]\/)\/+/g, '$1');
  }

  toggleLike(product: Product): void {
    product.isLiked = !product.isLiked;
  }
}