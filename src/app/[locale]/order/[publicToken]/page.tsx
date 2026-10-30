import { Locale, LOCALES, isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale, publicToken: "demo-token" }));
}

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ locale: string; publicToken: string }>;
}) {
  const { locale, publicToken } = await params;
  if (!isValidLocale(locale)) notFound();
  const lang = locale as Locale;

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-[#E5ECE3] text-[#8A9A86] flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={32} weight="fill" />
      </div>

      <p className="text-[10px] uppercase tracking-[0.25em] text-[#736E67] mb-2">
        {lang === "ru" ? "Заказ подтверждён" : "Order Confirmed"}
      </p>
      <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#171614] tracking-tight mb-4">
        {lang === "ru" ? "Спасибо за ваш заказ" : "Thank you for your order"}
      </h1>

      <div className="p-6 bg-[#FFFFFF] border border-[#ECE7DF] my-8 space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-[#ECE7DF] pb-3">
          <span className="text-xs uppercase tracking-wider text-[#736E67]">
            {lang === "ru" ? "Идентификатор заказа" : "Order Reference"}
          </span>
          <span className="font-mono text-sm font-semibold text-[#171614]">
            {publicToken.toUpperCase()}
          </span>
        </div>

        <div className="space-y-2 text-sm text-[#736E67]">
          <p>
            {lang === "ru"
              ? "Мы отправили детальное подтверждение и чек на вашу электронную почту."
              : "A confirmation email with full itemized invoice has been dispatched."}
          </p>
          <p>
            {lang === "ru"
              ? "Статус сборки и трек-номер для отслеживания посылки появятся в течение 24 часов."
              : "Tracking number will be assigned as soon as the package enters the sorting center."}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/${locale}/catalog`}>
          <Button size="lg" className="w-full sm:w-auto">
            {lang === "ru" ? "Продолжить покупки" : "Continue Shopping"}
          </Button>
        </Link>
        <Link href={`/${locale}`}>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            {lang === "ru" ? "На главную" : "Home"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
