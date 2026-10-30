import { NextRequest, NextResponse } from "next/server";
import { getDb, isDbConfigured } from "@/lib/db/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ publicToken: string }> }
) {
  const { publicToken } = await params;

  const sql = getDb();
  if (!sql || !isDbConfigured()) {
    return NextResponse.json({
      order: {
        orderNumber: "EB-" + publicToken.slice(0, 5).toUpperCase(),
        publicToken,
        status: "confirmed",
        paymentStatus: "demo_paid",
        deliveryCity: "Москва",
        currency: "RUB",
        subtotal: 4380,
        shipping: 0,
        total: 4380,
      },
      source: "mock",
    });
  }

  try {
    const orders = (await sql`
      SELECT * FROM orders WHERE public_token = ${publicToken} LIMIT 1
    `) as Record<string, any>[];

    if (!orders || orders.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = orders[0];
    const items = (await sql`
      SELECT * FROM order_items WHERE order_id = ${order.id}
    `) as Record<string, any>[];

    return NextResponse.json({
      order: {
        ...order,
        subtotal: order.subtotal_minor / 100,
        shipping: order.shipping_minor / 100,
        total: order.total_minor / 100,
        items,
      },
      source: "neon_db",
    });
  } catch (err) {
    console.error("Order lookup error:", err);
    return NextResponse.json({ error: "Failed to retrieve order" }, { status: 500 });
  }
}
