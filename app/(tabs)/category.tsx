import React from "react";
import { withAuth } from "@/hoc/withAuth";
import Category from "@/components/Screen/Category";

const AuthWithCategory = withAuth(Category);
const Page = () => {
  return <AuthWithCategory />;
};

export default Page;
