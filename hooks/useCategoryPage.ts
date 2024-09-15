import { useCategoryStore } from "@/store/useCategory";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";

export const useCategoryPage = () => {
  const { category, deleteCategory } = useCategoryStore();
  const { currentUser, addHistory } = useUserStore();

  const router = useRouter();
  const handleDelete = useCallback(async (id: string, title: string) => {
    if (await deleteCategory(id)) {
      Alert.alert("Deleted successfully!");
      addHistory(currentUser?.email!, true, "category", title, "Deleted");
    } else {
      Alert.alert("Failed to  delete!");
      addHistory(currentUser?.email!, true, "category", title, "Deleted");
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

  return {
    handleEdit,
    handleDelete,
    category,
  };
};
