import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CartProvider } from "@/context/CartContext";
import { Colors } from "@/constants/theme";

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.ink,
          headerTitleStyle: { fontWeight: "600" },
          contentStyle: { backgroundColor: Colors.canvas },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="product/[slug]"
          options={{ title: "Товар", headerBackTitle: "Назад" }}
        />
        <Stack.Screen
          name="checkout"
          options={{ title: "Оформление заказа", headerBackTitle: "Корзина" }}
        />
      </Stack>
    </CartProvider>
  );
}

