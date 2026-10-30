"use client";

import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Регулярное выражение для замены /ru или /en в начале пути
    const segments = pathname.split("/");
    if (segments[1] === "ru" || segments[1] === "en") {
      segments[1] = newLocale;
      router.push(segments.join("/"));
    } else {
      router.push(`/${newLocale}${pathname}`);
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center text-[11px] uppercase tracking-[0.15em] border border-[#ECE7DF] bg-[#FFFFFF]",
        className
      )}
    >
      <button
        type="button"
        onClick={() => switchLocale("ru")}
        aria-label="Переключить на русский язык"
        className={cn(
          "px-2.5 py-1 transition-colors cursor-pointer",
          currentLocale === "ru"
            ? "bg-[#171614] text-[#F7F4EF] font-medium"
            : "text-[#736E67] hover:text-[#171614]"
        )}
      >
        RU
      </button>
      <span className="w-px h-3 bg-[#ECE7DF]" />
      <button
        type="button"
        onClick={() => switchLocale("en")}
        aria-label="Switch to English"
        className={cn(
          "px-2.5 py-1 transition-colors cursor-pointer",
          currentLocale === "en"
            ? "bg-[#171614] text-[#F7F4EF] font-medium"
            : "text-[#736E67] hover:text-[#171614]"
        )}
      >
        EN
      </button>
    </div>
  );
}
