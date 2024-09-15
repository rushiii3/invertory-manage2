import LowInventory from "@/components/LowInventory";
import ProductPerCategory from "@/components/ProductPerCategory";
import TotalCategories from "@/components/TotalCategories";
import UserRegister from "@/components/UserRegister";
import { useDashboard } from "@/hooks/useDashboard";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const Dashboard = () => {
  const {
    categoryData,
    lowInventoryData,
    productsPerCategory,
    userRegistrationData,
  } = useDashboard();

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
});
