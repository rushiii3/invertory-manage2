import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserStore } from "@/store/user-store";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
type register = {
    email: string;
    name: string;
    phone: string;
    password: string;
    confirmpassword: string;
  };
export const useRegister = () => {
  const router = useRouter();
  const {addUser} = useUserStore();
  const formSchema = yup.object().shape({
    email: yup.string().trim().required("Please input your email").email(),
    name: yup
      .string()
      .required("Please input your name")
      .min(5, "Name must be min of 5 characters"),
    phone: yup
      .string()
      .max(10, "Phone number must be of 10 digits")
      .required("Please input your phone number"),
    password: yup
      .string()
      .trim()
      .required("Please input your password")
      .min(4, "Password must be at least 8 characters")
      .required("Please enter your password"),
    confirmpassword: yup
      .string()
      .trim()
      .required("Please input your confirm password")
      .min(4, "Password must be at least 8 characters")
      .required("Please enter your confirm password")
      .oneOf(
        [yup.ref("password")],
        "Confirm Password doesnt match with the password"
      ),
  });
  const { control, handleSubmit, reset } = useForm<register>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async(data: register) => {
    if (await addUser(data)) {
      Alert.alert("Register successfull");
      router.replace("/")
    } else {
      Alert.alert("Register failed");
    }
  };
  return {
    control,
    handleSubmit,
    onSubmit
  };
};
