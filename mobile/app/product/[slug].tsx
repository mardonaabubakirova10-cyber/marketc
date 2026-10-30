import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors, Config } from "@/constants/theme";
import { Product, Shade } from "@/types";
import { useCart } from "@/context/CartContext";
import { Check, ShieldCheck, Truck } from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`${Config.apiUrl}/products/${slug}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data);
        if (data?.shades?.length > 0) {
          setSelectedShade(data.shades[0]);
        }
      })
      .catch((err) => console.log("Product error:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.rose} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Товар не найден</Text>
      </View>
    );
  }

  const handleAdd = () => {
    if (!selectedShade) return;
    addToCart(product, selectedShade, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Product Image */}
        <Image
          source={{ uri: selectedShade?.image_url || product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.category}>{product.category.toUpperCase()}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.tagline}>{product.tagline}</Text>
          <Text style={styles.price}>{product.price.toLocaleString("ru-RU")} ₽</Text>

          {/* Shades Picker */}
          {product.shades?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>
                Оттенок: <Text style={{ color: Colors.ink }}>{selectedShade?.name}</Text>
              </Text>
              <View style={styles.shadesRow}>
                {product.shades.map((shade) => {
                  const isSelected = selectedShade?.id === shade.id;
                  return (
                    <TouchableOpacity
                      key={shade.id}
                      style={[
                        styles.shadeDot,
                        { backgroundColor: shade.hex },
                        isSelected && styles.shadeDotActive,
                      ]}
                      onPress={() => setSelectedShade(shade)}
                    >
                      {isSelected && (
                        <Check size={14} color={shade.hex === "#FFFFFF" ? "#000" : "#FFF"} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Описание</Text>
            <Text style={styles.bodyText}>{product.description}</Text>
          </View>

          {/* Benefits */}
          <View style={styles.benefitsCard}>
            <View style={styles.benefitItem}>
              <ShieldCheck size={18} color={Colors.sage} />
              <Text style={styles.benefitText}>100% Оригинальная косметика</Text>
            </View>
            <View style={styles.benefitItem}>
              <Truck size={18} color={Colors.sage} />
              <Text style={styles.benefitText}>Бесплатная доставка от 5 000 ₽</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.buyButton, added && styles.buyButtonSuccess]}
          activeOpacity={0.85}
          onPress={handleAdd}
        >
          <Text style={styles.buyButtonText}>
            {added ? "Добавлено в корзину ✓" : `В корзину • ${product.price.toLocaleString("ru-RU")} ₽`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.canvas },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorText: { fontSize: 16, color: Colors.muted },
  image: { width: "100%", height: width * 1.05, backgroundColor: "#F0EAE1" },
  content: { padding: 20 },
  category: { fontSize: 11, fontWeight: "700", color: Colors.rose, letterSpacing: 1, marginBottom: 4 },
  name: { fontSize: 24, fontWeight: "600", color: Colors.ink, marginBottom: 6 },
  tagline: { fontSize: 13, color: Colors.muted, marginBottom: 12 },
  price: { fontSize: 20, fontWeight: "700", color: Colors.ink, marginBottom: 20 },
  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 14, fontWeight: "600", color: Colors.muted, marginBottom: 10 },
  bodyText: { fontSize: 14, color: Colors.ink, lineHeight: 22 },
  shadesRow: { flexDirection: "row", gap: 12 },
  shadeDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  shadeDotActive: {
    borderColor: Colors.ink,
    transform: [{ scale: 1.1 }],
  },
  benefitsCard: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  benefitItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  benefitText: { fontSize: 13, color: Colors.ink },
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
  buyButton: {
    backgroundColor: Colors.rose,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonSuccess: { backgroundColor: Colors.sage },
  buyButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
});

