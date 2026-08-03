


import Link from "next/link";
import { Home, Users, DollarSign, ArrowRight } from "lucide-react";
import { getLandlordOverview } from "./_actions/landlordOverviewActions";
import { LandlordPropertyList } from "./_components/LandlordPropertyList";
import { RequestList } from "./_components/PropertyRequestList";

export default async function LandlordDashboard() {
  const result = await getLandlordOverview();

  if (!result.success || !result.data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-destructive">{result.message}</p>
      </div>
    );
  }

  const { properties, requests, totalEarnings, pendingCount } = result.data;

  const statsCards = [
    {
      title: "Total Properties",
      value: properties.total.toLocaleString(),
      icon: Home,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Incoming Requests",
      value: requests.meta.total.toLocaleString(),
      description: `${pendingCount} pending review`,
      icon: Users,
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "Earnings",
      value: `$${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-blue-500/10 text-blue-500",
    },
  ];

  const viewMoreClass =
    "group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md hover:gap-3";

  return (
    <div className="space-y-8 sm:space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Landlord Dashboard</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Manage properties and rental requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-foreground sm:text-3xl">{card.value}</p>
                  {card.description && (
                    <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                  )}
                </div>
                <div className={`${card.color} rounded-lg p-2.5 sm:p-3`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Properties preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">My Properties</h2>
        <LandlordPropertyList properties={properties.items} />
        <div className="flex justify-center pt-2">
          <Link href="/dashboard/landlord/properties" className={viewMoreClass}>
            View More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Incoming requests preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">Incoming Requests</h2>
        <RequestList requests={requests.items} />
        <div className="flex justify-center pt-2">
          <Link href="/dashboard/landlord/requests" className={viewMoreClass}>
            View More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}