import { NextResponse } from "next/server";
import { MOCK_CATEGORIES } from "@/data/mock-products";

export async function GET() {
  return NextResponse.json({
    categories: MOCK_CATEGORIES,
  });
}
