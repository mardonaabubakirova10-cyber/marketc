-- Neon PostgreSQL Schema for Élixir Beauté Cosmetics

-- Enable UUID extension if available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categories
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(64) UNIQUE NOT NULL,
  name_ru VARCHAR(128) NOT NULL,
  name_en VARCHAR(128) NOT NULL,
  description_ru TEXT,
  description_en TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  category_id VARCHAR(64) REFERENCES categories(id) ON DELETE SET NULL,
  name_ru VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  tagline_ru TEXT,
  tagline_en TEXT,
  description_ru TEXT,
  description_en TEXT,
  ingredients_ru TEXT,
  ingredients_en TEXT,
  application_ru TEXT,
  application_en TEXT,
  price_minor INT NOT NULL, -- price in minor units (RUB: kopecks, e.g. 249000 for 2490 ₽)
  original_price_minor INT,
  currency VARCHAR(8) DEFAULT 'RUB',
  finish VARCHAR(32) NOT NULL, -- matte, satin, glossy, sheer
  stock_status VARCHAR(32) DEFAULT 'in_stock', -- in_stock, low_stock, out_of_stock
  is_new BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  primary_image TEXT NOT NULL,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Product Variants / Shades
CREATE TABLE IF NOT EXISTS product_variants (
  id VARCHAR(64) PRIMARY KEY,
  product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku VARCHAR(64),
  name_ru VARCHAR(128) NOT NULL,
  name_en VARCHAR(128) NOT NULL,
  hex_color VARCHAR(16) NOT NULL,
  price_minor INT, -- if differs from base product price
  stock_status VARCHAR(32) DEFAULT 'in_stock',
  stock_quantity INT DEFAULT 100,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Orders
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(64) PRIMARY KEY,
  order_number VARCHAR(32) UNIQUE NOT NULL,
  public_token VARCHAR(64) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(64) NOT NULL,
  delivery_city VARCHAR(128) NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_comment TEXT,
  subtotal_minor INT NOT NULL,
  shipping_minor INT NOT NULL,
  total_minor INT NOT NULL,
  currency VARCHAR(8) DEFAULT 'RUB',
  status VARCHAR(32) DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  payment_status VARCHAR(32) DEFAULT 'demo_paid', -- demo_paid, unpaid, paid, refunded
  locale VARCHAR(8) DEFAULT 'ru',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Order Items (immutable snapshot of product & price at checkout)
CREATE TABLE IF NOT EXISTS order_items (
  id VARCHAR(64) PRIMARY KEY,
  order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(64),
  variant_id VARCHAR(64),
  product_name_snapshot VARCHAR(255) NOT NULL,
  shade_name_snapshot VARCHAR(128) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price_minor INT NOT NULL,
  line_total_minor INT NOT NULL,
  image_snapshot TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_public_token ON orders(public_token);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
