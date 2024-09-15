import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";

const UserRegister = ({ data }) => {
  return (
    <View>
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
          Registered Users
        </Text>

        {data.length > 0 && (
          <LineChart
            data={data}
            initialSpacing={0}
            spacing={30}
            hideDataPoints
            thickness={3}
            hideRules
            xAxisLabelTextStyle={{ fontSize: 10, color: "gray" }}
            color="white"
          />
        )}
      </View>
    </View>
  );
};

export default UserRegister;

const styles = StyleSheet.create({});
