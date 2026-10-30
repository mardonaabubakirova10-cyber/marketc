import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, Locale, LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { fetchProductsFromDb } from "@/lib/db/dal";
import { CatalogClient } from "./catalog-client";
import { Category } from "@/data/mock-products";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${dict.nav.catalog} — ${dict.common.brandName}`,
    description: locale === "ru"
      ? "Каталог декоративной косметики и уходовых средств."
      : "Shop the full collection of editorial cosmetics and skincare.",
  };
}

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;

  if (!isValidLocale(locale)) notFound();

  const lang = locale as Locale;
  const products = await fetchProductsFromDb({
    category: sp.category,
    sort: sp.sort,
    query: sp.q,
  });

  const validCategories = ["lips", "eyes", "face", "care"];
  const initialCategory = validCategories.includes(sp.category ?? "")
    ? (sp.category as Category)
    : "all";

  const validSorts = ["bestseller", "newest", "price_asc", "price_desc"];
  const initialSort = validSorts.includes(sp.sort ?? "") ? sp.sort as "bestseller" | "newest" | "price_asc" | "price_desc" : "bestseller";

  return (
    <CatalogClient
      products={products}
      locale={locale}
      lang={lang}
      initialCategory={initialCategory as Category}
      initialSort={initialSort}
      initialQuery={sp.q ?? ""}
    />
  );
}
