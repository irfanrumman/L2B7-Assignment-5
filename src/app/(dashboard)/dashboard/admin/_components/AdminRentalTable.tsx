"use client";

import { Badge } from "@/components/ui/badge";
import { AdminRentalRequestItem, RentalRequestStatus, PaymentStatus } from "@/lib/types";

interface Props {
  requests: AdminRentalRequestItem[];
}

const statusColors: Record<RentalRequestStatus, string> = {
  PENDING: "bg-yellow-500 text-white hover:bg-yellow-500",
  APPROVED: "bg-blue-600 text-white hover:bg-blue-600",
  REJECTED: "bg-red-600 text-white hover:bg-red-600",
  ACTIVE: "bg-green-600 text-white hover:bg-green-600",
  COMPLETED: "bg-gray-500 text-white hover:bg-gray-500",
};

const paymentStatusColors: Record<PaymentStatus, string> = {
  PENDING: "bg-yellow-500 text-white hover:bg-yellow-500",
  PAID: "bg-green-600 text-white hover:bg-green-600",
  FAILED: "bg-red-600 text-white hover:bg-red-600",
};

export function AdminRentalTable({ requests }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="text-left font-semibold text-foreground p-3">Property</th>
            <th className="text-left font-semibold text-foreground p-3">Tenant</th>
            <th className="text-left font-semibold text-foreground p-3">Landlord</th>
            <th className="text-left font-semibold text-foreground p-3">Status</th>
            <th className="text-left font-semibold text-foreground p-3">Payment</th>
            <th className="text-left font-semibold text-foreground p-3">Requested</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => {
            const latestPayment = request.payment[request.payment.length - 1];

            return (
              <tr key={request.id} className="border-b border-border last:border-b-0 hover:bg-muted/20">
                <td className="p-3">
                  <p className="font-medium text-foreground">{request.property.title}</p>
                  <p className="text-xs text-muted-foreground">{request.property.location}</p>
                </td>
                <td className="p-3">
                  <p className="text-foreground">{request.tenant.name}</p>
                  <p className="text-xs text-muted-foreground">{request.tenant.email}</p>
                </td>
                <td className="p-3">
                  <p className="text-foreground">{request.property.landlord.name}</p>
                  <p className="text-xs text-muted-foreground">{request.property.landlord.email}</p>
                </td>
                <td className="p-3">
                  <Badge className={statusColors[request.status]}>{request.status}</Badge>
                </td>
                <td className="p-3">
                  {latestPayment ? (
                    <div>
                      <Badge className={paymentStatusColors[latestPayment.status]}>
                        {latestPayment.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        ${latestPayment.amount.toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">No payment</span>
                  )}
                </td>
                <td className="p-3 text-muted-foreground">
                  {new Date(request.createdAt).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}