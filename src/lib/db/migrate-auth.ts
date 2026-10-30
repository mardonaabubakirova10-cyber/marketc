/**
 * Applies Better Auth schema to Neon PostgreSQL.
 * Run: node --import tsx src/lib/db/migrate-auth.ts
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Pool } from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌  DATABASE_URL is not set. Add it to .env.local");
  process.exit(1);
}

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

const sql = readFileSync(join(__dirname, "auth-schema.sql"), "utf8");

try {
  console.log("⏳ Applying Better Auth schema...");
  await pool.query(sql);
  console.log("✅ Better Auth schema applied successfully.");
} catch (err) {
  console.error("❌ Migration failed:", err);
  process.exit(1);
} finally {
  await pool.end();
}
