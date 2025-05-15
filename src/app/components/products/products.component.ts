import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  filters = ['New Arrival', 'Bestseller', 'Featured Products'];
  activeFilter = this.filters[0]; 
    products = [
    {
      name: 'Apple iPhone 14 Pro Max 128GB Deep Purple (MQ9T3RX/A)',
      price: 900,
      image: '/img/Iphone.png',
      isLiked: false
    },
    {
      name: 'Blackmagic Pocket Cinema Camera 6k',
      price: 2535,
      image: '/img/camera.png',
      isLiked: false
    },
    {
      name: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium Case',
      price: 399,
      image: '/img/apple-wath.png',
      isLiked: false
    },
      {
      name: 'AirPods Max Silver',
      price: 549,
      image: '/img/appleairpods.png',
      isLiked: false
    },
      {
      name: 'Samsung Galaxy Watch6 Classic 47mm Black',
      price: 369,
      image: '/img/samsung-wath.png',
      isLiked: false
    },
      {
      name: 'Galaxy Z Fold5 Unlocked | 256GB | Phantom Black',
      price: 1799,
      image: '/img/galaxyZ.png',
      isLiked: true
    },
      {
      name: 'Galaxy Buds FE Graphite',
      price: 99.99,
      image: '/img/buds.png',
      isLiked: false
    },
      {
      name: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
      price: 398,
      image: '/img/ipad.png',
      isLiked: false
    },
    //   {
    //   name: 'Apple iPhone 14 Pro 512GB Gold (MQ233)',
    //   price: 1437,
    //   image: '/img/Iphone512.png',
    //   isLiked: false
    // },
    //   {
    //   name: 'Apple iPhone 14 Pro 1TB Gold (MQ2V3)',
    //   price: 1499,
    //   image: '/img/Iphone1tb.png',
    //   isLiked: false
    // },
    

  ];
 setActiveFilter(filter: string) {
    this.activeFilter = filter;
  }
  toggleLike(product: any) {
    product.isLiked = !product.isLiked;
  }
}