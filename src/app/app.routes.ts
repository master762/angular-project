import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CartComponent } from './pages/cart/cart.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'products',
    children: [
      { path: '', component: ProductsPageComponent },
      { path: ':id', component: ProductDetailComponent }
    ]
  },
  { path: 'cart', component: CartComponent },
  { path: 'favorites', component: FavoriteComponent },
  { path: '**', component: NotFoundComponent }
];