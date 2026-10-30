import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "@/context/CartContext";
import { Colors } from "@/constants/theme";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react-native";

export default function CartScreen() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, subtotal, shipping, total } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ShoppingBag size={48} color={Colors.muted} />
        <Text style={styles.emptyTitle}>Ваша корзина пуста</Text>
        <Text style={styles.emptyDesc}>Добавьте товары из каталога, чтобы сделать заказ</Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => router.push("/catalog")}
        >
          <Text style={styles.browseButtonText}>В каталог</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <View
            key={`${item.product.id}-${item.shade.id}`}
            style={styles.cartCard}
          >
            <Image source={{ uri: item.product.image }} style={styles.cardImage} />
            <View style={styles.cardDetails}>
              <Text style={styles.productName} numberOfLines={1}>
                {item.product.name}
              </Text>
              <Text style={styles.shadeName}>Оттенок: {item.shade.name}</Text>
              <Text style={styles.productPrice}>
                {item.product.price.toLocaleString("ru-RU")} ₽
              </Text>

              {/* Quantity Controls */}
              <View style={styles.controlsRow}>
                <View style={styles.stepper}>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item.product.id, item.shade.id, item.quantity - 1)
                    }
                    style={styles.stepBtn}
                  >
                    <Minus size={14} color={Colors.ink} />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item.product.id, item.shade.id, item.quantity + 1)
                    }
                    style={styles.stepBtn}
                  >
                    <Plus size={14} color={Colors.ink} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => removeFromCart(item.product.id, item.shade.id)}
                  style={styles.deleteBtn}
                >
                  <Trash2 size={16} color={Colors.muted} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Order Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Товары</Text>
            <Text style={styles.summaryValue}>{subtotal.toLocaleString("ru-RU")} ₽</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Доставка</Text>
            <Text style={styles.summaryValue}>
              {shipping === 0 ? "Бесплатно" : `${shipping} ₽`}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Итого</Text>
            <Text style={styles.totalValue}>{total.toLocaleString("ru-RU")} ₽</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          activeOpacity={0.85}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutBtnText}>
            Оформить заказ • {total.toLocaleString("ru-RU")} ₽
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.canvas },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.canvas,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyTitle: { fontSize: 20, fontWeight: "600", color: Colors.ink, marginTop: 16 },
  emptyDesc: { fontSize: 14, color: Colors.muted, textAlign: "center", marginTop: 8, marginBottom: 24 },
  browseButton: { backgroundColor: Colors.ink, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  browseButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  list: { padding: 16, paddingBottom: 100 },
  cartCard: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    marginBottom: 12,
  },
  cardImage: { width: 80, height: 80, borderRadius: 6, backgroundColor: "#F0EAE1" },
  cardDetails: { flex: 1, marginLeft: 12, justifyContent: "space-between" },
  productName: { fontSize: 14, fontWeight: "600", color: Colors.ink },
  shadeName: { fontSize: 12, color: Colors.muted },
  productPrice: { fontSize: 14, fontWeight: "700", color: Colors.ink },
  controlsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.canvas,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepBtn: { padding: 6 },
  quantity: { paddingHorizontal: 10, fontSize: 13, fontWeight: "600" },
  deleteBtn: { padding: 6 },
  summary: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 8,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  summaryLabel: { fontSize: 13, color: Colors.muted },
  summaryValue: { fontSize: 13, fontWeight: "600", color: Colors.ink },
  totalRow: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 12, marginTop: 4 },
  totalLabel: { fontSize: 15, fontWeight: "700", color: Colors.ink },
  totalValue: { fontSize: 16, fontWeight: "800", color: Colors.rose },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  checkoutBtn: {
    backgroundColor: Colors.rose,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
});

