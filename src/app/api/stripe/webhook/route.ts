import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { updateOrderPaymentStatus } from "@/lib/db/dal";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return Response.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const orderNumber = session.metadata?.orderNumber;
      const stripePaymentId = session.payment_intent as string;

      if (orderNumber) {
        await updateOrderPaymentStatus(orderNumber, "paid", stripePaymentId);
        console.log(`Payment confirmed for order ${orderNumber}`);
      }
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;
      const orderNumber = session.metadata?.orderNumber;
      if (orderNumber) {
        await updateOrderPaymentStatus(orderNumber, "unpaid");
        console.log(`Payment expired for order ${orderNumber}`);
      }
      break;
    }

    default:
      // Unhandled event type — that's fine
      break;
  }

  return Response.json({ received: true });
}

