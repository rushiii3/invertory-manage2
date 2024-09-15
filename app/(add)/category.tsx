import CategoryForm from "@/components/CategoryForm";
import { withAuth } from "@/hoc/withAuth";
const AuthAddCategory = withAuth(CategoryForm);
const Page = () => {
  return (
    <AuthAddCategory data={null} />
  );
};

export default Page;
