import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
   { path: 'products', component: ProductsPageComponent },
    { path: 'details', component: ProductDetailsPageComponent }
];
