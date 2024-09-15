import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const CustomTextInputPassword = ({ label, name, control, ...props }) => {
  const [isVisible, setisVisible] = useState(true);
  const handleToggleVisiblity = () => {
    setisVisible(!isVisible);
  };
  return (
    <View style={styles.input}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View style={{ position: "relative" }}>
              <TextInput
                style={[styles.inputControl, error && { borderColor: "red" }]}
                value={value}
                secureTextEntry={isVisible}
                onChangeText={onChange}
                onBlur={onBlur}
                {...props}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 10 }}
                onPress={handleToggleVisiblity}
              >
                {isVisible ? (
                  <AntDesign name="eye" size={24} color="black" />
                ) : (
                  <Entypo name="eye-with-line" size={24} color="black" />
                )}
              </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default CustomTextInputPassword;

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    paddingRight: 40,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
});
