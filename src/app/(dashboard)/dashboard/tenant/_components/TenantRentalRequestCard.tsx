"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TenantRentalRequest, RentalRequestStatus } from "@/lib/types";

const statusColors: Record<RentalRequestStatus, string> = {
  PENDING: "bg-yellow-500 text-white hover:bg-yellow-500",
  APPROVED: "bg-blue-600 text-white hover:bg-blue-600",
  REJECTED: "bg-red-600 text-white hover:bg-red-600",
  ACTIVE: "bg-green-600 text-white hover:bg-green-600",
  COMPLETED: "bg-gray-500 text-white hover:bg-gray-500",
};

export function RentalRequestCard({ request }: { request: TenantRentalRequest }) {
  return (
    <Link href={`/dashboard/tenant/requests/${request.id}`}>
      <Card className="flex flex-col gap-3 p-4 transition-all hover:shadow-md hover:border-primary/50 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground">{request.property.title}</h3>
            <Badge className={statusColors[request.status]}>{request.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{request.property.location}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(request.moveInDate).toLocaleDateString()} → {new Date(request.moveOutDate).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <p className="font-bold text-primary">${request.property.price.toLocaleString()}</p>
          {request.status === "APPROVED" && (
            <Button size="sm" onClick={(e) => e.stopPropagation()}>
              Pay Now
            </Button>
          )}
        </div>
      </Card>
    </Link>
  );
}