"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries/ru";
import { House, SquaresFour, Heart, ShoppingBag } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

import { useCart } from "@/store/cart-context";
import { useFavorites } from "@/store/favorites-context";

interface MobileNavigationProps {
  locale: Locale;
  dict: Dictionary;
  cartCount?: number;
  favoritesCount?: number;
}

export function MobileNavigation({
  locale,
  dict,
  cartCount: propCartCount,
  favoritesCount: propFavCount,
}: MobileNavigationProps) {
  const pathname = usePathname();
  const { count: cartStoreCount } = useCart();
  const { ids: favIds } = useFavorites();

  const cartCount = propCartCount ?? cartStoreCount;
  const favoritesCount = propFavCount ?? favIds.length;

  const tabs = [
    {
      href: `/${locale}`,
      label: "Главная",
      icon: House,
      isActive: pathname === `/${locale}` || pathname === `/${locale}/`,
    },
    {
      href: `/${locale}/catalog`,
      label: dict.nav.catalog,
      icon: SquaresFour,
      isActive: pathname.startsWith(`/${locale}/catalog`),
    },
    {
      href: `/${locale}/favorites`,
      label: dict.common.favorites,
      icon: Heart,
      badge: favoritesCount > 0 ? favoritesCount : undefined,
      isActive: pathname.startsWith(`/${locale}/favorites`),
    },
    {
      href: `/${locale}/cart`,
      label: dict.common.cart,
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : undefined,
      isActive: pathname.startsWith(`/${locale}/cart`),
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ECDFE4] px-2 py-2 safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 text-[10px] tracking-wider transition-colors relative",
                tab.isActive
                  ? "text-[#BA073F] font-bold"
                  : "text-[#6B5C5F] hover:text-[#BA073F]"
              )}
            >
              <div className="relative">
                <Icon size={22} weight={tab.isActive ? "fill" : "regular"} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] rounded-full bg-[#BA073F] text-white text-[9px] flex items-center justify-center font-bold px-0.5">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="mt-1">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
