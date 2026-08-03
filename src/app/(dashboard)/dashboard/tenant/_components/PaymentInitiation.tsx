"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { RentalRequestDetail } from "@/lib/types";
import { createPaymentAction } from "../_actions/tenantPaymentActions";

export function PaymentInitiation({ request }: { request: RentalRequestDetail }) {
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmPay = () => {
    startTransition(async () => {
      const result = await createPaymentAction(request.id);

      if (result.success && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        toast.error(result.message || "Failed to start payment");
        setConfirmOpen(false);
      }
    });
  };

  return (
    <>
      <Card className="overflow-hidden py-0 gap-0">
        {/* Property Image */}
        <div className="relative h-40 w-full bg-muted sm:h-52">
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
              <ImageOff className="h-10 w-10" />
            </div>
          )}
        </div>

        <div className="p-4 space-y-4 sm:p-6 sm:space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground sm:text-xl">{request.property.title}</h2>
            <p className="text-sm text-muted-foreground sm:text-base">{request.property.location}</p>
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

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Amount to Pay</p>
              <p className="text-xl font-bold text-primary sm:text-2xl">
                ${request.property.price.toLocaleString()}
              </p>
            </div>

            <Button size="lg" className="w-full sm:w-auto" onClick={() => setConfirmOpen(true)}>
              Pay Now
            </Button>
          </div>
        </div>
      </Card>

      {/* Confirmation Dialog — property image soho */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Please review the details below before proceeding to payment.
            </DialogDescription>
          </DialogHeader>

          {/* Property thumbnail + info, dialog er bhitore */}
          <div className="flex items-center gap-3 rounded-lg border border-border p-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
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
                  <ImageOff className="h-5 w-5" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">{request.property.title}</p>
              <p className="text-sm text-muted-foreground truncate">{request.property.location}</p>
              <p className="text-sm font-bold text-primary">
                ${request.property.price.toLocaleString()}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button onClick={handleConfirmPay} disabled={isPending}>
              {isPending ? "Redirecting..." : "Confirm & Pay"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}