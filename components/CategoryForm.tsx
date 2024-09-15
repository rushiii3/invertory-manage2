import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Input from "@/components/Input";
import { useCategory } from "@/hooks/useCategory";

const CategoryForm = ({ data }) => {
  const {
    image,
    Title,
    setTitle,
    Description,
    setDescription,
    pickImage,
    handleSubmit,
  } = useCategory(data || null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Button title="Select an image" onPress={pickImage} />
        )}
        <Input label={"Title"} setInput={setTitle} value={Title} />
        <Input
          label={"Description"}
          setInput={setDescription}
          value={Description}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#4287f5",
            alignItems: "center",
            paddingVertical: 10,
            borderRadius: 20,
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CategoryForm;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    margin: "auto",
  },
});
