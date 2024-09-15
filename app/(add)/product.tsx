import ProductForm from "@/components/ProductForm";
import { withAuth } from "@/hoc/withAuth";
const AuthAddProduct = withAuth(ProductForm);
const Page = () => {
  return <AuthAddProduct data={null} />;
};

export default Page;
