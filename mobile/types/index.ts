export interface Shade {
  id: string;
  name: string;
  nameEn: string;
  hex: string;
  stock: string;
  price?: number;
}

export interface Product {
  id: string;
  slug: string;
  category: string;
  name: string;
  nameEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  images: string[];
  stock: string;
  isNew?: boolean;
  isBestseller?: boolean;
  shades: Shade[];
}

export interface CartItem {
  product: Product;
  shade: Shade;
  quantity: number;
}

