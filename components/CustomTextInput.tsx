import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

interface InputProps extends TextInputProps {
  label: string;
  name: string;
  control: any;
}
const CustomTextInput = ({ label, name, control, ...props }: InputProps) => {
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
            <TextInput
              style={[styles.inputControl, error && { borderColor: "red" }]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...props}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default CustomTextInput;

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
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
});
