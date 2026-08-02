"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Home, Users, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = {
  TENANT: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard/tenant" },
    { title: "Browse Properties", icon: Home, href: "/properties" },
  ],
  LANDLORD: [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard/landlord" },
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

export function DashboardHeader({
  role,
}: {
  role: "TENANT" | "LANDLORD" | "ADMIN";
}) {
  const pathname = usePathname();
  const items = menuItems[role] || menuItems.TENANT;

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2 shrink-0",
                    isActive ? "" : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}