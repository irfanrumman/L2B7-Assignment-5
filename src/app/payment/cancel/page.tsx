"use client";

import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md mx-auto p-8 text-center space-y-4">
        <XCircle className="h-16 w-16 mx-auto text-destructive" />
        <h1 className="text-xl font-bold text-foreground">Payment Cancelled</h1>
        <p className="text-muted-foreground">
          You cancelled the payment process. No charges were made.
        </p>
        <Button onClick={() => router.push("/dashboard/tenant")} className="w-full">
          Back to Dashboard
        </Button>
      </Card>
    </div>
  );
}