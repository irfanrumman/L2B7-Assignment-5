"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Users,
  ListChecks,
  Settings,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const menuItems = {
  TENANT: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard/tenant" },
    { title: "Browse Properties", icon: Home, href: "/properties" },
  ],
  LANDLORD: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard/landlord" },
    { title: "Add Property", icon: LayoutDashboard, href: "/dashboard/landlord/properties/new" },
    { title: "My Properties", icon: Home, href: "/dashboard/landlord/properties" },
    { title: "Tenant Requests", icon: ListChecks, href: "/dashboard/landlord/rental-requests" },
  ],
  ADMIN: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard/admin" },
    { title: "Users", icon: Users, href: "/dashboard/admin/users" },
    { title: "Properties", icon: Home, href: "/dashboard/admin/properties" },
    { title: "Rental Requests", icon: ListChecks, href: "/dashboard/admin/rental-requests" },
  ],
};

export function DashboardSidebar({
  role,
}: {
  role: "TENANT" | "LANDLORD" | "ADMIN";
}) {
  const pathname = usePathname();
  const items = menuItems[role] || menuItems.TENANT;

  return (
    <Sidebar className="top-16 h-[calc(100vh-4rem)]">
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                  <Link href={item.href} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <SidebarSeparator className="my-4" />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/dashboard/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Help">
              <Link href="#" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <div className="text-xs text-muted-foreground">
          <p>© 2026 RentNest</p>
          <p>All rights reserved</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}