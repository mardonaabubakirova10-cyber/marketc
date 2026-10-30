import { Locale, LOCALES, isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function DeliveryPage({
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
        {lang === "ru" ? "Клиентский сервис" : "Customer care"}
      </p>
      <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#171614] leading-tight tracking-tight mb-8">
        {lang === "ru" ? "Доставка и возврат" : "Shipping & Returns"}
      </h1>

      <div className="prose prose-sm text-[#736E67] leading-relaxed space-y-8 max-w-none">
        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[#171614]">
            {lang === "ru" ? "Условия доставки" : "Shipping Policy"}
          </h2>
          <p>
            {lang === "ru"
              ? "Мы доставляем заказы по всей России курьерской службой или в пункты выдачи СДЭК и Boxberry. Срок сборки заказа — 1 рабочий день."
              : "We ship orders globally with premium carbon-neutral courier partners. Orders are dispatched within 1 business day."}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              {lang === "ru"
                ? "Стандартная доставка — 390 ₽ (2–4 рабочих дня)."
                : "Standard courier delivery — 390 ₽ / complimentary over 5,000 ₽."}
            </li>
            <li>
              {lang === "ru"
                ? "Бесплатная доставка — при сумме заказа от 5 000 ₽."
                : "Express delivery — 1–2 business days."}
            </li>
            <li>
              {lang === "ru"
                ? "Экспресс-доставка по Москве и Санкт-Петербургу день в день при заказе до 14:00."
                : "Same-day delivery available in select metropolitan areas for orders placed before 2 PM."}
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[#171614]">
            {lang === "ru" ? "Возврат и обмен" : "Returns & Exchanges"}
          </h2>
          <p>
            {lang === "ru"
              ? "Парфюмерно-косметические товары надлежащего качества согласно закону РФ не подлежат возврату или обмену. Однако, если товар прибыл с повреждением упаковки или производственным дефектом, мы заменим его за свой счёт или вернём полную стоимость."
              : "Due to hygiene and safety regulations, opened cosmetic products cannot be returned. If an item arrives damaged or defective, we will issue an immediate replacement or full refund."}
          </p>
          <p>
            {lang === "ru"
              ? "Свяжитесь с нашей службой заботы по почте care@elixir-beaute.com в течение 7 дней с момента получения заказа."
              : "Contact our client concierge at care@elixir-beaute.com within 7 days of receiving your parcel."}
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
