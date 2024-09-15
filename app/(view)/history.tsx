import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUserStore } from "@/store/user-store";
import AntDesign from "@expo/vector-icons/AntDesign";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

// English.
const Page = () => {
  const timeAgo = new TimeAgo("en-US");

  const { userHistory } = useUserStore();
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderBottomWidth: 0.2,
          paddingVertical: 20,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            backgroundColor: item.status ? "#22bb33" : "#bb2124",
            height: 50,
            width: 50,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.status ? (
            <AntDesign name="check" size={24} color="white" />
          ) : (
            <AntDesign name="close" size={24} color="black" />
          )}
        </View>
        <View>
          <Text style={{fontWeight:"bold"}}>{item.message}</Text>
          <Text>{timeAgo.format(new Date(item.date))}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <FlatList data={userHistory} renderItem={renderItem} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
