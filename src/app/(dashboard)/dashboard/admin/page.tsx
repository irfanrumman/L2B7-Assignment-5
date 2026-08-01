import Link from "next/link";
import Image from "next/image";
import { Users, Home, DollarSign, FileText, ArrowRight, ImageOff } from "lucide-react";
import { getAdminOverviewAction } from "./_actions/adminOverViewActios";
import { UserManagementTable } from "./_components/UserManegmentTable";
import { AdminRentalTable } from "./_components/AdminRentalTable";

export default async function AdminDashboard() {
  const result = await getAdminOverviewAction();

  if (!result.success || !result.data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-destructive">{result.message}</p>
      </div>
    );
  }

  const { users, properties, rentals, totalRevenue } = result.data;

  const statsCards = [
    {
      title: "Total Users",
      value: users.meta.total.toLocaleString(),
      icon: Users,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Total Properties",
      value: properties.meta.total.toLocaleString(),
      icon: Home,
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "Rental Requests",
      value: rentals.meta.total.toLocaleString(),
      icon: FileText,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-blue-500/10 text-blue-500",
    },
  ];

  const viewMoreClass =
    "group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md hover:gap-3";

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-foreground">{card.value}</p>
                </div>
                <div className={`${card.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Users preview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Recent Users</h2>
        <UserManagementTable users={users.items} />
        <div className="flex justify-center pt-2">
          <Link href="/dashboard/admin/users" className={viewMoreClass}>
            View More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Rental requests preview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Recent Rental Requests</h2>
        <AdminRentalTable requests={rentals.items} />
        <div className="flex justify-center pt-2">
          <Link href="/dashboard/admin/rental-requests" className={viewMoreClass}>
            View More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Properties preview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Recent Properties</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.items.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md hover:border-primary/50"
            >
              {/* Thumbnail */}
              <div className="relative h-40 w-full bg-muted">
                {property.image ? (
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <ImageOff className="h-8 w-8" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="font-semibold text-foreground truncate">{property.title}</p>
                <p className="text-sm text-muted-foreground">{property.location}</p>
                <p className="text-sm font-bold text-primary mt-1">
                  ${property.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <Link href="/dashboard/admin/properties" className={viewMoreClass}>
            View More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}