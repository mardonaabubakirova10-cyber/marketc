import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isValidLocale, Locale, LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getBestsellers, getNewArrivals } from "@/lib/mock-products-service";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_CATEGORIES } from "@/data/mock-products";

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
    title: `${dict.common.brandName} — ${dict.common.brandSubtitle}`,
    description: dict.footer.editorialNote,
    openGraph: {
      title: `${dict.common.brandName} — ${dict.common.brandSubtitle}`,
      description: dict.footer.editorialNote,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const bestsellers = getBestsellers(8);
  const newArrivals = getNewArrivals(4);

  const popularBrands = [
    { name: "Chanel", logo: "C", count: "120+ тов." },
    { name: "Dior", logo: "D", count: "95+ тов." },
    { name: "YSL", logo: "Y", count: "80+ тов." },
    { name: "Giorgio Armani", logo: "G", count: "110+ тов." },
    { name: "Gucci", logo: "G", count: "60+ тов." },
    { name: "Louis Vuitton", logo: "L", count: "75+ тов." },
    { name: "Hermès", logo: "H", count: "45+ тов." },
    { name: "Prada", logo: "P", count: "50+ тов." },
    { name: "Balmain", logo: "B", count: "30+ тов." },
  ];

  const categoryChips = [
    { id: "lips", label: lang === "ru" ? "Помады & Тинты" : "Lips & Tints", icon: "💄", color: "bg-[#F8E6EC] text-[#BA073F]" },
    { id: "face", label: lang === "ru" ? "Кушоны & Тон" : "Cushions & Foundation", icon: "✨", color: "bg-[#FBEAE3] text-[#96052F]" },
    { id: "care", label: lang === "ru" ? "Сыворотки & Кремы" : "Serums & Skincare", icon: "🧴", color: "bg-[#EAF3EE] text-[#1E6B47]" },
    { id: "eyes", label: lang === "ru" ? "Палетки & Тушь" : "Eyes & Mascara", icon: "👁️", color: "bg-[#F1ECE4] text-[#2D2326]" },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* ── 1. Hero Promo Banner (Femi.uz dynamic banner style) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gradient-to-r from-[#2D2326] via-[#481E2B] to-[#BA073F] text-white p-6 sm:p-12 lg:p-16 min-h-[360px] sm:min-h-[440px] flex items-center shadow-xl">
          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide text-white border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#E5A1B6] animate-ping" />
              {lang === "ru" ? "Грандиозные скидки недели" : "Grand Weekly Offers"}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
              {lang === "ru" ? (
                <>
                  Премиум косметика <br />
                  <span className="text-[#E5A1B6]">с доставкой по Ташкенту</span>
                </>
              ) : (
                <>
                  Luxury Cosmetics <br />
                  <span className="text-[#E5A1B6]">Delivered in Tashkent</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#F8E6EC]/90 max-w-lg leading-relaxed">
              {lang === "ru"
                ? "Более 5 000 оригинальных позиций от лучших мировых брендов Южной Кореи, Франции и США."
                : "Over 5,000 authentic formulas from world-renowned beauty brands from Korea, France, and USA."}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href={`/${lang}/catalog`}
                className="bg-white text-[#2D2326] hover:bg-[#F8E6EC] hover:text-[#BA073F] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-extrabold shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                {lang === "ru" ? "В каталог" : "Shop Now"}
              </Link>
              <Link
                href={`/${lang}/catalog?sort=sale`}
                className="bg-[#BA073F] hover:bg-[#96052f] text-white border border-white/25 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-extrabold transition-all duration-200"
              >
                {lang === "ru" ? "Скидки до -40%" : "Up to -40%"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Popular Category Chips ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {categoryChips.map((chip) => (
            <Link
              key={chip.id}
              href={`/${lang}/catalog?category=${chip.id}`}
              className="flex items-center gap-3 p-3.5 sm:p-4 rounded-[18px] bg-white border border-[#ECDFE4] hover:border-[#BA073F] hover:shadow-md transition-all group"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${chip.color}`}>
                {chip.icon}
              </div>
              <div className="min-w-0">
                <span className="block text-xs sm:text-sm font-bold text-[#2D2326] group-hover:text-[#BA073F] transition-colors truncate">
                  {chip.label}
                </span>
                <span className="text-[11px] text-[#6B5C5F]">Смотреть &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. Popular Brands Bar (femi.uz brands section) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2D2326]">
              {lang === "ru" ? "Популярные бренды" : "Popular Brands"}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5C5F] mt-0.5">
              {lang === "ru" ? "Официальные поставки и 100% подлинность" : "100% authentic authorized goods"}
            </p>
          </div>
          <Link
            href={`/${lang}/catalog`}
            className="text-xs font-bold text-[#BA073F] hover:underline"
          >
            {lang === "ru" ? "Все бренды →" : "All brands →"}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
          {popularBrands.map((b) => (
            <Link
              key={b.name}
              href={`/${lang}/catalog?search=${encodeURIComponent(b.name)}`}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-[16px] bg-white border border-[#ECDFE4] hover:border-[#BA073F] hover:shadow-sm transition-all group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#FCF5F7] border border-[#ECDFE4] text-[#BA073F] font-black text-sm flex items-center justify-center mb-2 group-hover:bg-[#BA073F] group-hover:text-white transition-colors">
                {b.logo}
              </div>
              <span className="text-xs font-extrabold text-[#2D2326] group-hover:text-[#BA073F] truncate w-full">
                {b.name}
              </span>
              <span className="text-[10px] text-[#8E7E82] mt-0.5">{b.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 4. Bestsellers Products Grid (Femi 4-5 column product grid) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#BA073F] block mb-1">
              {lang === "ru" ? "ТОП ПРОДАЖ" : "TOP SELLERS"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2326]">
              {lang === "ru" ? "Хиты недели" : "Weekly Bestsellers"}
            </h2>
          </div>
          <Link
            href={`/${lang}/catalog?sort=bestseller`}
            className="text-xs sm:text-sm font-bold text-[#BA073F] hover:underline"
          >
            {lang === "ru" ? "Смотреть все (48) →" : "View all (48) →"}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} locale={lang} lang={lang} />
          ))}
        </div>
      </section>

      {/* ── 5. Promo Duo Banners (Like femi.uz promo cards) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-[24px] bg-[#FBEAE3] p-6 sm:p-8 flex flex-col justify-between border border-[#ECD9CF]">
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#BA073F] bg-white px-2.5 py-1 rounded-full inline-block">
                K-Beauty Trend
              </span>
              <h3 className="text-2xl font-extrabold text-[#2D2326]">
                Корейский уход & стеклянная кожа
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5C5F] max-w-sm">
                Лучшие сыворотки с центеллой, ниацинамидом и муцином для идеального сияния.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href={`/${lang}/catalog?category=care`}
                className="inline-flex items-center gap-2 bg-[#2D2326] text-white hover:bg-[#BA073F] px-5 py-2.5 rounded-full text-xs font-bold transition-colors"
              >
                Выбрать уход &rarr;
              </Link>
            </div>
          </div>

          <div className="rounded-[24px] bg-[#F8E6EC] p-6 sm:p-8 flex flex-col justify-between border border-[#ECDFE4]">
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#BA073F] bg-white px-2.5 py-1 rounded-full inline-block">
                Exclusive
              </span>
              <h3 className="text-2xl font-extrabold text-[#2D2326]">
                Стойкие тинты & бальзамы для губ
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5C5F] max-w-sm">
                Трендовые сочные оттенки и увлажняющие формулы, не пересушивающие губы.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href={`/${lang}/catalog?category=lips`}
                className="inline-flex items-center gap-2 bg-[#BA073F] text-white hover:bg-[#96052F] px-5 py-2.5 rounded-full text-xs font-bold transition-colors"
              >
                Смотреть оттенки &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. New Arrivals Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#BA073F] block mb-1">
              {lang === "ru" ? "СВЕЖИЕ ПОСТУПЛЕНИЯ" : "NEW PRODUCTS"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2326]">
              {lang === "ru" ? "Новинки каталога" : "New Arrivals"}
            </h2>
          </div>
          <Link
            href={`/${lang}/catalog?sort=newest`}
            className="text-xs sm:text-sm font-bold text-[#BA073F] hover:underline"
          >
            {lang === "ru" ? "Все новинки →" : "All new →"}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} locale={lang} lang={lang} />
          ))}
        </div>
      </section>

      {/* ── 7. Trust & Guarantee Badges (Femi.uz benefits) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FCF5F7] rounded-[24px] border border-[#ECDFE4] p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <span className="text-2xl p-2.5 bg-white rounded-xl shadow-xs shrink-0">🛡️</span>
            <div>
              <h4 className="text-sm font-extrabold text-[#2D2326]">100% Оригинал</h4>
              <p className="text-xs text-[#6B5C5F] mt-1">
                Только подлинная сертифицированная косметика от проверенных брендов.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="text-2xl p-2.5 bg-white rounded-xl shadow-xs shrink-0">🚀</span>
            <div>
              <h4 className="text-sm font-extrabold text-[#2D2326]">Быстрая доставка</h4>
              <p className="text-xs text-[#6B5C5F] mt-1">
                Доставка день-в-день по Ташкенту и экспресс-отправка по всем регионам.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="text-2xl p-2.5 bg-white rounded-xl shadow-xs shrink-0">🎁</span>
            <div>
              <h4 className="text-sm font-extrabold text-[#2D2326]">Подарки & пробники</h4>
              <p className="text-xs text-[#6B5C5F] mt-1">
                Кладем приятные тестеры и бьюти-сюрпризы к каждому заказу.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="text-2xl p-2.5 bg-white rounded-xl shadow-xs shrink-0">💬</span>
            <div>
              <h4 className="text-sm font-extrabold text-[#2D2326]">Помощь экспертов</h4>
              <p className="text-xs text-[#6B5C5F] mt-1">
                Бесплатная консультация косметолога и помощь с подбором ухода.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
