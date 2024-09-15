import { useUserStore } from "@/store/user-store";
import { Redirect } from "expo-router";
import React from "react";

export const withAuth = (Component) => {
  return (props) => {
    const { currentUser } = useUserStore(); // Call the hook inside the returned component

    if (currentUser) {
      return <Component {...props} />;
    }

    return <Redirect href="/login" />;
  };
};
