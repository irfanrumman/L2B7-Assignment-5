import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <Card className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:py-12">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-5 shadow-sm sm:p-8">
        {/* Header */}
        {/* className="mb-6 flex flex-col gap-2 sm:mb-8" */}
        <div className="mb-6 flex flex-col gap-2 sm:mb-8">
          {/* className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--ink)]" */}
          {/* className="text-2xl font-bold text-foreground sm:text-3xl" */}
          <h1 className="font-(family-name:--font-display) text-3xl font-semibold text-(--ink)">Create Account</h1>

          {/* className="text-sm text-muted-foreground sm:text-base" */}
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Join RentNest as a tenant or landlord.
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
          <RegisterForm />
        </Suspense>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </Card>
  );
}