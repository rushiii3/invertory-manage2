import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { memo, useCallback } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import { Category, Product } from "@/types";

type SwipeableProps = {
  item: Product | Category;
  handleEdit: (id: string) => void;
  handleDelete: (id: string, title: string) => void;
  type: "category" | "product";
};
const SwipableComponent = ({
  item,
  handleEdit,
  handleDelete,
  type,
}: SwipeableProps) => {
  const RightActions = useCallback(
    (id: string, title: string) => (
      <View style={styles.rightAction}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "red" }]}
          onPress={() => handleDelete(id, title)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "green" }]}
          onPress={() => handleEdit(id)}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleDelete, handleEdit]
  );
  const id = item.id!;
  const title =
    type === "product" ? (item as Product).title : (item as Category).title;
  return (
    <Swipeable
      containerStyle={styles.swipeable}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={80}
      renderRightActions={() => RightActions(id, title)}
    >
      {type === "product" ? (
        <ProductCard item={item as Product} />
      ) : (
        <CategoryCard item={item as Category} />
      )}
    </Swipeable>
  );
};

export default memo(SwipableComponent);

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
