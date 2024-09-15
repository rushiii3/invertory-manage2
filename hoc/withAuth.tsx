import { useUserStore } from "@/store/user-store";
import { Redirect } from "expo-router";

export const withAuth = (Component) => {
  // const { currentUser } = useUserStore();

  return (...props) => {
    if (true) {
      return <Component {...props} />;
    }
    return <Redirect href={"/login"} />;
  };
};
