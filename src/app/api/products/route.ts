import { NextRequest, NextResponse } from "next/server";
import { fetchProductsFromDb } from "@/lib/db/dal";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const query = searchParams.get("q") || undefined;

  const products = await fetchProductsFromDb({
    category,
    sort,
    query,
  });

  return NextResponse.json({
    products,
    count: products.length,
  });
}
