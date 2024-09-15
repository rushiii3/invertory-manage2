import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useCategoryStore } from "@/store/useCategory";
import { Alert } from "react-native";
import { useUserStore } from "@/store/user-store";

export const useCategory = (data) => {
  const [image, setImage] = useState<string | null>(data?.image || null);
  const [Title, setTitle] = useState(data?.title || "");
  const [Description, setDescription] = useState(data?.description || "");
  const { addCategory, updateCategory } = useCategoryStore();
  const { addHistory, currentUser } = useUserStore();

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
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert("Image is required");
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
    const categorydata = {
      image: image,
      title: Title,
      description: Description,
      id: data?.id || null,
    };

    if (data) {
      if (await updateCategory(categorydata)) {
        Alert.alert("Category Updated successfully");
        setDescription("");
        setTitle("");
        setImage("");
        addHistory(currentUser.email, true, "category", Title, "Updated");
      } else {
        Alert.alert("Failed to update category");
        addHistory(currentUser.email, false, "category", Title, "Updated");
      }
    } else {
      if (await addCategory(categorydata)) {
        console.log("addinggg");

        Alert.alert("Category Added successfully");
        setDescription("");
        setTitle("");
        setImage("");
        addHistory(currentUser.email, true, "category", Title, "Added");
      } else {
        Alert.alert("Failed to add category");
        addHistory(currentUser.email, false, "category", Title, "Added");
      }
    }
  };

  return {
    image,
    Title,
    setTitle,
    Description,
    setDescription,
    pickImage,
    handleSubmit,
  };
};
