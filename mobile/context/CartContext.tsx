import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, Product, Shade } from "@/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, shade: Shade, quantity?: number) => void;
  removeFromCart: (productId: string, shadeId: string) => void;
  updateQuantity: (productId: string, shadeId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("@elixir_cart").then((data) => {
      if (data) {
        try {
          setItems(JSON.parse(data));
        } catch {}
      }
    });
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    AsyncStorage.setItem("@elixir_cart", JSON.stringify(newItems));
  };

  const addToCart = (product: Product, shade: Shade, quantity = 1) => {
    const existingIndex = items.findIndex(
      (i) => i.product.id === product.id && i.shade.id === shade.id
    );

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      saveCart([...items, { product, shade, quantity }]);
    }
  };

  const removeFromCart = (productId: string, shadeId: string) => {
    saveCart(items.filter((i) => !(i.product.id === productId && i.shade.id === shadeId)));
  };

  const updateQuantity = (productId: string, shadeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, shadeId);
      return;
    }
    const updated = items.map((i) => {
      if (i.product.id === productId && i.shade.id === shadeId) {
        return { ...i, quantity };
      }
      return i;
    });
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 390;
  const total = subtotal + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

