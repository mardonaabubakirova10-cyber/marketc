import { NextRequest, NextResponse } from "next/server";
import { fetchProductBySlugFromDb } from "@/lib/db/dal";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = await fetchProductBySlugFromDb(slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}
