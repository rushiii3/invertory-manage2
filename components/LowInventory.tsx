import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";
import Legend from "./Legend";

const LowInventory = ({ data }) => {
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
          Low Inventory Products
        </Text>

        {data && (
          <PieChart
            strokeColor="white"
            strokeWidth={4}
            donut
            data={data}
            innerCircleColor="#414141"
            innerCircleBorderWidth={4}
            innerCircleBorderColor={"white"}
            showValuesAsLabels={true}
            showTextBackground={true}
            centerLabelComponent={() => {
              return (
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 36,
                      textAlign: "center",
                    }}
                  >
                    {data.length}
                  </Text>
                  <Text style={{ color: "white", fontSize: 18 }}>Total</Text>
                </View>
              );
            }}
          />
        )}

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          {data.map((category, index) => (
            <Legend text={category.label} color={category.color} key={index} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default LowInventory;

const styles = StyleSheet.create({});
