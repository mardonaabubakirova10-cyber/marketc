"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductShade } from "@/data/mock-products";
import { useCart } from "@/store/cart-context";
import { useFavorites } from "@/store/favorites-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Heart, ArrowLeft, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";

interface ProductClientProps {
  product: Product;
  related: Product[];
  locale: string;
  lang: "ru" | "en";
}

const stockMap = {
  in_stock: { ru: "В наличии", en: "In stock", color: "text-[#8A9A86]" },
  low_stock: { ru: "Осталось мало", en: "Few left", color: "text-[#C47B78]" },
  out_of_stock: { ru: "Нет в наличии", en: "Sold out", color: "text-[#736E67]" },
};

export function ProductClient({ product, related, locale, lang }: ProductClientProps) {
  const { addItem } = useCart();
  const { toggle, has } = useFavorites();
  const isFav = has(product.id);

  const [selectedShade, setSelectedShade] = useState<ProductShade>(product.shades[0]);
  const [activeImage, setActiveImage] = useState(product.image);
  const [added, setAdded] = useState(false);

  const name = lang === "ru" ? product.name : product.nameEn;
  const description = lang === "ru" ? product.description : product.descriptionEn;
  const ingredients = lang === "ru" ? product.ingredients : product.ingredientsEn;
  const application = lang === "ru" ? product.application : product.applicationEn;
  const shadeLabel = lang === "ru" ? "Оттенок" : "Shade";
  const stockInfo = stockMap[selectedShade.stock];

  const handleAddToCart = () => {
    if (selectedShade.stock === "out_of_stock") return;
    addItem(product, selectedShade);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link
        href={`/${locale}/catalog`}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#736E67] hover:text-[#171614] mb-8 transition-colors"
      >
        <ArrowLeft size={14} />
        {lang === "ru" ? "Каталог" : "Catalog"}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#F1ECE4]">
            <Image
              src={activeImage}
              alt={name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.isNew && (
              <div className="absolute top-4 left-4">
                <Badge variant="default">{lang === "ru" ? "Новинка" : "New"}</Badge>
              </div>
            )}
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={cn(
                    "relative w-16 h-20 overflow-hidden border-2 transition-colors",
                    activeImage === img ? "border-[#171614]" : "border-transparent hover:border-[#ECE7DF]"
                  )}
                >
                  <Image src={img} alt={`${name} view ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#736E67] mb-2">
              {lang === "ru" ? product.category === "lips" ? "Губы" : product.category === "eyes" ? "Глаза" : product.category === "face" ? "Лицо" : "Уход" : product.category}
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#171614] leading-tight tracking-tight">
              {name}
            </h1>
            <p className="mt-3 text-sm text-[#736E67] leading-relaxed max-w-[52ch]">
              {lang === "ru" ? product.tagline : product.taglineEn}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-medium text-[#171614]">
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#A8A29E] line-through">
                {product.originalPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>

          {/* Shades */}
          {product.shades.length > 1 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-[#736E67] mb-3">
                {shadeLabel}: <span className="text-[#171614] font-medium">{lang === "ru" ? selectedShade.name : selectedShade.nameEn}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {product.shades.map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedShade(shade)}
                    disabled={shade.stock === "out_of_stock"}
                    title={lang === "ru" ? shade.name : shade.nameEn}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all relative",
                      selectedShade.id === shade.id
                        ? "border-[#171614] ring-2 ring-offset-1 ring-[#171614]/30"
                        : "border-white shadow hover:scale-110",
                      shade.stock === "out_of_stock" && "opacity-40 cursor-not-allowed"
                    )}
                    style={{ backgroundColor: shade.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stock */}
          <p className={cn("text-xs uppercase tracking-wider font-medium", stockInfo.color)}>
            {lang === "ru" ? stockInfo.ru : stockInfo.en}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={selectedShade.stock === "out_of_stock"}
              className="flex-1 flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check size={16} />
                  {lang === "ru" ? "Добавлено" : "Added"}
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  {lang === "ru" ? "В корзину" : "Add to bag"}
                </>
              )}
            </Button>
            <button
              onClick={() => toggle(product.id)}
              aria-label={isFav ? "Убрать из избранного" : "В избранное"}
              className={cn(
                "flex items-center justify-center w-14 border border-[#ECE7DF] transition-colors",
                isFav ? "text-[#C47B78] border-[#C47B78]/40" : "text-[#736E67] hover:text-[#C47B78] hover:border-[#C47B78]/40"
              )}
            >
              <Heart size={20} weight={isFav ? "fill" : "regular"} />
            </button>
          </div>

          {/* Description tabs */}
          <div className="border-t border-[#ECE7DF] pt-6 space-y-5">
            <details open className="group">
              <summary className="flex justify-between cursor-pointer text-xs uppercase tracking-wider text-[#171614] hover:text-[#C47B78] transition-colors list-none">
                {lang === "ru" ? "Описание" : "About"}
                <span className="ml-2 transition-transform group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-4 text-sm text-[#736E67] leading-relaxed max-w-[55ch]">{description}</p>
            </details>
            <details className="group">
              <summary className="flex justify-between cursor-pointer text-xs uppercase tracking-wider text-[#171614] hover:text-[#C47B78] transition-colors list-none">
                {lang === "ru" ? "Способ нанесения" : "Application"}
                <span className="ml-2 transition-transform group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-4 text-sm text-[#736E67] leading-relaxed max-w-[55ch]">{application}</p>
            </details>
            <details className="group">
              <summary className="flex justify-between cursor-pointer text-xs uppercase tracking-wider text-[#171614] hover:text-[#C47B78] transition-colors list-none">
                {lang === "ru" ? "Состав" : "Key ingredients"}
                <span className="ml-2 transition-transform group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-4 text-xs text-[#736E67] leading-relaxed">{ingredients}</p>
            </details>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[#171614] tracking-tight mb-8">
            {lang === "ru" ? "Вам также может понравиться" : "You may also like"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} lang={lang} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
