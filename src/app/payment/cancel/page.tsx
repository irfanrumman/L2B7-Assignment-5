"use client";

import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md mx-auto p-6 text-center space-y-3 sm:p-8 sm:space-y-4">
        <XCircle className="h-12 w-12 mx-auto text-destructive sm:h-16 sm:w-16" />
        <h1 className="text-lg font-bold text-foreground sm:text-xl">Payment Cancelled</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          You cancelled the payment process. No charges were made.
        </p>
        <Button onClick={() => router.push("/dashboard/tenant")} className="w-full">
          Back to Dashboard
        </Button>
      </Card>
    </div>
  );
}