import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomTextInput from "@/components/CustomTextInput";
import CustomTextInputPassword from "@/components/CustomTextInputPassword";
import { Link } from "expo-router";
import { useLogin } from "@/hooks/useLogin";

const Page = () => {
  const { control, onSubmit, handleSubmit } = useLogin();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
        width: "100%",
        paddingHorizontal: 16,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 35, fontWeight: "bold", marginTop: 10 }}>
          Login
        </Text>
        <Text style={{ marginBottom: 20 }}>Welcome to the beatuy store</Text>
        <CustomTextInput
          control={control}
          label={"Email"}
          name={"email"}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomTextInputPassword
          control={control}
          label={"Password"}
          name={"password"}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#4287f5",
            alignItems: "center",
            paddingVertical: 10,
            borderRadius: 20,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 15, marginTop: 10, textAlign: "center" }}>
          Dont have an account ?{" "}
          <Link href={"/register"}>
            <Text style={{ color: "blue" }}>Register</Text>
          </Link>
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
