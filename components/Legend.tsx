import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Legend = ({ text, color }: { text: string; color: string }) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 12 }}>
      <View
        style={{
          height: 18,
          width: 18,
          marginRight: 10,
          borderRadius: 4,
          backgroundColor: color || "white",
        }}
      />
      <Text style={{ color: "white", fontSize: 16 }}>{text || ""}</Text>
    </View>
  );
};
export default Legend;

const styles = StyleSheet.create({});
