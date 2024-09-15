import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const CategoryCard = ({item}) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 10, gap: 10 }}>
      <Image
        source={{ uri:  item.image ||  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"  }}
        style={{ height: 150, width: 150, borderRadius: 20 }}
      />
      <View>
        <Text style={{ fontSize: 20, fontWeight: "800" }} numberOfLines={1}>
          {item.title}
        </Text>
        <Text numberOfLines={2}>{item.description}</Text>
      </View>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
