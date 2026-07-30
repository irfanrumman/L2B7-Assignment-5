"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
// import { Header } from '@/components/header'
// import { Footer } from '@/components/footer'
import { useAuth } from "@/lib/auth-context";
import {
  Home,
  Users,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";

// Mock data
const overviewCards = [
  {
    title: "Total Properties",
    value: "5",
    description: "Active listings",
    icon: Home,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Incoming Requests",
    value: "8",
    description: "Awaiting review",
    icon: Users,
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "Monthly Earnings",
    value: "$14,200",
    description: "From active rentals",
    icon: DollarSign,
    color: "bg-blue-500/10 text-blue-500",
  },
];

const properties = [
  {
    id: 1,
    name: "Modern Downtown Apartment",
    price: 2500,
    status: "occupied",
    requests: 3,
  },
  {
    id: 2,
    name: "Cozy Suburban Home",
    price: 1800,
    status: "available",
    requests: 5,
  },
  {
    id: 3,
    name: "Luxury Penthouse",
    price: 4500,
    status: "occupied",
    requests: 2,
  },
];

const incomingRequests = [
  {
    id: 1,
    tenant: "Sarah Johnson",
    property: "Modern Downtown Apartment",
    requestDate: "2024-01-15",
    status: "pending",
  },
  {
    id: 2,
    tenant: "Mike Davis",
    property: "Cozy Suburban Home",
    requestDate: "2024-01-14",
    status: "pending",
  },
  {
    id: 3,
    tenant: "Emily Chen",
    property: "Luxury Penthouse",
    requestDate: "2024-01-13",
    status: "pending",
  },
];

export default function LandlordDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  //   useEffect(() => {
  //     if (!isAuthenticated || user?.role !== 'landlord') {
  //       router.push('/auth/login')
  //     }
  //   }, [isAuthenticated, user, router])

  //   if (!isAuthenticated || user?.role !== 'landlord') {
  //     return null
  //   }
  // }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* <Header /> */}

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Landlord Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your properties and rental requests
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
            <div className="lg:col-span-2 space-y-8">
              {/* Properties Section */}
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Your Properties
                  </h2>
                  <Link
                    href="#"
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90 transition"
                  >
                    <Plus className="h-5 w-5" />
                    Add Property
                  </Link>
                </div>

                <div className="space-y-4">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/30 transition"
                    >
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>${property.price}/month</span>
                          <span>
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                property.status === "occupied"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {property.status}
                            </span>
                          </span>
                          <span>{property.requests} requests</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="rounded-lg p-2 text-muted-foreground hover:text-primary hover:bg-muted transition">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="rounded-lg p-2 text-muted-foreground hover:text-destructive hover:bg-muted transition">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Incoming Requests */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Incoming Requests
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Tenant
                        </th>
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Property
                        </th>
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Date
                        </th>
                        <th className="text-left text-sm font-semibold text-foreground pb-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomingRequests.map((request) => (
                        <tr
                          key={request.id}
                          className="border-b border-border hover:bg-muted/30 transition"
                        >
                          <td className="py-4 font-medium text-foreground">
                            {request.tenant}
                          </td>
                          <td className="py-4 text-foreground">
                            {request.property}
                          </td>
                          <td className="py-4 text-muted-foreground">
                            {request.requestDate}
                          </td>
                          <td className="py-4 flex gap-2">
                            <button className="rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200 transition">
                              <Check className="h-4 w-4" />
                            </button>
                            <button className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200 transition">
                              <X className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">
                      Occupancy Rate
                    </p>
                    <p className="text-2xl font-bold text-foreground">80%</p>
                  </div>
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">
                      Average Rating
                    </p>
                    <p className="text-2xl font-bold text-foreground">4.8★</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Response Time
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      2.5 hrs
                    </p>
                  </div>
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
                      Payout Methods
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
                  Contact our landlord support team
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
