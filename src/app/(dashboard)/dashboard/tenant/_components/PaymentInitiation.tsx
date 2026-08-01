"use client";

import { useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { RentalRequestDetail } from "@/lib/types";
import { createPaymentAction } from "../_actions/tenantPaymentActions";

export function PaymentInitiation({ request }: { request: RentalRequestDetail }) {
  const [isPending, startTransition] = useTransition();

  const handlePay = () => {
    startTransition(async () => {
      const result = await createPaymentAction(request.id);

      if (result.success && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        toast.error(result.message || "Failed to start payment");
      }
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">{request.property.title}</h2>
        <p className="text-muted-foreground">{request.property.location}</p>
        <Badge className="mt-2 bg-blue-600 text-white hover:bg-blue-600">
          {request.status}
        </Badge>
      </div>

      <div className="space-y-2 border-t border-border pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Landlord</span>
          <span className="text-foreground">{request.property.landlord.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Move-in</span>
          <span className="text-foreground">
            {new Date(request.moveInDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Move-out</span>
          <span className="text-foreground">
            {new Date(request.moveOutDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-sm text-muted-foreground">Amount to Pay</p>
          <p className="text-2xl font-bold text-primary">
            ${request.property.price.toLocaleString()}
          </p>
        </div>

        <Button size="lg" disabled={isPending} onClick={handlePay}>
          {isPending ? "Redirecting..." : "Pay Now"}
        </Button>
      </div>
    </Card>
  );
}