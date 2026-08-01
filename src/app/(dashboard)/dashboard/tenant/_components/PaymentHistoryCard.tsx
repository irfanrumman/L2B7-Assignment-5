"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaymentListItem, PaymentStatus } from "@/lib/types";

const statusColors: Record<PaymentStatus, string> = {
  PENDING: "bg-yellow-500 text-white hover:bg-yellow-500",
  PAID: "bg-green-600 text-white hover:bg-green-600",
  FAILED: "bg-red-600 text-white hover:bg-red-600",
};

export function PaymentHistoryCard({ payment }: { payment: PaymentListItem }) {
  return (
    <Card className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-foreground">
            {payment.rentalRequest.property.title}
          </h3>
          <Badge className={statusColors[payment.status]}>{payment.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {payment.rentalRequest.property.location} • {payment.provider} ({payment.method})
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Paid on {new Date(payment.paidAt).toLocaleDateString()}
        </p>
      </div>

      <p className="font-bold text-primary shrink-0">${payment.amount.toLocaleString()}</p>
    </Card>
  );
}