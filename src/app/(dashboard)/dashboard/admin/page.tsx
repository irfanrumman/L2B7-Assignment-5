"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { useAuth } from "@/lib/auth-context";
import {
  Users,
  Home,
  DollarSign,
  TrendingUp,
  Search,
  MoreVertical,
} from "lucide-react";

// Mock data
const statsCards = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Total Properties",
    value: "543",
    change: "+8%",
    trend: "up",
    icon: Home,
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "Monthly Revenue",
    value: "$89,400",
    change: "+15%",
    trend: "up",
    icon: DollarSign,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Active Requests",
    value: "456",
    change: "+3%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-green-500/10 text-green-500",
  },
];

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "Landlord",
    status: "active",
    joinDate: "2024-01-10",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Tenant",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike@example.com",
    role: "Tenant",
    status: "inactive",
    joinDate: "2023-12-20",
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily@example.com",
    role: "Landlord",
    status: "active",
    joinDate: "2024-01-05",
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    email: "alex@example.com",
    role: "Tenant",
    status: "banned",
    joinDate: "2023-11-15",
  },
];

const activities = [
  {
    type: "user_signup",
    description: "New user registered",
    user: "Sarah Johnson",
    time: "2 hours ago",
  },
  {
    type: "property_added",
    description: "New property listed",
    user: "John Smith",
    time: "5 hours ago",
  },
  {
    type: "payment",
    description: "Payment processed",
    user: "System",
    time: "1 day ago",
  },
  {
    type: "support",
    description: "Support ticket created",
    user: "Mike Davis",
    time: "1 day ago",
  },
  {
    type: "user_banned",
    description: "User account banned",
    user: "Admin",
    time: "2 days ago",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // if (!isAuthenticated || user?.role !== 'admin') {
    //   router.push('/login')
    // }
  }, [isAuthenticated, user, router]);

  //   if (!isAuthenticated || user?.role !== 'admin') {
  //     return null
  //   }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* <Header /> */}

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Platform overview and management
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {statsCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {card.title}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {card.value}
                      </p>
                    </div>
                    <div className={`${card.color} rounded-lg p-3`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600">
                    {card.change} from last month
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* User Management */}
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    User Management
                  </h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Name
                        </th>
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Role
                        </th>
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Status
                        </th>
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Join Date
                        </th>
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-border hover:bg-muted/30 transition"
                        >
                          <td className="py-4">
                            <div>
                              <p className="font-medium text-foreground">
                                {user.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 text-foreground">{user.role}</td>
                          <td className="py-4">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                user.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : user.status === "inactive"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 text-muted-foreground">
                            {user.joinDate}
                          </td>
                          <td className="py-4">
                            <button className="text-muted-foreground hover:text-foreground">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing 1-5 of 2,847 users
                  </p>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition">
                      Previous
                    </button>
                    <button className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition">
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {activities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0"
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Platform Health */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Platform Health
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">
                        Server Status
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        ✓ Healthy
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-green-500 w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">
                        API Status
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        ✓ Operational
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-green-500 w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Database</span>
                      <span className="text-xs font-semibold text-green-600">
                        ✓ Connected
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-green-500 w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Tools */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Tools
                </h3>
                <div className="space-y-2">
                  <button className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition">
                    System Settings
                  </button>
                  <button className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition">
                    View Logs
                  </button>
                  <button className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition">
                    Backup Database
                  </button>
                  <button className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition">
                    Send Announcement
                  </button>
                </div>
              </div>

              {/* Support */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Support
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need technical assistance?
                </p>
                <button className="w-full rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-muted transition">
                  Contact Dev Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
