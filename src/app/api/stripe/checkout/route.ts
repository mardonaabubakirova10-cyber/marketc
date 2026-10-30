import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
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
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Build line items for Stripe Checkout
    const lineItems = items.map((item: any) => {
      const unitPrice = Math.round(Number(item.unitPrice || item.price || 0) * 100); // roubles → kopecks
      const qty = Math.max(1, Number(item.quantity || 1));
      const label =
        locale === "ru"
          ? `${item.productName} — ${item.shadeName}`
          : `${item.productName} — ${item.shadeName}`;

      return {
        price_data: {
          currency: "rub",
          product_data: { name: label },
          unit_amount: unitPrice,
        },
        quantity: qty,
      };
    });

    // Compute shipping
    const subtotal = items.reduce((s: number, i: any) => {
      return s + Number(i.unitPrice || 0) * Math.max(1, Number(i.quantity || 1));
    }, 0);
    const shippingCost = subtotal >= 5000 ? 0 : 390;

    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "rub",
          product_data: { name: locale === "ru" ? "Доставка" : "Shipping" },
          unit_amount: shippingCost * 100,
        },
        quantity: 1,
      });
    }

    // Pre-create order in DB with payment_status = 'unpaid'
    const orderNumber = "EB-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const publicToken = "tok_" + Math.random().toString(36).slice(2, 10);

    const orderItems = items.map((i: any) => ({
      productId: String(i.productId || i.id),
      variantId: String(i.variantId || i.shadeId || "default"),
      productName: String(i.productName || i.name || "Product"),
      shadeName: String(i.shadeName || "Standard"),
      quantity: Math.max(1, Number(i.quantity || 1)),
      unitPrice: Number(i.unitPrice || i.price || 0),
    }));

    await saveOrderToDb({
      orderNumber,
      publicToken,
      customerName,
      customerEmail,
      customerPhone,
      deliveryCity,
      deliveryAddress,
      deliveryComment,
      subtotal,
      shipping: shippingCost,
      total: subtotal + shippingCost,
      locale,
      items: orderItems,
    });

    // Create Stripe Checkout Session
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerEmail,
      line_items: lineItems,
      metadata: {
        orderNumber,
        publicToken,
      },
      success_url: `${appUrl}/${locale}/order/${publicToken}?payment=success`,
      cancel_url: `${appUrl}/${locale}/checkout?payment=cancelled`,
    });

    return Response.json({
      sessionId: session.id,
      sessionUrl: session.url,
      orderNumber,
      publicToken,
    });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return Response.json(
      { error: err.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

