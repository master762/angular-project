import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { PopularitemsComponent } from '../../components/popularitems/popularitems.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { ProductsComponent } from '../../components/products/products.component';
import { PopularproductsComponent } from "../../components/popularproducts/popularproducts.component";
import { DiscountsComponent } from "../../components/discounts/discounts.component";
import { HerofooterComponent } from "../../components/herofooter/herofooter.component";
import { FooterComponent } from "../../components/footer/footer.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true, 
  imports: [HeaderComponent, HeroComponent, PopularitemsComponent, CategoriesComponent, ProductsComponent, PopularproductsComponent, DiscountsComponent, HerofooterComponent, FooterComponent]
})
export class HomeComponent {}
