import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-product-details-page',
  imports: [HeaderComponent, FooterComponent,CommonModule,],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss'
})
export class ProductDetailsPageComponent {
   selectedImageIndex = 0;
  productImages = [
    '/img/cardItem.png',
    '/img/cardItem1.png',
    '/img/cardItem2.png',
    '/img/cardItem3.png'
  ];

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }
}


