import Link from "next/link";
import LoginForm from "../_components/LoginForm";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8 sm:py-12">
      <Card className="w-full max-w-md rounded-lg border border-border bg-card p-5 shadow-sm sm:p-8">
        {/* Header */}
        {/* className="mb-6 flex flex-col gap-2 sm:mb-8" */}
        <div >
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Welcome Back</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Log in to your RentNest account
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
          <LoginForm />
        </Suspense>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}