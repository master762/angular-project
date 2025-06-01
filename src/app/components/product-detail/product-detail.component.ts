import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../interfaces/product.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Добавьте этот импорт
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RelatedProductsComponent } from '../related-products/related-products.component';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
   imports: [
    CommonModule, 
    CurrencyPipe,
    RouterModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    RelatedProductsComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    isAddedToCart = false;
  showNotification = false;
  notificationMessage = '';
  Math = Math;
  toggleLike(): void {
  if (this.product) {
    this.product.isLiked = !this.product.isLiked;
    // Здесь можно добавить логику сохранения в избранное через сервис
  }
}
   product!: Product;
  productImages: string[] = [];
  selectedImageIndex = 0;
  baseUrl = 'http://localhost:1452';
  
  // Статические изображения для демонстрации
 staticImages = [
    '/img/phone-demo1.jpg',
    '/img/phone-demo2.jpg',
    '/img/phone-demo3.jpg'
  ];

 constructor(
  private route: ActivatedRoute,
  private http: HttpClient,
  
   private cartService: CartService
  ) {}

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.showCartNotification(`${this.product.name} added to cart`);
    }
  }

  private showCartNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.fetchProduct(id);
  }

  fetchProduct(id: string): void {
    this.http.get<Product>(`${this.baseUrl}/api/products/${id}`).subscribe({
      next: (product) => {
        this.product = {
          ...product,
          displayPrice: product.discount_price || product.price
        };
        
        // Основное изображение с бэкенда + статические
        this.productImages = [
          product.images[0].startsWith('http') 
            ? product.images[0] 
            : `${this.baseUrl}/${product.images[0]}`,
          ...this.staticImages
        ];
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      },
    });
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }
getScreenSize(): string {
  const sizeChar = this.product.characteristics?.find(c => 
    c.characteristic.toLowerCase().includes('диагональ')
  );
  return sizeChar ? sizeChar.value : '6.7'; // Возвращаем значение в дюймах
}

getCpuInfo(): string {
  const cpuChar = this.product.characteristics?.find(c => 
    c.characteristic.toLowerCase().includes('процессор')
  );
  return cpuChar ? `${this.product.brand} ${cpuChar.value}` : 'Apple A16 Bionic';
}

getBatteryCapacity(): string {
  const batteryChar = this.product.characteristics?.find(c => 
    c.characteristic.toLowerCase().includes('аккумулятор')
  );
  return batteryChar ? batteryChar.value : '4323';
}
  getCharacteristicValue(name: string): string {
    const char = this.product.characteristics?.find(c => 
      c.characteristic.toLowerCase().includes(name.toLowerCase())
    );
    return char ? `${char.value}${char.unit_type !== 'значение' ? ' ' + char.unit_type : ''}` : 'N/A';
  }
}