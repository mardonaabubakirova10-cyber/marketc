import { NextRequest, NextResponse } from "next/server";
import { saveOrderToDb } from "@/lib/db/dal";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryCity,
      deliveryAddress,
      deliveryComment,
      items,
      locale = "ru",
    } = body;

    if (!customerName || !customerEmail || !customerPhone || !deliveryCity || !deliveryAddress) {
      return NextResponse.json(
        { error: "Missing required contact or delivery fields" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order items cannot be empty" },
        { status: 400 }
      );
    }

    // Server-side calculation & validation
    let subtotal = 0;
    const orderItems = items.map((i: any) => {
      const price = Number(i.unitPrice || i.price || 0);
      const qty = Math.max(1, Number(i.quantity || 1));
      subtotal += price * qty;
      return {
        productId: String(i.productId || i.id),
        variantId: String(i.variantId || i.shadeId || "default"),
        productName: String(i.productName || i.name || "Product"),
        shadeName: String(i.shadeName || "Standard"),
        quantity: qty,
        unitPrice: price,
      };
    });

    const shipping = subtotal >= 5000 ? 0 : 390;
    const total = subtotal + shipping;
    const orderNumber = "EB-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const publicToken = "tok_" + Math.random().toString(36).slice(2, 10);

    const saved = await saveOrderToDb({
      orderNumber,
      publicToken,
      customerName,
      customerEmail,
      customerPhone,
      deliveryCity,
      deliveryAddress,
      deliveryComment,
      subtotal,
      shipping,
      total,
      locale,
      items: orderItems,
    });

    return NextResponse.json({
      success: true,
      orderNumber,
      publicToken,
      subtotal,
      shipping,
      total,
      currency: "RUB",
      dbPersisted: saved,
    });
  } catch (err: any) {
    console.error("Order creation error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
