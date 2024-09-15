import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUserStore } from "@/store/user-store";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function RootLayout() {
  const router = useRouter();
  const { logoutUser } = useUserStore();
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
                router.push("/(view)/history");
              }}
            >
              <FontAwesome name="history" size={24} color="black" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name="desktop-mac-dashboard"
              size={size}
              color={color}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={async () => {
                router.replace("/login");
                await logoutUser();
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
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons name="category" size={size} color={color} />
          ),
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
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons
              name="production-quantity-limits"
              size={size}
              color={color}
            />
          ),
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
