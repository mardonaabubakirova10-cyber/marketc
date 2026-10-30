"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/mock-products";
import { Badge } from "@/components/ui/badge";
import { Heart } from "@phosphor-icons/react";
import { useFavorites } from "@/store/favorites-context";
import { useCart } from "@/store/cart-context";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  locale: string;
  lang: "ru" | "en";
}

const stockBadgeProps = {
  in_stock: null,
  low_stock: { ru: "Осталось мало", en: "Few left", variant: "rose" as const },
  out_of_stock: { ru: "Нет в наличии", en: "Sold out", variant: "subtle" as const },
};

export function ProductCard({ product, locale, lang }: ProductCardProps) {
  const { toggle, has } = useFavorites();
  const { addItem } = useCart();
  const [added, setAdded] = React.useState(false);

  const isFav = has(product.id);
  const name = lang === "ru" ? product.name : product.nameEn;
  const brandName = "FEMI SELECT";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.shades[0]) {
      addItem(product, product.shades[0], 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <article className="group relative flex flex-col bg-white rounded-[18px] border border-[#ECDFE4] p-3 sm:p-3.5 transition-all duration-300 hover:shadow-lg hover:border-[#BA073F]/30 hover:-translate-y-1">
      {/* Image container with clean white studio background */}
      <Link
        href={`/${locale}/product/${product.slug}`}
        className="block relative aspect-square w-full rounded-[14px] overflow-hidden bg-white border border-[#F3EAEE] mb-3"
      >
        <Image
          src={product.image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges: SALE, HIT, NEW */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercent && (
            <span className="bg-[#BA073F] text-white text-[11px] font-extrabold px-2 py-0.5 rounded-[6px] shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#2D2326] text-white text-[11px] font-bold px-2 py-0.5 rounded-[6px]">
              {lang === "ru" ? "ХИТ" : "HIT"}
            </span>
          )}
          {product.isNew && !discountPercent && (
            <span className="bg-[#BA073F] text-white text-[11px] font-bold px-2 py-0.5 rounded-[6px]">
              NEW
            </span>
          )}
        </div>

        {/* Favorite Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.id);
          }}
          aria-label={isFav ? "Убрать из избранного" : "Добавить в избранное"}
          className={cn(
            "absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110",
            isFav ? "text-[#BA073F]" : "text-[#6B5C5F] hover:text-[#BA073F]"
          )}
        >
          <Heart size={18} weight={isFav ? "fill" : "regular"} />
        </button>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1">
        {/* Brand tag */}
        <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#BA073F] mb-1">
          ÉLIXIR BEAUTÉ
        </span>

        {/* Title */}
        <Link href={`/${locale}/product/${product.slug}`} className="group-hover:text-[#BA073F] transition-colors">
          <h3 className="text-sm font-semibold text-[#2D2326] leading-snug line-clamp-2 min-h-[40px]">
            {name}
          </h3>
        </Link>

        {/* Shades preview */}
        {product.shades.length > 1 && (
          <div className="flex items-center gap-1.5 my-2">
            {product.shades.slice(0, 5).map((shade) => (
              <span
                key={shade.id}
                title={lang === "ru" ? shade.name : shade.nameEn}
                className="w-3.5 h-3.5 rounded-full border border-white shadow-xs ring-1 ring-[#ECDFE4]"
                style={{ backgroundColor: shade.hex }}
              />
            ))}
            {product.shades.length > 5 && (
              <span className="text-[10px] text-[#6B5C5F]">+{product.shades.length - 5}</span>
            )}
          </div>
        )}

        {/* Price & Buy Button */}
        <div className="mt-auto pt-3 border-t border-[#F3EAEE] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-[#2D2326] leading-none">
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-[#8E7E82] line-through mt-0.5">
                {product.originalPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={cn(
              "h-9 px-3.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0",
              added
                ? "bg-[#2D2326] text-white"
                : "border border-[#ECDFE4] bg-[#FCF5F7] text-[#2D2326] hover:bg-[#BA073F] hover:text-white hover:border-[#BA073F]"
            )}
          >
            {added ? (
              <span>✓ {lang === "ru" ? "В корзине" : "Added"}</span>
            ) : (
              <span>{lang === "ru" ? "В корзину" : "Add"}</span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
