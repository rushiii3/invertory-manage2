import uniqolor from "uniqolor";
import { useCategoryStore } from "@/store/useCategory";
import { useProductStore } from "@/store/useProduct";
import { useUserStore } from "@/store/user-store";
import { useEffect, useState } from "react";
import { Category, Product } from "@/types";

interface ChartData {
  label: string;
  value: number;
}

export const useDashboard = () => {
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

  const [lowInventoryProducts, setLowInventoryProducts] = useState<Product[]>(
    []
  );
  const [productsPerCategory, setProductsPerCategory] = useState<
    { label: string; value: number }[]
  >([]);
  const [userRegistrationData, setUserRegistrationData] = useState<ChartData[]>(
    []
  );

  useEffect(() => {
    const lowInventory = Products.filter(
      (product) => parseInt(product?.quantity) < 5
    );

    setLowInventoryProducts(lowInventory);

    const categoryProductCount = category
      .map((cat) => ({
        label: cat.title,
        value: Products.filter((product) => product.category === cat.id).length,
      }))
      .filter((cat) => cat.value > 0);

    setProductsPerCategory(categoryProductCount);

    const chartData = users.reduce<ChartData[]>((acc, user) => {
      const date = new Date(user.date).toLocaleDateString();
      const existingEntry = acc.find((entry) => entry.label === date);
      if (existingEntry) {
        existingEntry.value += 1;
      } else {
        acc.push({ label: date, value: 1 });
      }

      return acc;
    }, []);
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

  return {
    categoryData,
    productsPerCategory,
    lowInventoryData,
    userRegistrationData,
  };
};
