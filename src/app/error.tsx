"use client"; 

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="rounded-full bg-destructive/10 p-4 sm:p-6">
        <AlertTriangle className="h-12 w-12 text-destructive sm:h-16 sm:w-16" />
      </div>

      <h1 className="mt-4 text-2xl font-bold text-foreground sm:mt-6 sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground sm:max-w-md sm:text-base">
        We ran into an unexpected problem. This has been logged, and we&apos;re looking into it.
        Please try again, or head back to the homepage.
      </p>

      <div className="mt-6 flex w-full max-w-xs flex-col gap-3 sm:mt-8 sm:w-auto sm:max-w-none sm:flex-row">
        <Button size="lg" className="w-full gap-2 sm:w-auto" onClick={reset}>
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Link href="/" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}