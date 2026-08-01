"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { confirmPaymentAction } from "../_actions/confirmPaymentAction";
import { ConfirmPaymentResponseData } from "@/lib/types";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id"); // 👈 Stripe er success_url e ei nameই ase

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [payment, setPayment] = useState<ConfirmPaymentResponseData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMessage("Missing session information.");
      return;
    }

    const confirm = async () => {
      const result = await confirmPaymentAction(sessionId);

      if (result.success && result.data) {
        setPayment(result.data);
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Could not confirm payment.");
      }
    };

    confirm();
  }, [sessionId]);

  if (status === "loading") {
    return (
      <Card className="max-w-md mx-auto p-8 text-center space-y-4">
        <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
        <h1 className="text-xl font-bold text-foreground">Verifying your payment...</h1>
        <p className="text-muted-foreground">Please wait, this will only take a moment.</p>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card className="max-w-md mx-auto p-8 text-center space-y-4">
        <XCircle className="h-16 w-16 mx-auto text-destructive" />
        <h1 className="text-xl font-bold text-foreground">Payment Verification Failed</h1>
        <p className="text-muted-foreground">{errorMessage}</p>
        <Button onClick={() => router.push("/dashboard/tenant")} className="w-full">
          Go to Dashboard
        </Button>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto p-8 text-center space-y-4">
      <CheckCircle2 className="h-16 w-16 mx-auto text-green-600" />
      <h1 className="text-xl font-bold text-foreground">Payment Successful!</h1>
      <p className="text-muted-foreground">
        Your payment of ${payment?.amount.toLocaleString()} has been confirmed.
      </p>
      <p className="text-sm text-muted-foreground">
        Transaction ID: {payment?.transactionId}
      </p>
      <Button onClick={() => router.push("/dashboard/tenant")} className="w-full">
        Go to Dashboard
      </Button>
    </Card>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}