"use client";

import { CartProvider } from "@/store/cart-context";
import { FavoritesProvider } from "@/store/favorites-context";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </CartProvider>
  );
}
