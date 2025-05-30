export interface Product {
  id: number;
  name: string;
  price: number;
  discount_price?: number | null;
  images: string[];
  rating?: number;
  isLiked?: boolean;
  displayPrice?: number;
}
