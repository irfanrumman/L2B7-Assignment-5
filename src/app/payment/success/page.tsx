"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { confirmPaymentAction } from "../_actions/confirmPaymentAction";
import { ConfirmPaymentResponseData } from "@/lib/types";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [payment, setPayment] = useState<ConfirmPaymentResponseData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const hasConfirmed = useRef(false);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMessage("Missing session information.");
      return;
    }

    if (hasConfirmed.current) return;
    hasConfirmed.current = true;

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
      <Card className="max-w-md mx-auto p-6 text-center space-y-3 sm:p-8 sm:space-y-4">
        <Loader2 className="h-10 w-10 mx-auto animate-spin text-primary sm:h-12 sm:w-12" />
        <h1 className="text-lg font-bold text-foreground sm:text-xl">Verifying your payment...</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Please wait, this will only take a moment.
        </p>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card className="max-w-md mx-auto p-6 text-center space-y-3 sm:p-8 sm:space-y-4">
        <XCircle className="h-12 w-12 mx-auto text-destructive sm:h-16 sm:w-16" />
        <h1 className="text-lg font-bold text-foreground sm:text-xl">Payment Verification Failed</h1>
        <p className="text-sm text-muted-foreground sm:text-base">{errorMessage}</p>
        <Button onClick={() => router.push("/dashboard/tenant")} className="w-full">
          Go to Dashboard
        </Button>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto p-6 text-center space-y-3 sm:p-8 sm:space-y-4">
      <CheckCircle2 className="h-12 w-12 mx-auto text-green-600 sm:h-16 sm:w-16" />
      <h1 className="text-lg font-bold text-foreground sm:text-xl">Payment Successful!</h1>
      <p className="text-sm text-muted-foreground sm:text-base">
        Your payment of ${payment?.amount.toLocaleString()} has been confirmed.
      </p>
      <p className="text-xs text-muted-foreground sm:text-sm">
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