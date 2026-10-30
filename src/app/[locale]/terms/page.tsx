import { Locale, LOCALES, isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const lang = locale as Locale;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#736E67] mb-4">
        {lang === "ru" ? "Юридическая информация" : "Legal"}
      </p>
      <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#171614] leading-tight tracking-tight mb-8">
        {lang === "ru" ? "Публичная оферта и условия" : "Terms & Conditions"}
      </h1>

      <div className="prose prose-sm text-[#736E67] leading-relaxed space-y-6 max-w-none">
        <p>
          {lang === "ru"
            ? "Оформляя заказ на сайте ÉLIXIR BEAUTÉ, вы соглашаетесь с условиями настоящей публичной оферты и подтверждаете своё ознакомление с правилами продажи товаров."
            : "By placing an order on ÉLIXIR BEAUTÉ, you agree to these standard terms and purchase conditions."}
        </p>

        <section className="space-y-2">
          <h2 className="font-heading text-lg text-[#171614]">
            {lang === "ru" ? "1. Заказ и оплата" : "1. Orders & Pricing"}
          </h2>
          <p>
            {lang === "ru"
              ? "Все цены указаны в рублях и включают применимые налоги. Договор купли-продажи считается заключённым с момента подтверждения заказа клиентом."
              : "All prices are listed in RUB and include relevant taxes. A purchase contract is established once order confirmation is generated."}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-lg text-[#171614]">
            {lang === "ru" ? "2. Подлинность продукции" : "2. Product Authenticity"}
          </h2>
          <p>
            {lang === "ru"
              ? "Все косметические средства являются оригинальной сертифицированной продукцией бренда ÉLIXIR BEAUTÉ и соответствуют требованиям безопасности ЕАЭС."
              : "Every item in our catalogue is 100% genuine ÉLIXIR BEAUTÉ certified product meeting international safety regulations."}
          </p>
        </section>
      </div>

      <div className="mt-12">
        <Link href={`/${locale}/catalog`}>
          <Button variant="outline">
            {lang === "ru" ? "В каталог" : "Back to catalog"}
          </Button>
        </Link>
      </div>
    </article>
  );
}
