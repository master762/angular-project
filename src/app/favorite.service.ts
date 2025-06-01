import { Injectable } from '@angular/core';
import { Product } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteItems: Product[] = [];
  private baseUrl = 'http://localhost:1452';

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        this.favoriteItems = JSON.parse(savedFavorites);
      } catch (e) {
        console.error('Error parsing favorites data', e);
        this.favoriteItems = [];
      }
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favoriteItems));
  }

  getProductImage(product: Product): string {
    if (!product.images || product.images.length === 0) return '';
    const image = product.images[0];
    return image.startsWith('http') ? image : `${this.baseUrl}/${image}`;
  }

  addToFavorites(product: Product): void {
    const productCopy = {
      id: product.id,
      name: product.name,
      price: product.price,
      discount_price: product.discount_price,
      displayPrice: product.displayPrice || product.price,
      images: product.images ? [...product.images] : [],
      brand: product.brand,
      isLiked: true
    };

    if (!this.isInFavorites(productCopy.id)) {
      this.favoriteItems.push(productCopy);
      this.saveFavorites();
    }
  }

  removeFromFavorites(productId: number): void {
    this.favoriteItems = this.favoriteItems.filter(item => item.id !== productId);
    this.saveFavorites();
  }

  isInFavorites(productId: number): boolean {
    return this.favoriteItems.some(item => item.id === productId);
  }

  getFavorites(): Product[] {
    return this.favoriteItems;
  }

  clearFavorites(): void {
    this.favoriteItems = [];
    this.saveFavorites();
  }
}