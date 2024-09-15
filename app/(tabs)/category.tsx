import { Alert, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useCategoryStore } from "@/store/useCategory";
import SwipableComponent from "@/components/SwipableComponent";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/user-store";

const Page = () => {
  const { category, deleteCategory } = useCategoryStore();
  const { currentUser, addHistory } = useUserStore();

  const router = useRouter();
  const handleDelete = useCallback(async (id: string, title: string) => {
    if (await deleteCategory(id)) {
      Alert.alert("Deleted successfully!");
      addHistory(currentUser.email, true, "category", title, "Deleted");
    } else {
      Alert.alert("Failed to  delete!");
      addHistory(currentUser.email, true, "category", title, "Deleted");
    }
  }, []);

  const handleEdit = useCallback((id: string) => {
    router.push({
      pathname: "/(update)/[id]",
      params: {
        id: id,
        type: "category",
      },
    });
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <SwipableComponent
        item={item}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        type={"category"}
      />
    ),
    []
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={category}
        renderItem={renderItem}
        ListEmptyComponent={
          <View>
            <Text>No Item</Text>
          </View>
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
