"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  TenantRentalRequest,
  PaymentListItem,
  RentalRequestStatus,
} from "@/lib/types";
import { RentalRequestCard } from "./TenantRentalRequestCard";
import { PaymentHistoryCard } from "./PaymentHistoryCard";

interface Props {
  rentals: TenantRentalRequest[];
  payments: PaymentListItem[];
}

type TabKey = RentalRequestStatus | "PAYMENTS";

const tabs: { key: TabKey; label: string }[] = [
  { key: "PENDING", label: "Pending" },
  { key: "APPROVED", label: "Approved" },
  { key: "ACTIVE", label: "Active" },
  { key: "COMPLETED", label: "Completed" },
  { key: "REJECTED", label: "Rejected" },
  { key: "PAYMENTS", label: "Payments" },
];

export function TenantDashboardTabs({ rentals, payments }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("PENDING");

  const filteredRentals =
    activeTab === "PAYMENTS"
      ? []
      : rentals.filter((r) => r.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-2">
        {tabs.map((tab) => {
          const count =
            tab.key === "PAYMENTS"
              ? payments.length
              : rentals.filter((r) => r.status === tab.key).length;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70",
              )}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Selected tab er content */}
      <div className="space-y-3">
        {activeTab === "PAYMENTS" ? (
          payments.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">No payments yet</p>
            </div>
          ) : (
            payments.map((payment) => (
              <PaymentHistoryCard key={payment.id} payment={payment} />
            ))
          )
        ) : filteredRentals.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">
              No requests in this category
            </p>
          </div>
        ) : (
          filteredRentals.map((request) => (
            <RentalRequestCard key={request.id} request={request} />
          ))
        )}
      </div>
    </div>
  );
}
