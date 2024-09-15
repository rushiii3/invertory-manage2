import Dashboard from "@/components/Screen/Dashboard";
import { withAuth } from "@/hoc/withAuth";

const DashboardWithAuth = withAuth(Dashboard);

const Page = () => {
  return <DashboardWithAuth />;
};

export default Page;
