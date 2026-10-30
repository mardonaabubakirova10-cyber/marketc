import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, Locale, LOCALES } from "@/lib/i18n/config";
import { getRelatedProducts } from "@/lib/mock-products-service";
import { fetchProductBySlugFromDb } from "@/lib/db/dal";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ProductClient } from "./product-client";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    MOCK_PRODUCTS.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const product = await fetchProductBySlugFromDb(slug);
  if (!product) return {};
  const name = locale === "ru" ? product.name : product.nameEn;
  const tagline = locale === "ru" ? product.tagline : product.taglineEn;
  return {
    title: `${name} — ÉLIXIR BEAUTÉ`,
    description: tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const product = await fetchProductBySlugFromDb(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const lang = locale as Locale;

  return (
    <ProductClient product={product} related={related} locale={locale} lang={lang} />
  );
}
