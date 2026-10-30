"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n/config";
import { Dictionary } from "@/lib/i18n/dictionaries/ru";
import { LanguageSwitcher } from "./language-switcher";
import { MagnifyingGlass, ShoppingBag, Heart, List, X } from "@phosphor-icons/react";

import { useCart } from "@/store/cart-context";
import { useFavorites } from "@/store/favorites-context";

interface SiteHeaderProps {
  locale: Locale;
  dict: Dictionary;
  cartCount?: number;
  favoritesCount?: number;
}

export function SiteHeader({
  locale,
  dict,
  cartCount: propCartCount,
  favoritesCount: propFavCount,
}: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const { count: cartStoreCount } = useCart();
  const { ids: favIds } = useFavorites();

  const cartCount = propCartCount ?? cartStoreCount;
  const favoritesCount = propFavCount ?? favIds.length;

  const categories = [
    { href: `/${locale}/catalog`, label: "Каталог", highlight: false },
    { href: `/${locale}/catalog?category=lips`, label: "Макияж губ", highlight: false },
    { href: `/${locale}/catalog?category=eyes`, label: "Глаза & Брови", highlight: false },
    { href: `/${locale}/catalog?category=face`, label: "Тон & Лицо", highlight: false },
    { href: `/${locale}/catalog?category=care`, label: "Уход за кожей", highlight: false },
    { href: `/${locale}/catalog?sort=bestseller`, label: "Бестселлеры", highlight: false },
    { href: `/${locale}/catalog?sort=sale`, label: "Акции & Скидки", highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#ECDFE4] transition-all">
      {/* Top Banner / Trust bar */}
      <div className="bg-[#FCF5F7] border-b border-[#F3EAEE] text-[11px] text-[#6B5C5F] py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[#BA073F]">✨ 100% Оригинальная люксовая косметика</span>
            <span>&bull;</span>
            <span>Доставка по Ташкенту и всем регионам</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-[#BA073F] transition-colors">г. Ташкент</span>
            <span>&bull;</span>
            <Link href={`/${locale}/about`} className="hover:text-[#BA073F] transition-colors">
              О магазине
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4 sm:gap-6">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#2D2326] hover:text-[#BA073F] transition-colors -ml-2"
          aria-label={dict.common.menu}
        >
          {mobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>

        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 group shrink-0">
          <span className="font-heading text-xl sm:text-2xl font-bold tracking-[0.18em] uppercase text-[#2D2326] group-hover:text-[#BA073F] transition-colors">
            {dict.common.brandName}
          </span>
          <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-widest text-[#BA073F] bg-[#F8E6EC] px-2 py-0.5 rounded-full">
            TASHKENT
          </span>
        </Link>

        {/* Search Bar (Femi-style pill input) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-auto relative">
          <div
            className={`w-full flex items-center bg-[#FCF5F7] border rounded-full px-4 py-2 transition-all ${
              searchFocused ? "border-[#BA073F] bg-white ring-2 ring-[#BA073F]/15" : "border-[#ECDFE4] hover:border-[#BA073F]/40"
            }`}
          >
            <MagnifyingGlass size={18} className="text-[#6B5C5F] mr-2.5 shrink-0" weight="bold" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Поиск по 5 000+ товарам, брендам и оттенкам..."
              className="w-full bg-transparent text-sm text-[#2D2326] placeholder-[#8E7E82] focus:outline-none"
            />
          </div>

          {/* Quick search drop preview */}
          {searchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#ECDFE4] shadow-xl p-4 z-50">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5C5F] block mb-2">
                Популярные запросы
              </span>
              <div className="flex flex-wrap gap-2 mb-3">
                {["Тинт для губ", "BB крем", "Сыворотка", "Румяна", "Хайлайтер"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/${locale}/catalog?search=${encodeURIComponent(tag)}`}
                    className="text-xs bg-[#FCF5F7] hover:bg-[#BA073F] hover:text-white px-3 py-1 rounded-full text-[#2D2326] transition-colors font-medium"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <Link
                href={`/${locale}/catalog`}
                className="text-xs font-bold text-[#BA073F] hover:underline block pt-2 border-t border-[#F3EAEE]"
              >
                Перейти во весь каталог &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <LanguageSwitcher currentLocale={locale} className="hidden sm:inline-flex" />

          {/* Mobile search trigger */}
          <Link
            href={`/${locale}/catalog`}
            className="md:hidden p-2 text-[#2D2326] hover:text-[#BA073F] transition-colors"
            aria-label={dict.common.search}
          >
            <MagnifyingGlass size={22} weight="bold" />
          </Link>

          {/* Favorites */}
          <Link
            href={`/${locale}/favorites`}
            className="p-2 text-[#2D2326] hover:text-[#BA073F] transition-colors relative"
            aria-label={dict.common.favorites}
          >
            <Heart size={22} weight="bold" />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] rounded-full bg-[#BA073F] text-white text-[10px] font-extrabold flex items-center justify-center px-1 shadow-sm">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Cart Pill Button */}
          <Link
            href={`/${locale}/cart`}
            className="flex items-center gap-2 bg-[#FCF5F7] border border-[#ECDFE4] hover:border-[#BA073F] text-[#2D2326] hover:text-[#BA073F] py-2 px-3.5 rounded-full transition-all duration-200"
            aria-label={dict.common.cart}
          >
            <div className="relative">
              <ShoppingBag size={20} weight="bold" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] rounded-full bg-[#BA073F] text-white text-[9px] font-extrabold flex items-center justify-center px-0.5">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-bold">
              {cartCount > 0 ? `${cartCount} шт` : "Корзина"}
            </span>
          </Link>
        </div>
      </div>

      {/* Categories Bar (femi.uz category strip) */}
      <div className="border-t border-[#F3EAEE] bg-white hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 flex items-center gap-6 h-12 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap py-1 ${
                cat.highlight
                  ? "text-[#BA073F] font-bold bg-[#F8E6EC] px-3 py-1 rounded-full hover:bg-[#BA073F] hover:text-white"
                  : "text-[#2D2326] hover:text-[#BA073F]"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ECDFE4] bg-white px-6 py-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EAEE]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B5C5F]">Категории</span>
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <nav className="flex flex-col space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 px-3 rounded-xl font-medium transition-colors ${
                  cat.highlight
                    ? "bg-[#F8E6EC] text-[#BA073F] font-bold"
                    : "text-[#2D2326] hover:bg-[#FCF5F7]"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
