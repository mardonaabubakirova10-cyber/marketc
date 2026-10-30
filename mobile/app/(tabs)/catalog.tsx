import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors, Config } from "@/constants/theme";
import { Product } from "@/types";
import { Search } from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function CatalogScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch(`${Config.apiUrl}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={18} color={Colors.muted} />
          <TextInput
            placeholder="Поиск по названию..."
            placeholderTextColor={Colors.muted}
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { id: "all", name: "Все" },
            { id: "lips", name: "Губы" },
            { id: "eyes", name: "Глаза" },
            { id: "face", name: "Лицо" },
            { id: "skincare", name: "Уход" },
          ].map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.filterChip,
                selectedCategory === cat.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === cat.id && styles.filterTextActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product Grid */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.rose} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => router.push(`/product/${item.slug}`)}
            >
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
              <View style={styles.info}>
                <Text style={styles.category}>{item.category.toUpperCase()}</Text>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.price}>{item.price.toLocaleString("ru-RU")} ₽</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.canvas },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.canvas,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: { flex: 1, fontSize: 14, color: Colors.ink },
  filtersWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.canvas,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.ink, borderColor: Colors.ink },
  filterText: { fontSize: 13, color: Colors.ink },
  filterTextActive: { color: "#FFFFFF", fontWeight: "600" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  card: {
    width: (width - 44) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
    overflow: "hidden",
  },
  image: { width: "100%", height: 170, backgroundColor: "#F0EAE1" },
  info: { padding: 10 },
  category: { fontSize: 9, color: Colors.muted, fontWeight: "600", marginBottom: 2 },
  name: { fontSize: 13, fontWeight: "500", color: Colors.ink, marginBottom: 4 },
  price: { fontSize: 14, fontWeight: "700", color: Colors.ink },
});

