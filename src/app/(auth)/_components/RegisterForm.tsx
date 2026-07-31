"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/AuthActions";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const router = useRouter();
   const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? "";
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"TENANT" | "LANDLORD">("TENANT");

  const [state, action, pending] = useActionState(registerAction.bind(null, redirectTo), false);
  const { refetchUser } = useAuth();

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Account created successfully!");

      if (state.redirectTo) {
        // Auto-login successful hoyeche, dashboard e pathao
        refetchUser().then(() => {
          router.push(state.redirectTo!);
        });
      } else {
        // Auto-login fail korechilo, manually login korte bolo
        router.push("/login");
      }
    } else {
      toast.error(state.message || "Registration failed");
    }
  }, [state, refetchUser, router]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-6 space-y-5">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            // id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            className="rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            required
          />
        </div>


        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            // id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            required
          />
        </div>

        {/* Role Selection */}
        <div className="flex flex-col gap-3">
          <Label>I am a:</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 flex-1 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="TENANT"
                checked={role === "TENANT"}
                onChange={() => setRole("TENANT")}
                className="h-4 w-4"
              />
              <span className="text-sm text-foreground">Tenant</span>
            </label>
            <label className="flex items-center gap-2 flex-1 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="LANDLORD"
                checked={role === "LANDLORD"}
                onChange={() => setRole("LANDLORD")}
                className="h-4 w-4"
              />
              <span className="text-sm text-foreground">Landlord</span>
            </label>
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
            //   id="password"
              name="password"
              type= "password"
              placeholder="Create a password"
              className="rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
              required
              minLength={6}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating Account..." : "Create Account"}
        </Button>
      </Card>
    </form>
  );
};

export default RegisterForm;