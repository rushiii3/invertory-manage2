import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";

interface UserRegisterProps {
  data: InnerData[];
}

interface InnerData {
  label: string;
  value: number;
}

const UserRegister = ({ data }: UserRegisterProps) => {  
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Registered Users</Text>

        {data.length > 0 && (
          <LineChart
            data={data}
            initialSpacing={0}
            spacing={100}
            hideDataPoints
            thickness={3}
            hideRules
            xAxisLabelTextStyle={styles.xAxisLabel}
            color="white"
            yAxisTextStyle={{ color: "white" }}
            yAxisColor={"white"}
            xAxisColor={"white"}
          />
        )}
      </View>
    </View>
  );
};

export default UserRegister;

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
  xAxisLabel: {
    fontSize: 10,
    color: "white",
  },
});
