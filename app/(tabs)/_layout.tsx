import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUserStore } from "@/store/user-store";

export default function RootLayout() {
  const router = useRouter();
  const {logoutUser} = useUserStore();
  return (
    <Tabs initialRouteName="dashboard">
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={async () => {
                await logoutUser();
                // router.push("/(view)/history");
              }}
            >
              <FontAwesome name="history" size={24} color="black" />
            </TouchableOpacity>
          ),

          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => {

                router.replace("/login");
              }}
            >
              <Ionicons name="exit" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Categories",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                router.push("/(add)/category");
              }}
            >
              <FontAwesome6 name="add" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: "Products",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                router.push("/(add)/product");
              }}
            >
              <FontAwesome6 name="add" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
