"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useFavorites } from "@/store/favorites-context";
import { useCart } from "@/store/cart-context";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "@phosphor-icons/react";
import { ProductCard } from "@/components/product/product-card";

type Lang = "ru" | "en";

export default function FavoritesPage() {
  const params = useParams();
  const locale = (params.locale as string) || "ru";
  const lang: Lang = locale === "en" ? "en" : "ru";

  const { ids, toggle } = useFavorites();
  const { addItem } = useCart();

  const products = MOCK_PRODUCTS.filter((p) => ids.includes(p.id));

  const t = {
    title: lang === "ru" ? "Избранное" : "Wishlist",
    emptyTitle: lang === "ru" ? "Список желаний пуст" : "Your wishlist is empty",
    emptyDesc:
      lang === "ru"
        ? "Добавляйте понравившиеся средства, чтобы не потерять их."
        : "Save products you love to find them easily later.",
    browse: lang === "ru" ? "Перейти в каталог" : "Browse catalog",
    addAll: lang === "ru" ? "Добавить всё в корзину" : "Add all to bag",
    items: lang === "ru" ? "товар(а)" : "items",
  };

  const handleAddAll = () => {
    products.forEach((p) => {
      const shade = p.shades.find((s) => s.stock !== "out_of_stock") ?? p.shades[0];
      addItem(p, shade);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-4">
          <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#171614] tracking-tight">
            {t.title}
          </h1>
          {products.length > 0 && (
            <span className="text-sm text-[#736E67]">
              {products.length} {t.items}
            </span>
          )}
        </div>
        {products.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleAddAll}>
            <ShoppingBag size={14} className="mr-2" />
            {t.addAll}
          </Button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="py-24 text-center border border-[#ECE7DF] bg-[#FFFFFF]">
          <Heart size={40} className="mx-auto text-[#D6D3D1] mb-4" weight="light" />
          <h2 className="font-heading text-xl font-normal text-[#171614] mb-2">{t.emptyTitle}</h2>
          <p className="text-sm text-[#736E67] max-w-[40ch] mx-auto mb-8">{t.emptyDesc}</p>
          <Link href={`/${locale}/catalog`}>
            <Button variant="outline">{t.browse}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
