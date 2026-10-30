import Link from "next/link";
import { Locale } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries/ru";

interface SiteFooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-[#2D2326] text-[#F8E6EC] mt-auto border-t border-[#481E2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl font-bold tracking-[0.2em] uppercase text-white">
                {dict.common.brandName}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA073F] bg-white/10 px-2 py-0.5 rounded-full">
                TASHKENT
              </span>
            </div>
            <p className="text-sm text-[#D6C4CB] leading-relaxed max-w-[42ch]">
              {dict.footer.editorialNote}
            </p>
          </div>

          {/* Catalog Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5A1B6]">
              {dict.nav.catalog}
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#D6D3D1]">
              <li>
                <Link
                  href={`/${locale}/catalog?category=lips`}
                  className="hover:text-[#F7F4EF] transition-colors"
                >
                  {dict.categories.lips}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/catalog?category=eyes`}
                  className="hover:text-[#F7F4EF] transition-colors"
                >
                  {dict.categories.eyes}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/catalog?category=face`}
                  className="hover:text-[#F7F4EF] transition-colors"
                >
                  {dict.categories.face}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/catalog?category=care`}
                  className="hover:text-[#F7F4EF] transition-colors"
                >
                  {dict.categories.care}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Legal */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#736E67]">
              {dict.footer.customerCare}
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#D6D3D1]">
              <li>
                <Link
                  href={`/${locale}/delivery`}
                  className="hover:text-[#F7F4EF] transition-colors"
                >
                  {dict.nav.delivery}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/faq`}
                  className="hover:text-[#F7F4EF] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="hover:text-[#F7F4EF] transition-colors"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="hover:text-[#F7F4EF] transition-colors"
                >
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="hover:text-[#F7F4EF] transition-colors"
                >
                  {dict.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#2A2723] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736E67]">
          <p>
            &copy; {currentYear} {dict.common.brandName}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-6 tracking-widest text-[11px] uppercase">
            <span>Clean Beauty</span>
            <span>&middot;</span>
            <span>Cruelty-Free</span>
            <span>&middot;</span>
            <span>Editorial Formulations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
