"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Product, ProductShade } from "@/data/mock-products";

export interface CartItem {
  product: Product;
  shade: ProductShade;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, shade: ProductShade, quantity?: number) => void;
  removeItem: (productId: string, shadeId: string) => void;
  updateQuantity: (productId: string, shadeId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartStore | null>(null);

const STORAGE_KEY = "elixir_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, shade: ProductShade, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.shade.id === shade.id
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.shade.id === shade.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, shade, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string, shadeId: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.shade.id === shadeId))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, shadeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, shadeId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.shade.id === shadeId ? { ...i, quantity } : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
