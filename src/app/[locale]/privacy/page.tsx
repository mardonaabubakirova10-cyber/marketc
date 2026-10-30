import { Locale, LOCALES, isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function PrivacyPage({
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
        {lang === "ru" ? "Политика конфиденциальности" : "Privacy Policy"}
      </h1>

      <div className="prose prose-sm text-[#736E67] leading-relaxed space-y-6 max-w-none">
        <p>
          {lang === "ru"
            ? "Мы уважительно относимся к конфиденциальности каждого клиента. Настоящая политика определяет порядок обработки персональных данных, предоставленных при оформлении заказов на сайте ÉLIXIR BEAUTÉ."
            : "ÉLIXIR BEAUTÉ respects your privacy. This policy outlines how we handle personal data collected through our digital experience."}
        </p>

        <section className="space-y-2">
          <h2 className="font-heading text-lg text-[#171614]">
            {lang === "ru" ? "1. Сбор информации" : "1. Data Collection"}
          </h2>
          <p>
            {lang === "ru"
              ? "Мы собираем исключительно данные, необходимые для исполнения заказа: имя, номер телефона, адрес электронной почты и адрес доставки. Мы не храним данные банковских карт."
              : "We only collect data strictly necessary to fulfill your order: name, phone, email address, and delivery coordinates. We never store payment card credentials."}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading text-lg text-[#171614]">
            {lang === "ru" ? "2. Защита данных" : "2. Security"}
          </h2>
          <p>
            {lang === "ru"
              ? "Все передаваемые данные шифруются по протоколу SSL/TLS. Данные не передаются третьим лицам за исключением служб курьерской доставки для исполнения обязательств."
              : "All transmissions are encrypted via SSL/TLS. Your data is never sold or shared with third parties, except certified logistics partners fulfilling your shipment."}
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
