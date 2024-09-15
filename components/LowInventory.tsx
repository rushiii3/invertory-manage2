import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";
import Legend from "./Legend";

interface LowInventoryProps {
  data: InnerData[];
}

interface InnerData {
  color: string;
  label: string;
  value: number;
}

const LowInventory = ({ data }: LowInventoryProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Low Inventory Products</Text>

        {data.length > 0 && (
          <PieChart
            strokeColor="white"
            strokeWidth={4}
            donut
            data={data}
            innerCircleColor="#414141"
            innerCircleBorderWidth={4}
            innerCircleBorderColor="white"
            showValuesAsLabels
            showTextBackground
            centerLabelComponent={() => (
              <View style={styles.centerLabel}>
                <Text style={styles.totalCount}>{data.length}</Text>
                <Text style={styles.totalText}>Total</Text>
              </View>
            )}
          />
        )}

        <View style={styles.legendContainer}>
          {data.length > 0 &&
            data.map((category, index) => (
              <Legend
                text={category.label}
                color={category.color}
                key={index}
              />
            ))}
        </View>
      </View>
    </View>
  );
};

export default LowInventory;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  chartContainer: {
    borderRadius: 10,
    paddingVertical: 50,
    backgroundColor: "#414141",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
  },
  centerLabel: {
    alignItems: "center",
  },
  totalCount: {
    color: "white",
    fontSize: 36,
    textAlign: "center",
  },
  totalText: {
    color: "white",
    fontSize: 18,
  },
  legendContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
});
