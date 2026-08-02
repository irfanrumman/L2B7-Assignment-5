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
    <div className="space-y-8 sm:space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground sm:text-base">Platform overview and management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-foreground sm:text-3xl">{card.value}</p>
                </div>
                <div className={`${card.color} rounded-lg p-2.5 sm:p-3`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Users preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">Recent Users</h2>
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
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">Recent Rental Requests</h2>
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
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">Recent Properties</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {properties.items.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md hover:border-primary/50"
            >
              {/* Thumbnail */}
              <div className="relative h-32 w-full bg-muted sm:h-40">
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
                    <ImageOff className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-3 sm:p-4">
                <p className="text-sm font-semibold text-foreground truncate sm:text-base">
                  {property.title}
                </p>
                <p className="text-xs text-muted-foreground sm:text-sm">{property.location}</p>
                <p className="mt-1 text-sm font-bold text-primary sm:text-base">
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