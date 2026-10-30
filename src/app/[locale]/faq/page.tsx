import { Locale, LOCALES, isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const lang = locale as Locale;

  const faqs =
    lang === "ru"
      ? [
          {
            q: "Как подобрать идеальный оттенок тинта или блеска?",
            a: "В карточке каждого товара представлены свотчи на разных подтонах кожи, а также подробное описание финиша и плотности. Если сомневаетесь, напишите нам в чат — наши эксперты помогут определиться.",
          },
          {
            q: "Тестируется ли косметика на животных?",
            a: "Категорически нет. Все наши средства сертифицированы Cruelty-Free. Мы проводим только этичные дерматологические испытания in-vitro и на группе добровольцев.",
          },
          {
            q: "Какой срок годности у продуктов после вскрытия?",
            a: "Срок годности (знак PAO на упаковке) составляет от 6 до 12 месяцев в зависимости от средства. Мы рекомендуем хранить косметику в сухом прохладном месте вдали от прямых солнечных лучей.",
          },
          {
            q: "Как оформить и отследить заказ?",
            a: "Добавьте понравившиеся средства в корзину и перейдите к оформлению. После подтверждения заказа вы получите номер отправления и трек-код для отслеживания доставки.",
          },
        ]
      : [
          {
            q: "How do I choose the right shade?",
            a: "Each product page includes swatches across multiple skin undertones along with finish and opacity guides. Feel free to contact our concierge for tailored recommendations.",
          },
          {
            q: "Are ÉLIXIR BEAUTÉ products cruelty-free?",
            a: "Absolutely. All formulations are 100% cruelty-free and never tested on animals. We verify efficacy through clinical in-vitro and volunteer testing.",
          },
          {
            q: "What is the shelf life after opening?",
            a: "Products carry a PAO (Period After Opening) symbol ranging from 6 to 12 months. Store in a cool, dry place away from direct sunlight.",
          },
          {
            q: "How can I track my shipment?",
            a: "Upon checkout confirmation, you will receive a unique order reference number. A tracking code is dispatched once the parcel is handed over to our courier partner.",
          },
        ];

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#736E67] mb-4">
        {lang === "ru" ? "Частые вопросы" : "FAQ"}
      </p>
      <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#171614] leading-tight tracking-tight mb-8">
        {lang === "ru" ? "Вопросы и ответы" : "Frequently Asked Questions"}
      </h1>

      <div className="space-y-6">
        {faqs.map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-[#FFFFFF] border border-[#ECE7DF] space-y-2 transition-all hover:border-[#171614]/30"
          >
            <h2 className="font-heading text-lg text-[#171614]">{item.q}</h2>
            <p className="text-sm text-[#736E67] leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex gap-4">
        <Link href={`/${locale}/catalog`}>
          <Button variant="outline">
            {lang === "ru" ? "В каталог" : "Browse catalog"}
          </Button>
        </Link>
        <Link href={`/${locale}/about`}>
          <Button variant="ghost">
            {lang === "ru" ? "О бренде" : "Our story"}
          </Button>
        </Link>
      </div>
    </article>
  );
}
