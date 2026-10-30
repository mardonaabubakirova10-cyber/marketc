import { neon } from "@neondatabase/serverless";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/data/mock-products";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("ERROR: DATABASE_URL is not provided in environment variables.");
    process.exit(1);
  }

  console.log("Connecting to Neon PostgreSQL...");
  const sql = neon(databaseUrl);

  const schemaPath = path.join(__dirname, "schema.sql");
  if (fs.existsSync(schemaPath)) {
    console.log("Applying schema.sql...");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    const statements = schemaSql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));

    for (const stmt of statements) {
      await (sql as any)(stmt);
    }
    console.log("Schema applied successfully.");
  }

  console.log("Seeding categories...");
  for (const cat of MOCK_CATEGORIES) {
    await sql`
      INSERT INTO categories (id, slug, name_ru, name_en, sort_order)
      VALUES (${cat.id}, ${cat.slug}, ${cat.name}, ${cat.nameEn}, 0)
      ON CONFLICT (id) DO UPDATE SET
        name_ru = EXCLUDED.name_ru,
        name_en = EXCLUDED.name_en
    `;
  }

  console.log("Seeding products and variants...");
  for (const p of MOCK_PRODUCTS) {
    const priceMinor = p.price * 100;
    const origPriceMinor = p.originalPrice ? p.originalPrice * 100 : null;
    const isNew = Boolean(p.isNew);
    const isBestseller = Boolean(p.isBestseller);
    const imagesJson = JSON.stringify(p.images);
    const tagsJson = JSON.stringify(p.tags);

    await sql`
      INSERT INTO products (
        id, slug, category_id, name_ru, name_en, tagline_ru, tagline_en,
        description_ru, description_en, ingredients_ru, ingredients_en,
        application_ru, application_en, price_minor, original_price_minor,
        currency, finish, stock_status, is_new, is_bestseller, primary_image,
        gallery_images, tags
      ) VALUES (
        ${p.id}, ${p.slug}, ${p.category}, ${p.name}, ${p.nameEn}, ${p.tagline},
        ${p.taglineEn}, ${p.description}, ${p.descriptionEn}, ${p.ingredients},
        ${p.ingredientsEn}, ${p.application}, ${p.applicationEn}, ${priceMinor},
        ${origPriceMinor}, ${p.currency}, ${p.finish}, ${p.stock}, ${isNew},
        ${isBestseller}, ${p.image}, ${imagesJson}, ${tagsJson}
      )
      ON CONFLICT (id) DO UPDATE SET
        name_ru = EXCLUDED.name_ru,
        price_minor = EXCLUDED.price_minor,
        stock_status = EXCLUDED.stock_status
    `;

    for (const shade of p.shades) {
      const shadePriceMinor = shade.price ? shade.price * 100 : null;
      await sql`
        INSERT INTO product_variants (
          id, product_id, name_ru, name_en, hex_color, price_minor, stock_status
        ) VALUES (
          ${shade.id}, ${p.id}, ${shade.name}, ${shade.nameEn}, ${shade.hex},
          ${shadePriceMinor}, ${shade.stock}
        )
        ON CONFLICT (id) DO UPDATE SET
          name_ru = EXCLUDED.name_ru,
          stock_status = EXCLUDED.stock_status
      `;
    }
  }

  console.log("Seeding complete! Database is ready.");
}

main().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
