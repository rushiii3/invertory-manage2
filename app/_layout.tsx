import { useUserStore } from "@/store/user-store";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProduct";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCategoryStore } from "@/store/useCategory";
import { type ErrorBoundaryProps } from "expo-router";
import { View, Text } from "react-native";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{error.message}</Text>
      <Text onPress={retry}>Try Again?</Text>
    </View>
  );
}

const InitalLayout = () => {
  const router = useRouter();
  const { currentUser, getCurrentUser, initializeHistory, initializeUsers } =
    useUserStore();
  const { initializeProducts } = useProductStore();
  const { initializeCategory } = useCategoryStore();

  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const loadingInitalDetails = async () => {
      await getCurrentUser();
      await initializeProducts();
      await initializeCategory();
      await initializeHistory();
      await initializeUsers();
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
      router.replace("/(tabs)/dashboard");
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
          title: "Your history",
          presentation: "modal",
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
