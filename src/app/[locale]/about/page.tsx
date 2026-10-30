import { Locale, LOCALES, isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const lang = locale as Locale;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#736E67] mb-4">
        {lang === "ru" ? "О бренде" : "Our story"}
      </p>
      <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#171614] leading-tight tracking-tight mb-8">
        {lang === "ru" ? "Чистота как эстетика" : "Clarity as Aesthetic"}
      </h1>
      <div className="prose prose-sm text-[#736E67] leading-relaxed space-y-5 max-w-none">
        <p>
          {lang === "ru"
            ? "ÉLIXIR BEAUTÉ возник из желания создать косметику, которая не конкурирует с вашей кожей — а работает вместе с ней. Наши формулы разрабатываются командой независимых косметических химиков, которые отдают предпочтение функциональным ингредиентам, а не маркетинговым обещаниям."
            : "ÉLIXIR BEAUTÉ was born from a desire to create cosmetics that don't compete with your skin — they work alongside it. Our formulations are developed by a team of independent cosmetic chemists who prioritise functional ingredients over marketing claims."}
        </p>
        <p>
          {lang === "ru"
            ? "Каждое средство тестируется минимум 6 месяцев до появления в каталоге. Мы никогда не тестируем на животных и используем перерабатываемую упаковку."
            : "Each product is tested for a minimum of 6 months before entering the catalog. We are certified cruelty-free and use recyclable packaging across the entire range."}
        </p>
        <p>
          {lang === "ru"
            ? "Мы верим, что красота — это точность, а не количество. Небольшой, тщательно подобранный каталог лучше, чем сотни компромиссных позиций."
            : "We believe beauty is about precision, not volume. A small, carefully curated catalog is better than hundreds of compromised SKUs."}
        </p>
      </div>
      <div className="mt-12">
        <Link href={`/${locale}/catalog`}>
          <Button variant="outline">{lang === "ru" ? "Смотреть коллекцию" : "View collection"}</Button>
        </Link>
      </div>
    </article>
  );
}
