"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, ImageOff } from "lucide-react";
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
  const router = useRouter();

  const goToDetail = () => {
    router.push(`/dashboard/tenant/requests/${request.id}`);
  };

  const goToPayment = () => {
    router.push(`/dashboard/tenant/requests/${request.id}/pay`);
  };

  // 👇 এই function টাই "renderAction" — component এর ভিতরে, JSX return করার আগে define করা
  const renderAction = () => {
    switch (request.status) {
      case "PENDING":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/30 hover:bg-yellow-500/10 text-xs dark:text-yellow-400">
            Wait for Approval
          </Badge>
        );
      case "APPROVED":
        return (
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              goToPayment();
            }}
          >
            Pay Now
          </Button>
        );
      case "REJECTED":
        return (
          <Badge variant="outline" className="text-xs text-destructive border-destructive">
            Request Rejected
          </Badge>
        );
      case "ACTIVE":
        return (
          <Badge variant="outline" className="text-xs">
            Currently Renting
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge variant="outline" className="text-xs">
            Rental Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={goToDetail}
      className="group flex h-32 w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md hover:border-primary/50"
    >
      <div className="relative h-full w-28 shrink-0 overflow-hidden bg-muted sm:w-36">
        {request.property.image ? (
          <Image
            src={request.property.image}
            alt={request.property.title}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-semibold text-foreground">{request.property.title}</h3>
            <Badge className={statusColors[request.status]}>{request.status}</Badge>
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{request.property.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="font-bold text-primary">${request.property.price.toLocaleString()}</p>
          {renderAction()}
        </div>
      </div>
    </div>
  );
}