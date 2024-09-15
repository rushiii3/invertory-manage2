import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useCallback } from "react";
import { useProductStore } from "@/store/useProduct";
import { useUserStore } from "@/store/user-store";
import SwipableComponent from "@/components/SwipableComponent";
import { useRouter } from "expo-router";

const Page = () => {
  const { currentUser, addHistory } = useUserStore();
  const { getUserProducts, userProducts, deleteProduct } = useProductStore();
  const router = useRouter();

  useEffect(() => {
    if (currentUser?.email) {
      getUserProducts(currentUser.email);
    }
  }, [currentUser]);

  const handleDelete = useCallback(async (id: string, title: string) => {
    if (await deleteProduct(id, currentUser.email)) {
      Alert.alert("Deleted successfully!");
      addHistory(currentUser.email, true, "product", title, "Deleted");
    } else {
      Alert.alert("Failed to  delete!");
      addHistory(currentUser.email, true, "product", title, "Deleted");
    }
  }, []);

  const handleEdit = useCallback((id: string) => {
    console.log("Edit pressed for:", id);
    router.push({
      pathname: "/(update)/[id]",
      params: {
        id: id,
        type: "product",
      },
    });
    // Add your edit logic here
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <SwipableComponent
        item={item}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        type={"product"}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View>
            <Text>No Products</Text>
          </View>
        }
      />
    </View>
  );
};

export default Page;

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
