import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { PopularitemsComponent } from '../../components/popularitems/popularitems.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { ProductsComponent } from '../../components/products/products.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true, 
  imports: [HeaderComponent,HeroComponent,PopularitemsComponent,CategoriesComponent,ProductsComponent,]
})
export class HomeComponent {}
