import { Tabs } from "expo-router";
import { Sparkles, ShoppingBag, Heart, User, Compass } from "lucide-react-native";
import { Colors } from "@/constants/theme";
import { useCart } from "@/context/CartContext";

export default function TabLayout() {
  const { itemCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.rose,
        tabBarInactiveTintColor: Colors.muted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: Colors.surface,
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: Colors.ink,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ color, size }) => <Sparkles color={color} size={size} />,
          headerTitle: "ÉLIXIR BEAUTÉ",
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: "Каталог",
          tabBarIcon: ({ color, size }) => <Compass color={color} size={size} />,
          headerTitle: "Коллекция",
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Избранное",
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
          headerTitle: "Избранное",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Корзина",
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarBadgeStyle: { backgroundColor: Colors.rose },
          tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size} />,
          headerTitle: "Корзина",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          headerTitle: "Мой аккаунт",
        }}
      />
    </Tabs>
  );
}

