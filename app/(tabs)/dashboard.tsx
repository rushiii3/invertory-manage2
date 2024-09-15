import LowInventory from "@/components/LowInventory";
import ProductPerCategory from "@/components/ProductPerCategory";
import TotalCategories from "@/components/TotalCategories";
import UserRegister from "@/components/UserRegister";
import { useCategoryStore } from "@/store/useCategory";
import { useProductStore } from "@/store/useProduct";
import { useUserStore } from "@/store/user-store";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import uniqolor from "uniqolor";
const Dashboard = () => {
  const { users } = useUserStore();
  const { Products } = useProductStore();
  const { category } = useCategoryStore();

  const generateColor = () => {
    const color = uniqolor.random({
      saturation: 80,
      lightness: [70, 80],
    });
    return color.color;
  };

  // State to store data for charts
  const [lowInventoryProducts, setLowInventoryProducts] = useState([]);
  const [productsPerCategory, setProductsPerCategory] = useState([]);
  const [userRegistrationData, setUserRegistrationData] = useState([]);

  // Fetch data from stores
  useEffect(() => {
    // Calculate low inventory products
    const lowInventory = Products.filter((product) => product.quantity < 5);

    setLowInventoryProducts(lowInventory);

    // Calculate the number of products in each category
    const categoryProductCount = category
    .map((cat) => ({
      label: cat.title,
      value: Products.filter((product) => product.category === cat.id).length,
    }))
    .filter((cat) => cat.value > 0); // Filter out categories with zero products
  
    setProductsPerCategory(categoryProductCount);

    const chartData = users.map((user, index) => ({
      label:
        new Date(user.date).toLocaleDateString() ||
        new Date().toLocaleDateString(), // Convert date to readable format
      value: index + 1, // Cumulative count of users
    }));
    setUserRegistrationData(chartData);
  }, [Products, category, users]);

  const categoryData = category.map((cat) => ({
    value: 1,
    text: cat.title,
    color: generateColor(),
  }));

  const lowInventoryData = lowInventoryProducts.map((product) => ({
    label: product?.title,
    value: Number(product?.quantity),
    color: generateColor(),
  }));
  console.log(productsPerCategory);
  

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
