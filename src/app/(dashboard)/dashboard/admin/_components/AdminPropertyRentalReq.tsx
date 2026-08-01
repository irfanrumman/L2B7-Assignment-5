import { Badge } from "@/components/ui/badge";
import { AdminRentalRequestItem, RentalRequestStatus } from "@/lib/types";

const statusColors: Record<RentalRequestStatus, string> = {
  PENDING: "bg-yellow-500 text-white hover:bg-yellow-500",
  APPROVED: "bg-blue-600 text-white hover:bg-blue-600",
  REJECTED: "bg-red-600 text-white hover:bg-red-600",
  ACTIVE: "bg-green-600 text-white hover:bg-green-600",
  COMPLETED: "bg-gray-500 text-white hover:bg-gray-500",
};

export function PropertyRentalRequests({ requests }: { requests: AdminRentalRequestItem[] }) {
  if (requests.length === 0) {
    return (
      <p className="text-sm text-muted-foreground border-t border-border pt-4">
        No rental requests for this property yet.
      </p>
    );
  }

  return (
    <div className="border-t border-border pt-4">
      <h3 className="font-semibold text-foreground mb-3">
        Rental Requests ({requests.length})
      </h3>
      <div className="space-y-2">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between gap-2 rounded-lg border border-border p-3 text-sm"
          >
            <div>
              <p className="font-medium text-foreground">{request.tenant.name}</p>
              <p className="text-xs text-muted-foreground">{request.tenant.email}</p>
            </div>
            <Badge className={statusColors[request.status]}>{request.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}