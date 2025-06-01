import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../favorite.service';
import { Product } from '../../interfaces/product.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  favoriteItems: Product[] = [];

  constructor(private favoriteService: FavoriteService) {
    this.favoriteItems = this.favoriteService.getFavorites();
  }

  removeFromFavorites(productId: number): void {
    this.favoriteService.removeFromFavorites(productId);
    this.favoriteItems = this.favoriteService.getFavorites();
  }

  getProductImage(product: Product): string {
    return this.favoriteService.getProductImage(product);
  }
}