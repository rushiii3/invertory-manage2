import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserStore } from "@/store/user-store";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { Login } from "@/types";


export const useLogin = () => {
  const router = useRouter();
  const formSchema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .min(4, "Password must be at least 8 characters")
      .required("Please enter your password"),
    email: yup.string().trim().required("Please input your email").email(),
  });
  const { control, handleSubmit, reset } = useForm<Login>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const { loginUser } = useUserStore();
  const onSubmit = async(data: Login) => {
    console.log(await loginUser(data),"loginnn");
    
    if (await loginUser(data)) {
      Alert.alert("Login successfull");
      router.replace("/(tabs)/dashboard")
    } else {
      Alert.alert("Login failed");
    }
  };
  return {
    control,
    handleSubmit,
    onSubmit,
  };
};
