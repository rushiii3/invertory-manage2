import { Alert } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useCategoryStore } from "@/store/useCategory";
import { useProductStore } from "@/store/useProduct";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "expo-router";

type RootObject = {
  description: string;
  dimensions: string;
  email: string;
  id: string;
  list_images: string[];
  primary_image: string;
  quantity: string;
  title: string;
  weight: string;
};
export const useProduct = (data: RootObject[] | null) => {
  const router = useRouter();
  const { addHistory, currentUser } = useUserStore();
  const { addProduct, updateProduct } = useProductStore();
  const [value, setValue] = useState(data?.category || null);
  const { category } = useCategoryStore();
  const [primaryImage, setPrimaryImage] = useState<string | null>(
    data?.primary_image || null
  );
  const [ListOfImages, setListOfImages] = useState(
    data?.list_images.length > 0 ? data?.list_images : []
  );
  const [Title, setTitle] = useState(data?.title || "");
  const [Description, setDescription] = useState(data?.description || "");
  const [Quantity, setQuantity] = useState(data?.quantity || 0);
  const [Weight, setWeight] = useState(data?.weight || 0);
  const [Dimensions, setDimensions] = useState(data?.dimensions || "");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPrimaryImage(result.assets[0].uri);
    }
  };
  const pickImageMultiple = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log();

      setListOfImages((prev) => {
        const uploadedImages = result.assets.map((image) => {
          return image.uri;
        });
        return prev.concat(uploadedImages);
      });
    }
  };
  const handleSubmit = async () => {
    if (!primaryImage) {
      Alert.alert("Primary image is required");
      return;
    }
    if (ListOfImages.length < 0) {
      Alert.alert("ListOfImages image is required");
      return;
    }
    if (!Title) {
      Alert.alert("Title is required");
      return;
    }
    if (!Description) {
      Alert.alert("Description is required");
      return;
    }
    if (!Quantity) {
      Alert.alert("Quantity is required");
      return;
    }
    if (!Weight) {
      Alert.alert("Weight is required");
      return;
    }
    if (!Dimensions) {
      Alert.alert("Dimensions is required");
      return;
    }
    const productdata = {
      primary_image: primaryImage,
      title: Title,
      description: Description,
      quantity: Quantity,
      weight: Weight,
      dimensions: Dimensions,
      list_images: ListOfImages,
      email: currentUser.email,
      category: value,
      id: data?.id || null,
    };

    if (data) {
      if (await updateProduct(productdata)) {
        router.replace("/(tabs)/product");
        Alert.alert("Product Updated successfully");
        addHistory(currentUser.email, true, "product", Title, "Updated");
      } else {
        Alert.alert("Failed to update Product");
        addHistory(currentUser.email, false, "product", Title, "Updated");
      }
    } else {
      if (await addProduct(productdata)) {
        router.replace("/(tabs)/product");
        Alert.alert("Product Added successfully");
        addHistory(currentUser.email, true, "product", Title, "Added");
      } else {
        Alert.alert("Failed to add Product");
        addHistory(currentUser.email, false, "product", Title, "Added");
      }
    }
  };
  return {
    handleSubmit,
    pickImageMultiple,
    pickImage,
    Dimensions,
    setDimensions,
    Weight,
    setWeight,
    Quantity,
    setQuantity,
    Description,
    setDescription,
    Title,
    setTitle,
    category,
    value,
    setValue,
    primaryImage,
    ListOfImages,
  };
};
