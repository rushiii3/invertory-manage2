import { create } from "zustand";
import { ProductStorage } from "./store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Product, ProductStore } from "@/types";

export const useProductStore = create<ProductStore>((set, get) => ({
  Products: [],
  userProducts: [],
  initializeProducts: async () => {
    const ProductSaved = await ProductStorage.getItem("products");
    if (ProductSaved) {
      set({ Products: JSON.parse(ProductSaved) });
    }
  },
  getUserProducts: async (user) => {
    const allProducts = await ProductStorage.getItem("products");
    if (allProducts) {
      const parsedProducts = JSON.parse(allProducts);
      const getUserProducts = parsedProducts.filter(
        (product: Product) => product.email === user
      );
      set({ userProducts: getUserProducts });
    }
  },
  addProduct: async (data) => {
    try {
      const allProducts = get().Products;
      const isAlready = allProducts.find(
        (product: Product) => product.title === data.title
      );
      if (isAlready) {
        return false;
      }
      const getUserProducts = get().getUserProducts;
      const newProduct = {
        id: uuidv4(),
        primary_image: data.primary_image,
        title: data.title,
        description: data.description,
        quantity: data.quantity,
        weight: data.weight,
        dimensions: data.dimensions,
        list_images: data.list_images,
        email: data.email,
        category: data.category,
        date: new Date(),
      };
      const updatedProduct = [newProduct, ...get().Products];
      await ProductStorage.setItem("products", JSON.stringify(updatedProduct));
      set({ Products: updatedProduct });
      await getUserProducts(data?.email!);
      return true;
    } catch (error) {
      console.error("Error adding product:", error);
      return false;
    }
  },
  deleteProduct: async (id: string, email: string) => {
    try {
      const allProducts = get().Products;
      const deletedProducts = allProducts.filter(
        (product: Product) => product.id !== id && product.email === email
      );
      await ProductStorage.setItem("products", JSON.stringify(deletedProducts));
      set({ Products: deletedProducts });
      const getUserProducts = get().getUserProducts;
      await getUserProducts(email);
      return true;
    } catch (error) {
      return false;
    }
  },
  getSingleProduct: async (id: string) => {
    const allProduct = get().userProducts;
    const Product = allProduct.find((product: Product) => product.id === id);
    return Product;
  },
  updateProduct: async (data) => {
    try {
      const allProducts = get().Products;
      const productIndex = allProducts.findIndex(
        (product: Product) =>
          product.id === data.id && product.email === data.email
      );

      if (productIndex === -1) {
        console.error("Product not found");
        return false;
      }

      const updatedProduct = [...allProducts];
      updatedProduct[productIndex] = {
        ...updatedProduct[productIndex],
        primary_image: data.primary_image,
        title: data.title,
        description: data.description,
        quantity: data.quantity,
        weight: data.weight,
        dimensions: data.dimensions,
        list_images: data.list_images,
        category: data.category,
      };

      await ProductStorage.setItem("products", JSON.stringify(updatedProduct));

      set({ Products: updatedProduct });

      const getUserProducts = get().getUserProducts;
      await getUserProducts(data?.email!);

      return true;
    } catch (error) {
      console.error("Error updating product:", error);
      return false;
    }
  },
}));
