"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { RentalRequestListItem, RentalRequestStatus } from "@/lib/types";
import { updateRequestStatusAction } from "../_actions/landlordPropertyRequestActions";

interface Props {
  requests: RentalRequestListItem[];
}

const statusColors: Record<RentalRequestStatus, string> = {
  PENDING: "bg-yellow-500 text-white hover:bg-yellow-500",
  APPROVED: "bg-blue-600 text-white hover:bg-blue-600",
  REJECTED: "bg-red-600 text-white hover:bg-red-600",
  ACTIVE: "bg-green-600 text-white hover:bg-green-600",
  COMPLETED: "bg-gray-500 text-white hover:bg-gray-500",
};

type TabKey = "PENDING" | "APPROVED" | "ACTIVE" | "COMPLETED" | "REJECTED";

const tabs: { key: TabKey; label: string }[] = [
  { key: "PENDING", label: "Requests" },
  { key: "APPROVED", label: "Approved" },
  { key: "ACTIVE", label: "Active (Paid)" },
  { key: "COMPLETED", label: "Completed" },
  { key: "REJECTED", label: "Rejected" },
];

function RequestCard({
  request,
  isPending,
  onUpdate,
}: {
  request: RentalRequestListItem;
  isPending: boolean;
  onUpdate: (id: string, status: "APPROVED" | "REJECTED") => void;
}) {
  return (
    <Card className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-foreground">{request.property.title}</h3>
          <Badge className={statusColors[request.status]}>{request.status}</Badge>
        </div>

        <p className="text-sm text-muted-foreground mt-1">{request.property.location}</p>

        <p className="text-sm text-foreground mt-2">
          <span className="font-medium">{request.tenant.name}</span>{" "}
          <span className="text-muted-foreground">({request.tenant.email})</span>
        </p>

        <p className="text-sm text-muted-foreground mt-1">
          {new Date(request.moveInDate).toLocaleDateString()} → {new Date(request.moveOutDate).toLocaleDateString()}
        </p>

        {request.message && (
          <p className="text-sm text-muted-foreground mt-2 italic line-clamp-2">
            "{request.message}"
          </p>
        )}
      </div>

      {request.status === "PENDING" && (
        <div className="flex gap-2 shrink-0">
          <Button size="sm" disabled={isPending} onClick={() => onUpdate(request.id, "APPROVED")}>
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={isPending}
            onClick={() => onUpdate(request.id, "REJECTED")}
          >
            Reject
          </Button>
        </div>
      )}
    </Card>
  );
}

export function RequestList({ requests }: Props) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<TabKey>("PENDING");

  const handleUpdate = (id: string, status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      const result = await updateRequestStatusAction(id, status);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const filteredRequests = requests.filter((r) => r.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-2">
        {tabs.map((tab) => {
          const count = requests.filter((r) => r.status === tab.key).length;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              )}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Selected tab er card gulo */}
      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No requests in this category</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              isPending={isPending}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
}