import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { CartComponent } from './pages/cart/cart.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
   { path: 'products', component: ProductsPageComponent },
    { path: 'details', component: ProductDetailsPageComponent },
     { path: 'cart', component: CartComponent },
          { path: 'favorites', component: FavoriteComponent },

];
