import ProductComponent from "@/components/Screen/Product";
import { withAuth } from "@/hoc/withAuth";

const AuthWithProduct = withAuth(ProductComponent);

const Page = () => {
  return <AuthWithProduct />;
};

export default Page;
