import History from "@/components/Screen/History";
import { withAuth } from "@/hoc/withAuth";

const HistoryWithAuth = withAuth(History);
const Page = () => {
  return <HistoryWithAuth />;
};

export default Page;
