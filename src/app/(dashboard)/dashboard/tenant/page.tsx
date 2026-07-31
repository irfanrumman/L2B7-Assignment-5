"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
// import { Header } from '@/components/header'
// import { Footer } from '@/components/footer'
import { useAuth } from "@/lib/auth-context";
import { Home, DollarSign, Clock, Plus } from "lucide-react";

// Mock data
const overviewCards = [
  {
    title: "Active Requests",
    value: "2",
    description: "Pending landlord response",
    icon: Clock,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Total Spent",
    value: "$12,500",
    description: "Across all rentals",
    icon: DollarSign,
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "Current Rental",
    value: "1",
    description: "Active lease",
    icon: Home,
    color: "bg-blue-500/10 text-blue-500",
  },
];

const rentalRequests = [
  {
    id: 1,
    property: "Modern Downtown Apartment",
    requestDate: "2024-01-15",
    status: "pending",
    price: 2500,
  },
  {
    id: 2,
    property: "Cozy Suburban Home",
    requestDate: "2024-01-10",
    status: "approved",
    price: 1800,
  },
  {
    id: 3,
    property: "Urban Loft",
    requestDate: "2024-01-05",
    status: "rejected",
    price: 2800,
  },
];

const getStatusBadge = (status: string) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return styles[status as keyof typeof styles] || styles.pending;
};

export default function TenantDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  //   useEffect(() => {
  //     if (!isAuthenticated || user?.role !== 'tenant') {
  //       router.push('/auth/login')
  //     }
  //   }, [isAuthenticated, user, router])

  //   if (!isAuthenticated || user?.role !== 'tenant') {
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
              Tenant Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Welcome back! Manage your rental requests and properties
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {overviewCards.map((card, idx) => {
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
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Rental Requests */}
              <div className="rounded-lg border border-border bg-card p-6 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Rental Requests
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Property
                        </th>
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Request Date
                        </th>
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Price
                        </th>
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Status
                        </th>
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rentalRequests.map((request) => (
                        <tr
                          key={request.id}
                          className="border-b border-border hover:bg-muted/30 transition"
                        >
                          <td className="py-4 text-sm text-foreground">
                            {request.property}
                          </td>
                          <td className="py-4 text-sm text-foreground">
                            {request.requestDate}
                          </td>
                          <td className="py-4 text-sm font-semibold text-foreground">
                            ${request.price}
                          </td>
                          <td className="py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(request.status)}`}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <button className="text-sm font-medium text-primary hover:underline">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment History */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Recent Payments
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      date: "2024-01-01",
                      property: "Modern Downtown Apartment",
                      amount: 2500,
                      status: "completed",
                    },
                    {
                      date: "2023-12-01",
                      property: "Modern Downtown Apartment",
                      amount: 2500,
                      status: "completed",
                    },
                  ].map((payment, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-muted/30 p-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {payment.property}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {payment.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ${payment.amount}
                        </p>
                        <p className="text-xs text-green-600">
                          ✓ {payment.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/properties"
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:opacity-90 transition"
                  >
                    <Plus className="h-5 w-5" />
                    Browse Properties
                  </Link>
                  <button className="w-full rounded-lg border border-border px-4 py-3 font-semibold text-foreground hover:bg-muted transition">
                    View Saved
                  </button>
                </div>
              </div>

              {/* Account Settings */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Account
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <button className="text-primary hover:underline font-medium">
                      Profile Settings
                    </button>
                  </li>
                  <li>
                    <button className="text-primary hover:underline font-medium">
                      Payment Methods
                    </button>
                  </li>
                  <li>
                    <button className="text-primary hover:underline font-medium">
                      Notifications
                    </button>
                  </li>
                  <li>
                    <button className="text-primary hover:underline font-medium">
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Need Help?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is here to help you 24/7
                </p>
                <button className="w-full rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-muted transition">
                  Contact Support
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
