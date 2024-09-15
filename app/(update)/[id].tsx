import Update from "@/components/Screen/Update";
import { withAuth } from "@/hoc/withAuth";
import { useLocalSearchParams } from "expo-router";

const AuthWithUpdate = withAuth(Update);
const Page = () => {
  const { id, type } = useLocalSearchParams();
  return <AuthWithUpdate id={id} type={type} />;
};

export default Page;
