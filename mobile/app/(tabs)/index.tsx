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
import { useRouter } from "expo-router";
import { Colors, Config } from "@/constants/theme";
import { Product } from "@/types";
import { ArrowRight, Sparkles } from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${Config.apiUrl}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBestsellers(data.slice(0, 4));
        }
      })
      .catch((err) => console.log("Failed to load products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner */}
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Sparkles size={12} color={Colors.rose} />
          <Text style={styles.badgeText}>НОВАЯ КОЛЛЕКЦИЯ 2026</Text>
        </View>
        <Text style={styles.heroTitle}>Искусство чистого сияния</Text>
        <Text style={styles.heroSubtitle}>
          Люксовые формулы, созданные подчеркнуть естественную красоту и глубину взгляда.
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.8}
          onPress={() => router.push("/catalog")}
        >
          <Text style={styles.ctaButtonText}>Смотреть каталог</Text>
          <ArrowRight size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Категории</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {[
            { id: "lips", name: "Губы" },
            { id: "eyes", name: "Глаза" },
            { id: "face", name: "Лицо" },
            { id: "skincare", name: "Уход" },
          ].map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.catChip}
              onPress={() => router.push("/catalog")}
            >
              <Text style={styles.catChipText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bestsellers Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Бестселлеры</Text>
          <TouchableOpacity onPress={() => router.push("/catalog")}>
            <Text style={styles.seeAll}>Все →</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color={Colors.rose} style={{ marginVertical: 30 }} />
        ) : (
          <View style={styles.grid}>
            {bestsellers.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.productCard}
                activeOpacity={0.85}
                onPress={() => router.push(`/product/${item.slug}`)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productCategory}>{item.category.toUpperCase()}</Text>
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.productPrice}>{item.price.toLocaleString("ru-RU")} ₽</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  hero: {
    padding: 24,
    backgroundColor: Colors.surfaceRose,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.rose,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: Colors.ink,
    lineHeight: 34,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
    marginBottom: 20,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.rose,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.ink,
  },
  seeAll: {
    fontSize: 13,
    color: Colors.rose,
    fontWeight: "500",
  },
  catScroll: {
    marginTop: 12,
  },
  catChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catChipText: {
    fontSize: 13,
    color: Colors.ink,
    fontWeight: "500",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: (width - 52) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#F0EAE1",
  },
  productInfo: {
    padding: 12,
  },
  productCategory: {
    fontSize: 10,
    color: Colors.muted,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.ink,
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.ink,
  },
});

