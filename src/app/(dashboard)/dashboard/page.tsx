"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";

const dashboardContent = {
  tenant: {
    title: "Welcome Back, Tenant",
    cards: [
      {
        icon: Home,
        label: "Active Rentals",
        value: "2",
        color: "bg-blue-500/10",
      },
      {
        icon: FileText,
        label: "Applications",
        value: "1",
        color: "bg-green-500/10",
      },
      {
        icon: Calendar,
        label: "Upcoming Events",
        value: "3",
        color: "bg-purple-500/10",
      },
      {
        icon: DollarSign,
        label: "Monthly Payment",
        value: "$1,200",
        color: "bg-orange-500/10",
      },
    ],
  },
  landlord: {
    title: "Welcome Back, Landlord",
    cards: [
      {
        icon: Home,
        label: "My Properties",
        value: "5",
        color: "bg-blue-500/10",
      },
      {
        icon: Users,
        label: "Active Tenants",
        value: "8",
        color: "bg-green-500/10",
      },
      {
        icon: FileText,
        label: "Pending Requests",
        value: "2",
        color: "bg-yellow-500/10",
      },
      {
        icon: TrendingUp,
        label: "Monthly Revenue",
        value: "$5,400",
        color: "bg-orange-500/10",
      },
    ],
  },
  admin: {
    title: "Admin Dashboard",
    cards: [
      {
        icon: Users,
        label: "Total Users",
        value: "1,234",
        color: "bg-blue-500/10",
      },
      {
        icon: Home,
        label: "Total Properties",
        value: "456",
        color: "bg-green-500/10",
      },
      {
        icon: FileText,
        label: "Active Listings",
        value: "389",
        color: "bg-purple-500/10",
      },
      {
        icon: TrendingUp,
        label: "Total Revenue",
        value: "$125K",
        color: "bg-orange-500/10",
      },
    ],
  },
};

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.push('/login')
    // }
  }, [isAuthenticated, router]);

  //   if (!isAuthenticated || !user) {
  //     return null
  //   }

  //   if (!user) {
  //     return null
  //   }

  //   const content = dashboardContent[user.role as keyof typeof dashboardContent] || dashboardContent.tenant

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {/* {content.title} */}
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your
          {/* {user.role} */}
          account today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* {content.cards.map((card, index) => {
          const Icon = card.icon
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-foreground font-semibold mt-4">{card.label}</h3>
              <p className="text-2xl font-bold text-primary mt-2">{card.value}</p>
            </Card>
          )
        })} */}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Account Created</p>
              <p className="text-sm text-muted-foreground">
                Welcome to RentNest!
              </p>
            </div>
            <Badge variant="secondary">Today</Badge>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Profile Updated</p>
              <p className="text-sm text-muted-foreground">
                Your profile information was updated
              </p>
            </div>
            <Badge variant="secondary">Yesterday</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Welcome Email Sent</p>
              <p className="text-sm text-muted-foreground">
                Check your inbox for important information
              </p>
            </div>
            <Badge variant="secondary">2 days ago</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
