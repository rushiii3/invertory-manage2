import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
const ProductCard = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri:
            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" ||
            item.primary_image ||
            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
        }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text>Weight: {item.weight}</Text>
        <Text>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  swipeable: {
    marginBottom: 15,
  },
  rightAction: {
    flexDirection: "row",
  },
  actionButton: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  actionText: {
    color: "white",
    fontWeight: "600",
  },
  itemContainer: {
    flexDirection: "row",
    gap: 10,
  },
  itemImage: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "800",
    flexWrap: "wrap",
  },
  itemDescription: {
    fontSize: 15,
    fontWeight: "700",
    flexShrink: 1,
    maxWidth: "75%",
  },
});
