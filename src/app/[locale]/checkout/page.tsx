"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/store/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, ShoppingBag, Warning } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Lang = "ru" | "en";
type Step = "form" | "payment" | "confirmed";

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  comment: string;
}

function makeOrderNumber() {
  return "EB-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "ru";
  const lang: Lang = locale === "en" ? "en" : "ru";

  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>("form");
  const [orderNumber, setOrderNumber] = useState("");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isPayingWithStripe, setIsPayingWithStripe] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    comment: "",
  });

  const shippingCost = total >= 5000 ? 0 : 390;
  const grandTotal = total + shippingCost;

  const t = {
    title: lang === "ru" ? "Оформление заказа" : "Checkout",
    contacts: lang === "ru" ? "Контактные данные" : "Contact Information",
    delivery: lang === "ru" ? "Адрес доставки" : "Delivery Address",
    name: lang === "ru" ? "Имя и фамилия" : "Full Name",
    email: "Email",
    phone: lang === "ru" ? "Телефон" : "Phone",
    city: lang === "ru" ? "Город" : "City",
    address: lang === "ru" ? "Адрес (улица, дом, квартира)" : "Street address, apt",
    comment: lang === "ru" ? "Комментарий" : "Delivery note",
    proceed: lang === "ru" ? "К оплате" : "Proceed to payment",
    confirm: lang === "ru" ? "Подтвердить тестовый заказ" : "Confirm demo order",
    demoNotice:
      lang === "ru"
        ? "⚠ Тестовый режим — оплата не производится. Это демонстрация оформления заказа."
        : "⚠ Demo mode — no real payment. This is a simulated checkout flow.",
    success: lang === "ru" ? "Заказ оформлен" : "Order Confirmed",
    successDesc:
      lang === "ru"
        ? "Ваш тестовый заказ успешно создан. Номер заказа:"
        : "Your demo order has been placed. Order reference:",
    backHome: lang === "ru" ? "На главную" : "Return home",
    toCatalog: lang === "ru" ? "В каталог" : "Keep shopping",
    required: lang === "ru" ? "Обязательное поле" : "Required",
    invalidEmail: lang === "ru" ? "Некорректный email" : "Invalid email",
    emptyCart: lang === "ru" ? "Корзина пуста" : "Your bag is empty",
    emptyCartDesc:
      lang === "ru"
        ? "Добавьте товары в корзину, чтобы оформить заказ."
        : "Add items to your bag before checking out.",
    subtotal: lang === "ru" ? "Товары" : "Subtotal",
    shipping: lang === "ru" ? "Доставка" : "Shipping",
    shippingFree: lang === "ru" ? "Бесплатно" : "Complimentary",
    grandTotal: lang === "ru" ? "К оплате" : "Total",
  };

  function validate(): boolean {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = t.required;
    if (!form.email.trim()) errs.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t.invalidEmail;
    if (!form.phone.trim()) errs.phone = t.required;
    if (!form.city.trim()) errs.city = t.required;
    if (!form.address.trim()) errs.address = t.required;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setStep("payment");
  };

  const handlePayWithStripe = async () => {
    try {
      setIsPayingWithStripe(true);
      setStripeError(null);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          deliveryCity: form.city,
          deliveryAddress: form.address,
          deliveryComment: form.comment,
          locale,
          items: items.map((i) => ({
            productId: i.product.id,
            variantId: i.shade.id,
            productName: lang === "ru" ? i.product.name : i.product.nameEn,
            shadeName: lang === "ru" ? i.shade.name : i.shade.nameEn,
            quantity: i.quantity,
            unitPrice: i.product.price,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      if (data.sessionUrl) {
        clearCart();
        window.location.href = data.sessionUrl;
      }
    } catch (err: any) {
      setStripeError(err.message || "Ошибка перехода к тестовой оплате");
      setIsPayingWithStripe(false);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          deliveryCity: form.city,
          deliveryAddress: form.address,
          deliveryComment: form.comment,
          locale,
          items: items.map((i) => ({
            productId: i.product.id,
            variantId: i.shade.id,
            productName: lang === "ru" ? i.product.name : i.product.nameEn,
            shadeName: lang === "ru" ? i.shade.name : i.shade.nameEn,
            quantity: i.quantity,
            unitPrice: i.product.price,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrderNumber(data.orderNumber);
      } else {
        setOrderNumber(makeOrderNumber());
      }
    } catch {
      setOrderNumber(makeOrderNumber());
    } finally {
      clearCart();
      setStep("confirmed");
    }
  };

  const field = (
    id: keyof FormData,
    label: string,
    type = "text",
    required = true
  ) => (
    <Input
      id={id}
      type={type}
      label={label}
      value={form[id]}
      onChange={(e) => {
        setForm((f) => ({ ...f, [id]: e.target.value }));
        if (errors[id]) setErrors((er) => ({ ...er, [id]: undefined }));
      }}
      error={errors[id]}
      placeholder=""
      required={required}
    />
  );

  if (items.length === 0 && step !== "confirmed") {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <ShoppingBag size={40} className="mx-auto text-[#D6D3D1] mb-4" weight="light" />
        <h1 className="font-heading text-2xl font-normal text-[#171614] mb-2">{t.emptyCart}</h1>
        <p className="text-sm text-[#736E67] mb-8">{t.emptyCartDesc}</p>
        <Link href={`/${locale}/catalog`}>
          <Button>{t.toCatalog}</Button>
        </Link>
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-14 h-14 rounded-full bg-[#E8EDE7] flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-[#8A9A86]" weight="bold" />
        </div>
        <h1 className="font-heading text-3xl font-normal text-[#171614] mb-3">{t.success}</h1>
        <p className="text-sm text-[#736E67] mb-2">{t.successDesc}</p>
        <p className="text-lg font-medium text-[#171614] mb-6">{orderNumber}</p>
        <div className="flex flex-col gap-3">
          <Link href={`/${locale}/order/${orderNumber.toLowerCase()}`}>
            <Button className="w-full">
              {lang === "ru" ? "Детали заказа" : "View Order Details"}
            </Button>
          </Link>
          <Link href={`/${locale}/catalog`}>
            <Button variant="outline" className="w-full">{t.toCatalog}</Button>
          </Link>
          <Link href={`/${locale}`}>
            <Button variant="ghost" className="w-full">{t.backHome}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#171614] tracking-tight mb-8">
        {t.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form / Payment step */}
        <div className="lg:col-span-2">
          {step === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-8" noValidate>
              <section className="space-y-4">
                <h2 className="text-xs uppercase tracking-[0.2em] text-[#736E67] font-medium pb-2 border-b border-[#ECE7DF]">
                  {t.contacts}
                </h2>
                {field("name", t.name)}
                {field("email", "Email", "email")}
                {field("phone", t.phone, "tel")}
              </section>

              <section className="space-y-4">
                <h2 className="text-xs uppercase tracking-[0.2em] text-[#736E67] font-medium pb-2 border-b border-[#ECE7DF]">
                  {t.delivery}
                </h2>
                {field("city", t.city)}
                {field("address", t.address)}
                {field("comment", t.comment, "text", false)}
              </section>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                {t.proceed}
              </Button>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-6">
              <div className="p-5 bg-[#F3E5E3]/60 border border-[#C47B78]/20 flex gap-3">
                <Warning size={18} className="text-[#C47B78] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#736E67] leading-relaxed">{t.demoNotice}</p>
              </div>

              <div className="p-6 bg-[#FFFFFF] border border-[#ECE7DF] space-y-3">
                <h2 className="text-xs uppercase tracking-[0.2em] text-[#736E67] font-medium">
                  {lang === "ru" ? "Данные для доставки" : "Delivery details"}
                </h2>
                <p className="text-sm text-[#171614]">{form.name}</p>
                <p className="text-sm text-[#736E67]">{form.city}, {form.address}</p>
                <p className="text-sm text-[#736E67]">{form.email} · {form.phone}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handlePayWithStripe}
                  size="lg"
                  disabled={isPayingWithStripe}
                  className="bg-[#635BFF] hover:bg-[#5349e0] text-white"
                >
                  {isPayingWithStripe
                    ? (lang === "ru" ? "Переход к оплате..." : "Redirecting...")
                    : (lang === "ru" ? "Оплатить картой (Stripe Тест)" : "Pay via Stripe (Test)")}
                </Button>
                <Button onClick={handleConfirmOrder} variant="outline" size="lg">
                  {t.confirm}
                </Button>
                <Button variant="ghost" onClick={() => setStep("form")} size="lg">
                  {lang === "ru" ? "Изменить данные" : "Edit details"}
                </Button>
              </div>

              {stripeError && (
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
                  {stripeError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-[#FFFFFF] border border-[#ECE7DF] space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#736E67] font-medium">
              {lang === "ru" ? "Ваш заказ" : "Your order"}
            </h2>

            <ul className="space-y-3">
              {items.map((item) => {
                const name = lang === "ru" ? item.product.name : item.product.nameEn;
                const shadeName = lang === "ru" ? item.shade.name : item.shade.nameEn;
                return (
                  <li
                    key={`${item.product.id}-${item.shade.id}`}
                    className="flex justify-between gap-2 text-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[#171614] truncate">{name}</p>
                      <p className="text-xs text-[#736E67]">
                        {shadeName} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-[#171614] flex-shrink-0">
                      {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-[#ECE7DF] pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-[#736E67]">
                <span>{t.subtotal}</span>
                <span>{total.toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="flex justify-between text-[#736E67]">
                <span>{t.shipping}</span>
                <span>{shippingCost === 0 ? t.shippingFree : `${shippingCost} ₽`}</span>
              </div>
              <div className="flex justify-between font-medium text-[#171614] pt-2 border-t border-[#ECE7DF]">
                <span>{t.grandTotal}</span>
                <span>{grandTotal.toLocaleString("ru-RU")} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
