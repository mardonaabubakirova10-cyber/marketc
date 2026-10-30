import { notFound } from "next/navigation";
import { isValidLocale, Locale, LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { RevealObserver } from "@/components/reveal-observer";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2D2326]">
      <SiteHeader locale={locale as Locale} dict={dict} />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <SiteFooter locale={locale as Locale} dict={dict} />
      <MobileNavigation locale={locale as Locale} dict={dict} />
      <RevealObserver />
    </div>
  );
}
