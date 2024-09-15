import {
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { useCategoryPage } from "@/hooks/useCategoryPage";
import SwipableComponent from "../SwipableComponent";
import { Category as CategoryProps } from "@/types";
import { Link } from "expo-router";

const Category = () => {
  const { category, handleDelete, handleEdit } = useCategoryPage();
  const renderItem = useCallback(({ item }: ListRenderItemInfo<CategoryProps>) => {
    return (
      <SwipableComponent
        item={item}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        type={"category"}
      />
    );
  }, []);
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 20 }}>
      <FlatList
        data={category}
        renderItem={renderItem}
        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              No Products
            </Text>
            <Link href={"/(add)/category"} style={{marginTop:10}}>
              <View
                style={{
                  backgroundColor: "#4287f5",
                  alignItems: "center",
                  paddingVertical: 10,
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  marginTop:10
                }}
              >
                <Text style={{color:"white"}}>Add Category</Text>
              </View>
            </Link>
          </View>
        }
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
      />
    </View>
  );
};

export default Category;
