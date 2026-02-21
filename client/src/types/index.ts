export interface Product {
  id: number;
  product_id: string;
  product_name: string;
  category: string;
  discounted_price: number;
  actual_price: number;
  discount_percentage: number;
  rating: number;
  rating_count: number;
  about_product: string;
  user_name: string;
  review_title: string;
  review_content: string;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CategoryCount {
  category: string;
  count: string;
}

export interface TopReviewedProduct {
  product_name: string;
  rating_count: number;
  rating: number;
}

export interface DiscountBucket {
  bucket: string;
  count: string;
}

export interface CategoryAvgRating {
  category: string;
  avg_rating: string;
}

export interface UploadResponse {
  message: string;
  rowCount: number;
}
