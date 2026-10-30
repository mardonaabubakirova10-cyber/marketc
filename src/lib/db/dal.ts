import { getDb, isDbConfigured } from "./client";
import {
  MOCK_PRODUCTS,
  Product,
  Category,
  StockStatus,
  Finish,
} from "@/data/mock-products";

interface DbProductRow {
  id: string;
  slug: string;
  category_id: string;
  name_ru: string;
  name_en: string;
  tagline_ru: string;
  tagline_en: string;
  description_ru: string;
  description_en: string;
  ingredients_ru: string;
  ingredients_en: string;
  application_ru: string;
  application_en: string;
  price_minor: number;
  original_price_minor: number | null;
  currency: string;
  finish: string;
  stock_status: string;
  is_new: boolean;
  is_bestseller: boolean;
  primary_image: string;
  gallery_images: string[] | string;
  tags: string[] | string;
  variants?: DbVariantRow[];
}

interface DbVariantRow {
  id: string;
  product_id: string;
  sku: string | null;
  name_ru: string;
  name_en: string;
  hex_color: string;
  price_minor: number | null;
  stock_status: string;
  stock_quantity: number;
}

function mapRowToProduct(row: DbProductRow, variants: DbVariantRow[] = []): Product {
  const gallery =
    typeof row.gallery_images === "string"
      ? JSON.parse(row.gallery_images)
      : row.gallery_images || [];

  const tags =
    typeof row.tags === "string"
      ? JSON.parse(row.tags)
      : row.tags || [];

  return {
    id: row.id,
    slug: row.slug,
    category: row.category_id as Category,
    name: row.name_ru,
    nameEn: row.name_en,
    tagline: row.tagline_ru || "",
    taglineEn: row.tagline_en || "",
    description: row.description_ru || "",
    descriptionEn: row.description_en || "",
    ingredients: row.ingredients_ru || "",
    ingredientsEn: row.ingredients_en || "",
    application: row.application_ru || "",
    applicationEn: row.application_en || "",
    price: Math.round(row.price_minor / 100),
    originalPrice: row.original_price_minor ? Math.round(row.original_price_minor / 100) : undefined,
    currency: "RUB",
    finish: row.finish as Finish,
    image: row.primary_image,
    images: gallery.length > 0 ? gallery : [row.primary_image],
    stock: row.stock_status as StockStatus,
    isNew: Boolean(row.is_new),
    isBestseller: Boolean(row.is_bestseller),
    tags,
    shades: variants.map((v) => ({
      id: v.id,
      name: v.name_ru,
      nameEn: v.name_en,
      hex: v.hex_color,
      stock: v.stock_status as StockStatus,
      price: v.price_minor ? Math.round(v.price_minor / 100) : undefined,
    })),
  };
}

export async function fetchProductsFromDb(filters?: {
  category?: string;
  sort?: string;
  query?: string;
}): Promise<Product[]> {
  const sql = getDb();
  if (!sql || !isDbConfigured()) {
    let result = [...MOCK_PRODUCTS];
    if (filters?.category && filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters?.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }

  try {
    const rows = (await sql`
      SELECT p.*, 
        COALESCE(
          json_agg(
            json_build_object(
              'id', v.id,
              'product_id', v.product_id,
              'name_ru', v.name_ru,
              'name_en', v.name_en,
              'hex_color', v.hex_color,
              'stock_status', v.stock_status,
              'price_minor', v.price_minor
            )
          ) FILTER (WHERE v.id IS NOT NULL), '[]'
        ) as variants
      FROM products p
      LEFT JOIN product_variants v ON p.id = v.product_id
      GROUP BY p.id
      ORDER BY p.is_bestseller DESC, p.created_at DESC
    `) as unknown as (DbProductRow & { variants: DbVariantRow[] })[];

    if (!rows || rows.length === 0) return MOCK_PRODUCTS;

    let products = rows.map((r) => mapRowToProduct(r, r.variants || []));

    if (filters?.category && filters.category !== "all") {
      products = products.filter((p) => p.category === filters.category);
    }

    if (filters?.query) {
      const q = filters.query.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters?.sort === "price_asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (filters?.sort === "price_desc") {
      products.sort((a, b) => b.price - a.price);
    } else if (filters?.sort === "newest") {
      products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return products;
  } catch (err) {
    console.error("Database query failed, using mock data fallback:", err);
    return MOCK_PRODUCTS;
  }
}

export async function fetchProductBySlugFromDb(slug: string): Promise<Product | null> {
  const sql = getDb();
  if (!sql || !isDbConfigured()) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  try {
    const rows = (await sql`
      SELECT p.*, 
        COALESCE(
          json_agg(
            json_build_object(
              'id', v.id,
              'product_id', v.product_id,
              'name_ru', v.name_ru,
              'name_en', v.name_en,
              'hex_color', v.hex_color,
              'stock_status', v.stock_status,
              'price_minor', v.price_minor
            )
          ) FILTER (WHERE v.id IS NOT NULL), '[]'
        ) as variants
      FROM products p
      LEFT JOIN product_variants v ON p.id = v.product_id
      WHERE p.slug = ${slug}
      GROUP BY p.id
      LIMIT 1
    `) as unknown as (DbProductRow & { variants: DbVariantRow[] })[];

    if (!rows || rows.length === 0) {
      return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
    }

    const r = rows[0];
    return mapRowToProduct(r, r.variants || []);
  } catch (err) {
    console.error("Database query failed for product slug, using mock fallback:", err);
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function saveOrderToDb(order: {
  orderNumber: string;
  publicToken: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryCity: string;
  deliveryAddress: string;
  deliveryComment?: string;
  subtotal: number;
  shipping: number;
  total: number;
  locale: string;
  items: Array<{
    productId: string;
    variantId: string;
    productName: string;
    shadeName: string;
    quantity: number;
    unitPrice: number;
  }>;
}): Promise<boolean> {
  const sql = getDb();
  if (!sql || !isDbConfigured()) {
    return true; // Mock mode succeeds
  }

  try {
    const orderId = "ord_" + Math.random().toString(36).substring(2, 10);
    const subtotalMinor = order.subtotal * 100;
    const shippingMinor = order.shipping * 100;
    const totalMinor = order.total * 100;
    const comment = order.deliveryComment || null;

    await sql`
      INSERT INTO orders (
        id, order_number, public_token, customer_name, customer_email,
        customer_phone, delivery_city, delivery_address, delivery_comment,
        subtotal_minor, shipping_minor, total_minor, locale
      ) VALUES (
        ${orderId}, ${order.orderNumber}, ${order.publicToken}, ${order.customerName},
        ${order.customerEmail}, ${order.customerPhone}, ${order.deliveryCity},
        ${order.deliveryAddress}, ${comment}, ${subtotalMinor}, ${shippingMinor},
        ${totalMinor}, ${order.locale}
      )
    `;

    for (const item of order.items) {
      const itemId = "item_" + Math.random().toString(36).substring(2, 10);
      const unitPriceMinor = item.unitPrice * 100;
      const lineTotalMinor = unitPriceMinor * item.quantity;

      await sql`
        INSERT INTO order_items (
          id, order_id, product_id, variant_id, product_name_snapshot,
          shade_name_snapshot, quantity, unit_price_minor, line_total_minor
        ) VALUES (
          ${itemId}, ${orderId}, ${item.productId}, ${item.variantId},
          ${item.productName}, ${item.shadeName}, ${item.quantity},
          ${unitPriceMinor}, ${lineTotalMinor}
        )
      `;
    }

    return true;
  } catch (err) {
    console.error("Failed to persist order to database:", err);
    return false;
  }
}

export async function updateOrderPaymentStatus(
  orderNumber: string,
  paymentStatus: "paid" | "unpaid" | "refunded" | "demo_paid",
  paymentId?: string
): Promise<boolean> {
  const sql = getDb();
  if (!sql || !isDbConfigured()) {
    console.log(`[Mock DB] Order ${orderNumber} payment status updated to: ${paymentStatus}`);
    return true;
  }

  try {
    await sql`
      UPDATE orders
      SET payment_status = ${paymentStatus},
          updated_at = CURRENT_TIMESTAMP
      WHERE order_number = ${orderNumber}
    `;
    return true;
  } catch (err) {
    console.error("Failed to update order payment status in database:", err);
    return false;
  }
}

