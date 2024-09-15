import { useProductStore } from "@/store/useProduct";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { Alert } from "react-native";

export const useProductPage = () => {
  const { currentUser, addHistory } = useUserStore();
  const { getUserProducts, userProducts, deleteProduct } = useProductStore();
  const router = useRouter();

  useEffect(() => {
    if (currentUser?.email) {
      getUserProducts(currentUser.email);
    }
  }, [currentUser]);

  const handleDelete = useCallback(async (id: string, title: string) => {
    if (await deleteProduct(id, currentUser?.email!)) {
      Alert.alert("Deleted successfully!");
      addHistory(currentUser?.email!, true, "product", title, "Deleted");
    } else {
      Alert.alert("Failed to  delete!");
      addHistory(currentUser?.email!, true, "product", title, "Deleted");
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
  }, []);

  return {
    handleEdit,
    handleDelete,
    userProducts,
  };
};
