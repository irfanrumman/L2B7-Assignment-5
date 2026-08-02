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
    router.push(`/dashboard/tenant/requests/${request.id}`); // 👈 "rental-requests" theke "requests" e thik kora holo
  };

  const goToPayment = () => {
    router.push(`/dashboard/tenant/requests/${request.id}/pay`); // 👈 ekhaneo thik kora holo
  };

  return (
    <div
      onClick={goToDetail}
      className="group flex h-32 w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md hover:border-primary/50"
    >
      {/* Left — Image */}
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

      {/* Right — info + action */}
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

          {request.status === "APPROVED" ? (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                goToPayment();
              }}
            >
              Pay Now
            </Button>
          ) : (
            <Badge variant="outline" className="text-xs">
              Wait for Approval
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}