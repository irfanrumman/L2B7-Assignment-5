import { Card } from "@/components/ui/card";
import { FileText, Home, CheckCircle2, DollarSign } from "lucide-react";
import { TenantRentalRequest, PaymentListItem } from "@/lib/types";

interface Props {
  rentals: TenantRentalRequest[];
  payments: PaymentListItem[];
}

export function TenantStats({ rentals, payments }: Props) {
  const totalRequests = rentals.length;
  const activeRentals = rentals.filter((r) => r.status === "ACTIVE").length;
  const completedRentals = rentals.filter((r) => r.status === "COMPLETED").length;
  const totalPaid = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    { label: "Total Requests", value: totalRequests, icon: FileText, color: "bg-blue-500/10 text-blue-500" },
    { label: "Active Rentals", value: activeRentals, icon: Home, color: "bg-green-500/10 text-green-500" },
    { label: "Completed", value: completedRentals, icon: CheckCircle2, color: "bg-gray-500/10 text-gray-500" },
    { label: "Total Paid", value: `$${totalPaid.toLocaleString()}`, icon: DollarSign, color: "bg-primary/10 text-primary" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} rounded-lg p-2.5`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}