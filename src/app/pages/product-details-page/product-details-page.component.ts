import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../interfaces/product.interface';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { RelatedProductsComponent } from "../../components/related-products/related-products.component"; 

@Component({
  selector: 'app-product-details-page',
  imports: [HeaderComponent, FooterComponent, CommonModule, RelatedProductsComponent],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss'
})
export class ProductDetailsPageComponent implements OnInit {
  product!: Product;
  productImages: string[] = [];
  selectedImageIndex = 0;
  baseUrl = 'http://localhost:1452';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.fetchProduct(id);
  }

  fetchProduct(id: string): void {
    this.http.get<Product>(`${this.baseUrl}/api/products/${id}`).subscribe({
      next: (product) => {
        this.product = product;
        this.productImages = product.images.map((img) =>
          img.startsWith('http') ? img : `${this.baseUrl}/${img}`
        );
      },
      error: () => {
        // обработка ошибки
      },
    });
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }
}


