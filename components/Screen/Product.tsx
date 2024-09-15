import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { useProductPage } from "@/hooks/useProductPage";
import SwipableComponent from "../SwipableComponent";
import { Product } from "@/types";
import { Link } from "expo-router";

const ProductComponent = () => {
  const { handleDelete, handleEdit, userProducts } = useProductPage();

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Product>) => {
    return (
      <SwipableComponent
        item={item}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        type={"product"}
      />
    );
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={userProducts}
        renderItem={renderItem}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              No Products
            </Text>
            <Link href={"/(add)/product"} style={{marginTop:10}}>
              <View
                style={{
                  backgroundColor: "#4287f5",
                  alignItems: "center",
                  paddingVertical: 10,
                  borderRadius: 20,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{color:"white"}}>Add Product</Text>
              </View>
            </Link>
          </View>
        }
      />
    </View>
  );
};

export default ProductComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
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
