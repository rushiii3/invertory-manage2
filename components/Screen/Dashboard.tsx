import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import TotalCategories from "../TotalCategories";
import ProductPerCategory from "../ProductPerCategory";
import LowInventory from "../LowInventory";
import UserRegister from "../UserRegister";
import { useUserStore } from "@/store/user-store";
import { useProductStore } from "@/store/useProduct";
import { useCategoryStore } from "@/store/useCategory";

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <TotalCategories data={categoryData} />
      <ProductPerCategory data={productsPerCategory} />
      <LowInventory data={lowInventoryData} />
      <UserRegister data={userRegistrationData} />
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  chartContainer: {
    marginVertical: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  centerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
