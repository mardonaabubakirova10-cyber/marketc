"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Product, Category, Finish } from "@/data/mock-products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass, SlidersHorizontal, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type SortOption = "bestseller" | "newest" | "price_asc" | "price_desc";

interface CatalogClientProps {
  products: Product[];
  locale: string;
  lang: "ru" | "en";
  initialCategory?: Category | "all";
  initialSort?: SortOption;
  initialQuery?: string;
}

const CATEGORIES: { id: Category | "all"; ru: string; en: string }[] = [
  { id: "all", ru: "Все", en: "All" },
  { id: "lips", ru: "Губы", en: "Lips" },
  { id: "eyes", ru: "Глаза", en: "Eyes" },
  { id: "face", ru: "Лицо", en: "Face" },
  { id: "care", ru: "Уход", en: "Skincare" },
];

const SORT_OPTIONS: { id: SortOption; ru: string; en: string }[] = [
  { id: "bestseller", ru: "Популярные", en: "Bestsellers" },
  { id: "newest", ru: "Новинки", en: "New arrivals" },
  { id: "price_asc", ru: "Дешевле", en: "Price: low to high" },
  { id: "price_desc", ru: "Дороже", en: "Price: high to low" },
];

function filterProducts(
  products: Product[],
  category: Category | "all",
  sort: SortOption,
  query: string,
  finishes: Finish[]
): Product[] {
  let result = [...products];

  if (category !== "all") result = result.filter((p) => p.category === category);
  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }
  if (finishes.length > 0) result = result.filter((p) => finishes.includes(p.finish));

  switch (sort) {
    case "price_asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result = [...result.filter((p) => p.isNew), ...result.filter((p) => !p.isNew)];
      break;
    case "bestseller":
    default:
      result = [
        ...result.filter((p) => p.isBestseller),
        ...result.filter((p) => !p.isBestseller),
      ];
  }
  return result;
}

export function CatalogClient({
  products,
  locale,
  lang,
  initialCategory = "all",
  initialSort = "bestseller",
  initialQuery = "",
}: CatalogClientProps) {
  const [category, setCategory] = useState<Category | "all">(initialCategory as Category | "all");
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [query, setQuery] = useState(initialQuery);
  const [finishes, setFinishes] = useState<Finish[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const displayed = filterProducts(products, category, sort, query, finishes);

  const toggleFinish = (f: Finish) =>
    setFinishes((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const emptyMsg =
    lang === "ru"
      ? "По вашему запросу ничего не найдено. Попробуйте изменить фильтры."
      : "Nothing matched your search. Try adjusting the filters.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#171614] tracking-tight">
          {lang === "ru" ? "Каталог" : "Catalog"}
        </h1>
        <span className="text-xs text-[#736E67]">
          {displayed.length} {lang === "ru" ? "товаров" : "items"}
        </span>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <MagnifyingGlass
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#736E67]"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={lang === "ru" ? "Поиск по каталогу..." : "Search collection..."}
          className="w-full pl-9 pr-4 py-3 text-sm border border-[#ECE7DF] bg-[#FFFFFF] text-[#171614] placeholder:text-[#A8A29E] focus:border-[#171614] focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#736E67] hover:text-[#171614]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Tabs + Filter toggle */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id as Category | "all")}
            className={cn(
              "px-4 py-1.5 text-xs uppercase tracking-wider transition-colors border",
              category === cat.id
                ? "bg-[#171614] text-[#F7F4EF] border-[#171614]"
                : "text-[#736E67] border-[#ECE7DF] hover:border-[#171614] hover:text-[#171614]"
            )}
          >
            {lang === "ru" ? cat.ru : cat.en}
          </button>
        ))}
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="ml-auto flex items-center gap-1.5 px-4 py-1.5 text-xs uppercase tracking-wider border border-[#ECE7DF] hover:border-[#171614] text-[#736E67] hover:text-[#171614] transition-colors"
        >
          <SlidersHorizontal size={13} />
          {lang === "ru" ? "Фильтры" : "Filters"}
        </button>
      </div>

      {/* Expandable Filters + Sort */}
      {filtersOpen && (
        <div className="mb-6 p-5 border border-[#ECE7DF] bg-[#FFFFFF] grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#736E67] mb-3">
              {lang === "ru" ? "Финиш" : "Finish"}
            </p>
            <div className="flex flex-wrap gap-2">
              {(["matte", "satin", "glossy", "sheer"] as Finish[]).map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFinish(f)}
                  className={cn(
                    "px-3 py-1 text-xs border transition-colors",
                    finishes.includes(f)
                      ? "bg-[#171614] text-[#F7F4EF] border-[#171614]"
                      : "border-[#ECE7DF] text-[#736E67] hover:border-[#171614]"
                  )}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#736E67] mb-3">
              {lang === "ru" ? "Сортировка" : "Sort"}
            </p>
            <div className="flex flex-col gap-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSort(opt.id)}
                  className={cn(
                    "text-xs text-left px-3 py-1.5 border transition-colors",
                    sort === opt.id
                      ? "bg-[#171614] text-[#F7F4EF] border-[#171614]"
                      : "border-[#ECE7DF] text-[#736E67] hover:border-[#171614]"
                  )}
                >
                  {lang === "ru" ? opt.ru : opt.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sort pills (always visible) */}
      {!filtersOpen && (
        <div className="flex gap-2 flex-wrap mb-6">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSort(opt.id)}
              className={cn(
                "px-3 py-1 text-[10px] uppercase tracking-wider border transition-colors",
                sort === opt.id
                  ? "border-[#171614] text-[#171614]"
                  : "border-[#ECE7DF] text-[#A8A29E] hover:border-[#736E67]"
              )}
            >
              {lang === "ru" ? opt.ru : opt.en}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {displayed.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-[#736E67] max-w-[40ch] mx-auto">{emptyMsg}</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setFinishes([]);
            }}
          >
            {lang === "ru" ? "Сбросить фильтры" : "Clear filters"}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {displayed.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
