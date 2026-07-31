"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { loginAction } from "../_actions/AuthActions";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), false);
  const { refetchUser } = useAuth();

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Login Successful");

      refetchUser().then(() => {
        router.push(state.redirectTo || "/");
      });
    } else {
      toast.error(state.message || "Login failed");
    }
  }, [state, refetchUser, router]);

  return (
    <form action={action} className="space-y-6">
      <Card>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-foreground">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            className="rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold text-foreground">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:opacity-90 transition"
        >
          {pending ? "Submitting..." : "Login"}
        </Button>
      </Card>
    </form>
  );
};

export default LoginForm;