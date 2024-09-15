import { StateStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const user_storage = new MMKV({
  id: "user-storage",
});
const product_storage = new MMKV({
  id: "user-storage",
});
const category_storage = new MMKV({
  id: "user-storage",
});

export const userStorage: StateStorage = {
  setItem: (name, value) => {
    return user_storage.set(name, value);
  },
  getItem: (name) => {
    const value = user_storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return user_storage.delete(name);
  },
};

export const ProductStorage: StateStorage = {
  setItem: (name, value) => {
    return product_storage.set(name, value);
  },
  getItem: (name) => {
    const value = product_storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return product_storage.delete(name);
  },
};

export const categoryStorage: StateStorage = {
  setItem: (name, value) => {
    return category_storage.set(name, value);
  },
  getItem: (name) => {
    const value = category_storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return category_storage.delete(name);
  },
};
