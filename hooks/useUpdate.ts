import { useCategoryStore } from "@/store/useCategory";
import { useProductStore } from "@/store/useProduct";
import { Category, Product, UpdateData } from "@/types";
import { useEffect, useState } from "react";

export const useUpdate = (
  id: string,
  type: "category" | "product"
): UpdateData => {
  const { getSingleCategory } = useCategoryStore();
  const { getSingleProduct } = useProductStore();

  const [data, setData] = useState<Product | Category | undefined>(undefined);
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

  return {
    data,
    loading,
  };
};
