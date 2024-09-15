import { Alert } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useCategoryStore } from "@/store/useCategory";
import { useProductStore } from "@/store/useProduct";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "expo-router";
import { Product } from "@/types";

export const useProduct = (data: Product | null) => {
  const router = useRouter();
  const { addHistory, currentUser } = useUserStore();
  const { addProduct, updateProduct } = useProductStore();
  const [value, setValue] = useState(data?.category || null);
  const { category } = useCategoryStore();
  const [primaryImage, setPrimaryImage] = useState<string | null>(
    data?.primary_image || null
  );
  const [ListOfImages, setListOfImages] = useState<string[] | undefined>(
    data?.list_images && data?.list_images.length > 0
      ? data.list_images
      : undefined
  );

  const [Title, setTitle] = useState<string>(data?.title || "");
  const [Description, setDescription] = useState<string>(
    data?.description || ""
  );
  const [Quantity, setQuantity] = useState<string>(data?.quantity || "");
  const [Weight, setWeight] = useState<string>(data?.weight || "");
  const [Dimensions, setDimensions] = useState<string>(data?.dimensions || "");

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

      setListOfImages((prev: string[] | undefined) => {
        const uploadedImages = result.assets.map((image) => {
          return image.uri;
        });
        console.log(prev);
        if (prev) {
          return prev.concat(uploadedImages);
        }else{
          return uploadedImages

        }
      });
    }
  };
  const handleSubmit = async () => {
    if (!primaryImage) {
      Alert.alert("Primary image is required");
      return;
    }
    if (ListOfImages?.length! < 0) {
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
      email: currentUser?.email,
      category: value,
      id: data?.id || null,
    };

    if (data) {
      if (await updateProduct(productdata)) {
        router.replace("/(tabs)/product");
        Alert.alert("Product Updated successfully");
        addHistory(currentUser?.email!, true, "product", Title, "Updated");
      } else {
        Alert.alert("Failed to update Product");
        addHistory(currentUser?.email!, false, "product", Title, "Updated");
      }
    } else {
      if (await addProduct(productdata)) {
        router.replace("/(tabs)/product");
        Alert.alert("Product Added successfully");
        addHistory(currentUser?.email!, true, "product", Title, "Added");
      } else {
        Alert.alert("Failed to add Product");
        addHistory(currentUser?.email!, false, "product", Title, "Added");
      }
    }
  };
  const handleDeletePrimaryImage = () => {
    setPrimaryImage(null);
  }
  const handleDeleteMultiple = (id:string) =>{
    const updateList = ListOfImages?.filter((image)=>image!==id);
    setListOfImages(updateList);
  }
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
    handleDeletePrimaryImage,
    handleDeleteMultiple
  };
};
