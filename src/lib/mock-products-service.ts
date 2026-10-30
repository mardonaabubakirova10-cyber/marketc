import { MOCK_PRODUCTS, Product, Category, Finish, StockStatus } from "@/data/mock-products";

export interface ProductFilters {
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  finish?: Finish;
  stock?: StockStatus;
  query?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "bestseller";
}

function matchesQuery(product: Product, query: string): boolean {
  const q = query.toLowerCase();
  return (
    product.name.toLowerCase().includes(q) ||
    product.nameEn.toLowerCase().includes(q) ||
    product.description.toLowerCase().includes(q) ||
    product.tags.some((t) => t.includes(q))
  );
}

export function getProducts(filters: ProductFilters = {}): Product[] {
  let results = [...MOCK_PRODUCTS];

  if (filters.category) {
    results = results.filter((p) => p.category === filters.category);
  }
  if (filters.stock) {
    results = results.filter((p) => p.stock === filters.stock);
  }
  if (filters.finish) {
    results = results.filter((p) => p.finish === filters.finish);
  }
  if (filters.minPrice !== undefined) {
    results = results.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.query?.trim()) {
    results = results.filter((p) => matchesQuery(p, filters.query!.trim()));
  }

  switch (filters.sortBy) {
    case "price_asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      results = [...results.filter((p) => p.isNew), ...results.filter((p) => !p.isNew)];
      break;
    case "bestseller":
    default:
      results = [
        ...results.filter((p) => p.isBestseller),
        ...results.filter((p) => !p.isBestseller),
      ];
  }

  return results;
}

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, limit);
}

export function getBestsellers(limit = 4): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.isBestseller).slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.isNew).slice(0, limit);
}
