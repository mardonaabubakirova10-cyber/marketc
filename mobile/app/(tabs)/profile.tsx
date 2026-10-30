import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Colors } from "@/constants/theme";
import { MapPin, ShieldCheck, HelpCircle, Phone, Globe, ChevronRight } from "lucide-react-native";

export default function ProfileScreen() {
  const menuItems = [
    { icon: MapPin, title: "Адреса доставки", desc: "Ташкент, Узбекистан" },
    { icon: Globe, title: "Язык приложения", desc: "Русский (RU)" },
    { icon: ShieldCheck, title: "Гарантия оригинальности", desc: "100% селективная косметика" },
    { icon: HelpCircle, title: "Частые вопросы (FAQ)", desc: "Доставка и возврат" },
    { icon: Phone, title: "Служба заботы", desc: "Поддержка в Telegram" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* User Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>ÉB</Text>
        </View>
        <Text style={styles.userName}>Покупатель</Text>
        <Text style={styles.userStatus}>Премиальная программа лояльности</Text>
      </View>

      {/* Menu Section */}
      <View style={styles.menuCard}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.menuRow, index !== menuItems.length - 1 && styles.menuBorder]}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.iconBox}>
                  <Icon size={18} color={Colors.rose} />
                </View>
                <View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDesc}>{item.desc}</Text>
                </View>
              </View>
              <ChevronRight size={18} color={Colors.muted} />
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.version}>Версия 1.0.0 • Élixir Beauté Tashkent</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.canvas },
  header: {
    padding: 24,
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.surfaceRose,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: Colors.blush,
  },
  avatarText: { fontSize: 20, fontWeight: "700", color: Colors.rose },
  userName: { fontSize: 18, fontWeight: "600", color: Colors.ink, marginBottom: 4 },
  userStatus: { fontSize: 13, color: Colors.muted },
  menuCard: {
    backgroundColor: Colors.surface,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 4,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceRose,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: { fontSize: 14, fontWeight: "600", color: Colors.ink },
  menuDesc: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  version: {
    textAlign: "center",
    color: Colors.muted,
    fontSize: 12,
    marginTop: 16,
    marginBottom: 40,
  },
});
