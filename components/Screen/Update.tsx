import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUpdate } from "@/hooks/useUpdate";
import CategoryForm from "../CategoryForm";
import ProductForm from "../ProductForm";
import { Stack } from "expo-router";

const Update = ({ id, type }: { id: string; type: "product" | "category" }) => {
  const { data, loading } = useUpdate(id, type);
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: `Update ${type}`,
        }}
      />
      {type === "category" && <CategoryForm data={data} />}
      {type === "product" && <ProductForm data={data} />}
    </View>
  );
};

export default Update;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
