import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useCategoryStore } from "@/store/useCategory";
import CategoryForm from "@/components/CategoryForm";
import ProductForm from "@/components/ProductForm";
import { useProductStore } from "@/store/useProduct";

const Page = () => {
  const { id, type } = useLocalSearchParams();
  const { getSingleCategory } = useCategoryStore();
  const { getSingleProduct } = useProductStore();

  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    if (type === "category") {
      try {
        setLoading(true);
        const data = await getSingleCategory(id);
        setData(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    }
    if (type === "product") {
      try {
        setLoading(true);
        const data = await getSingleProduct(id);
        setData(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (id && type) {
      getData();
    }
  }, [id, type]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {type === "category" && <CategoryForm data={Data} />}
      {type === "product" && <ProductForm data={Data} />}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
