export interface Product {
  id: number;
  name: string;
  price: number;
  discount_price: number | null;
  images: string[];
  rating?: number;
  count_review?: number;
  is_available?: boolean;
  color?: string;
  brand?: string;
  country?: string;
  category?: string;
  guarantee?: number;
  store_address?: string | null;
  characteristics?: {
    characteristic: string;
    unit_type: string;
    value: string;
  }[];
  description?: string;
  isLiked?: boolean;
  displayPrice?: number;
}