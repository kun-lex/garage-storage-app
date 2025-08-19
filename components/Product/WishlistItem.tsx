// components/Product/WishlistItem.tsx
import { Product } from "@/api/Product/Actions/ProductSlice";
import { useProduct } from "@/api/Product/Hooks/useProduct";
import { ThemedText } from "@/components/ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";


const WishlistItem = ({ id, name, priceFrom, location, imageSource }: Product) => {
  const toggleLike = useProduct((s) => s.toggleLike);

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.content}>
        <ThemedText type="subtitle" fontFamily="poppins" fontSize={14}>
          {name}
        </ThemedText>
        <ThemedText type="default" fontFamily="poppins" fontSize={12} color="#666">
          {location}
        </ThemedText>
        <ThemedText type="default" fontFamily="poppins" fontSize={12}>
          from {priceFrom}
        </ThemedText>
      </View>

      <TouchableOpacity onPress={() => toggleLike({ id, name, priceFrom, location, imageSource })}>
        <FontAwesome name="heart" size={20} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );
};

export default WishlistItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
});
