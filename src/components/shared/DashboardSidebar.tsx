"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Users,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth-context";

const menuItems = {
  tenant: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard/tenant",
    },
    {
      title: "My Properties",
      icon: Home,
      href: "/dashboard/properties",
    },
    {
      title: "Applications",
      icon: FileText,
      href: "/dashboard/applications",
    },
  ],
  landlord: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard/landlord",
    },
    {
      title: "My Properties",
      icon: Home,
      href: "/dashboard/properties",
    },
    {
      title: "Tenant Requests",
      icon: Users,
      href: "/dashboard/requests",
    },
    {
      title: "Applications",
      icon: FileText,
      href: "/dashboard/applications",
    },
  ],
  admin: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard/admin",
    },
    {
      title: "Users",
      icon: Users,
      href: "/dashboard/users",
    },
    {
      title: "Properties",
      icon: Home,
      href: "/dashboard/properties",
    },
    {
      title: "Reports",
      icon: FileText,
      href: "/dashboard/reports",
    },
  ],
};

export function DashboardSidebar({role}: { role: "tenant" | "landlord" | "admin" }) {
  const pathname = usePathname();
  const items = menuItems[role] || menuItems.tenant;

  return (
    <Sidebar className="top-16 h-[calc(100vh-4rem)]">
      {/* <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
            N
          </div>
          <span className="font-bold text-foreground">RentNest</span>
        </div>
      </SidebarHeader> */}

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                >
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
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2"
              >
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
