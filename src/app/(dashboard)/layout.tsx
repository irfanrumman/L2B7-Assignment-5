import { redirect } from "next/navigation";
import { getMe } from "@/service/getMe";
import { DashboardHeader } from "@/components/shared/DashboardHeader";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const result = await getMe();

  if (!result.success) {
    redirect("/login");
  }

  const user = result.data.user;

  return (
    <div>
      <DashboardHeader role={user.role} />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;