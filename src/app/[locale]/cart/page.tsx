"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCart } from "@/store/cart-context";
import { useFavorites } from "@/store/favorites-context";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus, ShoppingBag, Heart } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Lang = "ru" | "en";

export default function CartPage() {
  const params = useParams();
  const locale = (params.locale as string) || "ru";
  const lang: Lang = locale === "en" ? "en" : "ru";

  const { items, removeItem, updateQuantity, total, count } = useCart();
  const { ids: favIds } = useFavorites();

  const t = {
    title: lang === "ru" ? "Корзина" : "Your Bag",
    emptyTitle: lang === "ru" ? "Корзина пуста" : "Your bag is empty",
    emptyDesc:
      lang === "ru"
        ? "Добавьте товары из каталога, чтобы оформить заказ."
        : "Browse the catalog to find your next beauty essential.",
    toCheckout: lang === "ru" ? "Оформить заказ" : "Proceed to Checkout",
    subtotal: lang === "ru" ? "Итого" : "Total",
    shipping: lang === "ru" ? "Доставка" : "Shipping",
    shippingFree: lang === "ru" ? "Бесплатно" : "Complimentary",
    catalogLink: lang === "ru" ? "Перейти в каталог" : "Browse catalog",
    items: lang === "ru" ? "товар(а)" : "items",
  };

  const shippingThreshold = 5000;
  const shippingCost = total >= shippingThreshold ? 0 : 390;
  const grandTotal = total + shippingCost;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-baseline gap-4 mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#171614] tracking-tight">
          {t.title}
        </h1>
        {count > 0 && (
          <span className="text-sm text-[#736E67]">
            {count} {t.items}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center border border-[#ECE7DF] bg-[#FFFFFF]">
          <ShoppingBag size={40} className="mx-auto text-[#D6D3D1] mb-4" weight="light" />
          <h2 className="font-heading text-xl font-normal text-[#171614] mb-2">{t.emptyTitle}</h2>
          <p className="text-sm text-[#736E67] max-w-[40ch] mx-auto mb-8">{t.emptyDesc}</p>
          <Link href={`/${locale}/catalog`}>
            <Button variant="outline">{t.catalogLink}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const name = lang === "ru" ? item.product.name : item.product.nameEn;
              const shadeName = lang === "ru" ? item.shade.name : item.shade.nameEn;
              return (
                <div
                  key={`${item.product.id}-${item.shade.id}`}
                  className="flex gap-4 sm:gap-5 p-4 bg-[#FFFFFF] border border-[#ECE7DF]"
                >
                  <Link
                    href={`/${locale}/product/${item.product.slug}`}
                    className="relative flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 overflow-hidden bg-[#F1ECE4]"
                  >
                    <Image
                      src={item.product.image}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/${locale}/product/${item.product.slug}`}
                        className="text-sm font-medium text-[#171614] hover:text-[#C47B78] transition-colors line-clamp-2 leading-snug"
                      >
                        {name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.product.id, item.shade.id)}
                        aria-label="Remove"
                        className="flex-shrink-0 p-1 text-[#D6D3D1] hover:text-[#C47B78] transition-colors"
                      >
                        <Trash size={15} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-[#736E67] uppercase tracking-wider">
                      <span
                        className="w-3 h-3 rounded-full ring-1 ring-[#ECE7DF]"
                        style={{ backgroundColor: item.shade.hex }}
                      />
                      {shadeName}
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity stepper */}
                      <div className="inline-flex items-center border border-[#ECE7DF]">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.shade.id, item.quantity - 1)
                          }
                          className="px-2.5 py-1.5 text-[#736E67] hover:bg-[#F1ECE4] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 py-1.5 text-xs font-medium text-[#171614] min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.shade.id, item.quantity + 1)
                          }
                          className="px-2.5 py-1.5 text-[#736E67] hover:bg-[#F1ECE4] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-sm font-medium text-[#171614]">
                        {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-[#FFFFFF] border border-[#ECE7DF] space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#736E67] font-medium">
                {lang === "ru" ? "Итого" : "Order Summary"}
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#736E67]">{t.subtotal}</span>
                  <span className="text-[#171614]">{total.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736E67]">{t.shipping}</span>
                  <span className="text-[#171614]">
                    {shippingCost === 0
                      ? t.shippingFree
                      : `${shippingCost.toLocaleString("ru-RU")} ₽`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-[10px] text-[#736E67]">
                    {lang === "ru"
                      ? `Бесплатно от ${shippingThreshold.toLocaleString("ru-RU")} ₽`
                      : `Free over ${shippingThreshold.toLocaleString("ru-RU")} ₽`}
                  </p>
                )}
              </div>

              <div className="border-t border-[#ECE7DF] pt-4 flex justify-between text-sm font-medium">
                <span className="text-[#171614]">
                  {lang === "ru" ? "К оплате" : "Estimated total"}
                </span>
                <span className="text-[#171614]">{grandTotal.toLocaleString("ru-RU")} ₽</span>
              </div>

              <Link href={`/${locale}/checkout`} className="block">
                <Button size="lg" className="w-full">
                  {t.toCheckout}
                </Button>
              </Link>

              <Link
                href={`/${locale}/catalog`}
                className="block text-center text-xs uppercase tracking-wider text-[#736E67] hover:text-[#171614] transition-colors mt-2"
              >
                {lang === "ru" ? "Продолжить покупки" : "Continue shopping"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
