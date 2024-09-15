import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";

interface ProductPerCategoryProps {
  data: InnerData[];
}

interface InnerData {
  label: string;
  value: number;
}

const ProductPerCategory = ({ data }: ProductPerCategoryProps) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          borderRadius: 10,
          paddingVertical: 50,
          backgroundColor: "#414141",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Products Per Category
        </Text>

        {data.length > 0 && (
          <BarChart
            data={data}
            barBorderRadius={4}
            noOfSections={2}
            focusBarOnPress={true}
            key={"random2"}
            color={"white"}
            frontColor={"white"}
            yAxisTextStyle={{ color: "white" }}
            yAxisColor={"white"}
            xAxisColor={"white"}
            xAxisLabelTextStyle={{ color: "white" }}
            isThreeD
          />
        )}
      </View>
    </View>
  );
};

export default ProductPerCategory;
