import {
  StyleSheet,
  Text,
  Image,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ListRenderItemInfo,
  View,
} from "react-native";
import React from "react";
import Input from "@/components/Input";
import { Dropdown } from "react-native-element-dropdown";
import { useProduct } from "@/hooks/useProduct";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProductForm = ({ data }: any) => {
  const router = useRouter();
  const {
    primaryImage,
    pickImage,
    ListOfImages,
    pickImageMultiple,
    setTitle,
    Title,
    setDescription,
    Description,
    category,
    value,
    setValue,
    handleSubmit,
    Quantity,
    setQuantity,
    setWeight,
    Weight,
    setDimensions,
    Dimensions,
    handleDeletePrimaryImage,
    handleDeleteMultiple
  } = useProduct(data || null);
  const renderItem = ({ item }: ListRenderItemInfo<string>) => {
    return (
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: item }}
          style={{ width: 100, height: 100, marginBottom: 20, margin: 10 }}
        />
        <TouchableOpacity
            style={{
              position: "absolute",
              backgroundColor: "black",
              height: 30,
              width: 30,
              borderRadius: 100,
              top: 0,
              right: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {handleDeleteMultiple(item)}}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView
      style={{ paddingHorizontal: 16, marginVertical: 30 }}
      automaticallyAdjustContentInsets
    >
      {primaryImage ? (
        <View
          style={{
            position: "relative",
            height: 200,
            width: 200,
            marginHorizontal: "auto",
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: primaryImage }} style={styles.image} />
          <TouchableOpacity
            style={{
              position: "absolute",
              backgroundColor: "black",
              height: 50,
              width: 50,
              borderRadius: 100,
              top: 0,
              right: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleDeletePrimaryImage}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <Button title="Select an primary image" onPress={pickImage} />
      )}
      {ListOfImages?.length! > 0 && (
        <FlatList data={ListOfImages} renderItem={renderItem} horizontal />
      )}
      <Button title="Select an secondary images" onPress={pickImageMultiple} />
      <Input label={"Title"} setInput={setTitle} value={Title} />
      <Input
        label={"Description"}
        setInput={setDescription}
        value={Description}
      />
      <Text style={styles.inputLabel}>Select Category</Text>
      {category.length > 0 ? (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={category}
          maxHeight={300}
          labelField="title"
          valueField="id"
          placeholder="Select category"
          value={value}
          onChange={(item) => {
            console.log(item);

            setValue(item.id);
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            router.push("/(add)/category");
          }}
        >
          <Text style={styles.selectedTextStyle}>Add category</Text>
        </TouchableOpacity>
      )}
      <Input label={"Quantity"} setInput={setQuantity} value={Quantity} />
      <Input label={"Weight"} setInput={setWeight} value={Weight} />
      <Input label={"Dimensions"} setInput={setDimensions} value={Dimensions} />
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
    </ScrollView>
  );
};

export default ProductForm;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    marginBottom: 20,
    margin: "auto",
    objectFit: "cover",
    borderRadius: 20,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 15,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
});
