import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
interface InputProps extends TextInputProps {
  label: string;
  value: string;
  setInput: (text: string) => void;
}
const Input = ({ label, value, setInput, ...props }: InputProps) => {
  return (
    <View style={styles.input}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.inputControl]}
        value={value}
        onChangeText={(text) => {
          setInput(text);
        }}
        {...props}
      />
    </View>
  );
};

export default Input;

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
