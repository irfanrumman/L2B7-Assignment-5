// import { redirect } from "next/navigation";
// import { Navbar } from "@/components/shared/navbar";
// import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
// import { getMe } from "@/service/getMe";
// import {DashboardSidebar} from "@/components/shared/DashboardSidebar";

// const DashboardLayout = async ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const result = await getMe();

//   // User logged in na thakle, dashboard e dhukte dibo na
//   if (!result.success) {
//     redirect("/login");
//   }

//   const user = result.data.user;

//   return (
//     <div className="min-h-screen flex flex-col bg-background">

//       <SidebarProvider>
//         <div className="flex flex-1 w-full">
//           <DashboardSidebar role={user.role} />

//           <main className="flex-1 min-w-0 bg-muted/30">
//             <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
//               {children}
//             </div>
//           </main>
//         </div>
//       </SidebarProvider>
//     </div>
//   );
// };

// export default DashboardLayout;

import { redirect } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import { DashboardSidebar } from "@/components/shared/DashboardSidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const result = await getMe();

  // User logged in na thakle, dashboard e dhukte dibo na
  if (!result.success) {
    redirect("/login");
  }

  const user = result.data.user;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SidebarProvider>
        <DashboardSidebar role={user.role} />

        <SidebarInset>
            {/* py-6 */}
          <div className="mx-auto max-w-6xl px-4  sm:px-6 lg:px-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
