import { AuthProvider } from "@/Context/Authentication";
import { useUserStore } from "@/store/user-store";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useProductStore } from "@/store/useProduct";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCategoryStore } from "@/store/useCategory";

export const unstable_settings = {
  initialRouteName: "login",
};
const InitalLayout = () => {
  const router = useRouter();
  const { currentUser, getCurrentUser, initalizeHistory, initalizeUsers } = useUserStore();
  const { initializeProducts } = useProductStore();
  const { initializeCategory } = useCategoryStore();

  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const loadingInitalDetails = async () => {
      await getCurrentUser();
      await initializeProducts();
      await initializeCategory();
      await initalizeHistory();
      await initalizeUsers();
      setUserLoaded(true);
    };

    loadingInitalDetails();
  }, []);

  useEffect(() => {
    if (userLoaded) {
      checkInitialLogin();
    }
  }, [userLoaded, currentUser]);

  const checkInitialLogin = async () => {
    console.log(currentUser);
    if (currentUser) {
      await router.replace("/(tabs)/dashboard");
    }
  };

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(add)/product"
        options={{
          headerShown: true,
          title: "Add Product",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="(add)/category"
        options={{
          headerShown: true,
          title: "Add Category",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="(update)/[id]"
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="(view)/history"
        
        options={{
          title:"Your history",
          presentation:"modal",
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
};
export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <InitalLayout />
    </GestureHandlerRootView>
  );
}
