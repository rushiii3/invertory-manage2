import { create } from "zustand";
import { categoryStorage } from "./store";
import { v4 as uuidv4 } from "uuid";

export const useCategoryStore = create((set, get) => ({
  category: [],
  initializeCategory: async () => {
    const categorySaved = await categoryStorage.getItem("category");
    if (categorySaved) {
      set({ category: JSON.parse(categorySaved) });
    }
  },
  addCategory: async (data) => {
    try {
      const allCategory = get().category;
      const isAlready = allCategory.find(
        (category) => category.title === data.title
      );

      if (isAlready) {
        return false;
      }
      const newCategory = {
        id: uuidv4(),
        image: data.image,
        title: data.title,
        description: data.description,
        date : new Date(),
      };

      const updatedCategory = [newCategory, ...get().category];
      console.log(updatedCategory);
      
      await categoryStorage.setItem(
        "category",
        JSON.stringify(updatedCategory)
      );

      set({ category: updatedCategory });

      return true;
    } catch (error) {
      console.error("Error adding user:", error);
      return false;
    }
  },
  deleteCategory: async (id: string) => {
    try {
      const allCategory = get().category;

      const deletedCategory = allCategory.filter(
        (category) => category.id !== id
      );
      await categoryStorage.setItem(
        "category",
        JSON.stringify(deletedCategory)
      );
      set({ category: deletedCategory });
      return true;
    } catch (error) {
      return false;
    }
  },

  getSingleCategory: async (id: string) => {
    const allCategory = get().category;
    const Category = allCategory.find((category) => category.id === id);
    return Category;
  },
  updateCategory: async (data) => {
    try {
      const allCategory = get().category;
      console.log(data.id);
      
      const categoryIndex = allCategory.findIndex(
        (category) => category.id === data.id
      );

      if (categoryIndex === -1) {
        console.error("Category not found");
        return false;
      }

      const updatedCategory = [...allCategory];
      updatedCategory[categoryIndex] = {
        ...updatedCategory[categoryIndex],
        image: data.image,
        title: data.title,
        description: data.description,
      };

      await categoryStorage.setItem(
        "category",
        JSON.stringify(updatedCategory)
      );

      set({ category: updatedCategory });

      return true;
    } catch (error) {
      console.error("Error updating category:", error);
      return false;
    }
  },
}));
