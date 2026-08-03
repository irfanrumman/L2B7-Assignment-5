"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { loginAction } from "../_actions/AuthActions";
import {
  loginSchema,
  loginEmailFieldSchema,
  loginPasswordFieldSchema,
} from "@/lib/validations";

type FieldErrors = {
  email?: string;
  password?: string;
};

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    false,
  );
  const { refetchUser } = useAuth();

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});


  useEffect(() => {
  if (!state) return;

  if (state.success) {
    refetchUser().then(() => {
      toast.success(state.message || "Login Successful");
      router.push(state.redirectTo || "/");
    });
  } else {
    toast.error(state.message || "Login failed");
  }
}, [state, refetchUser, router]);

  // 👇 Generic helper — RegisterForm er moto, reuse korar jonno
  const validateField = (
    field: keyof FieldErrors,
    schema: typeof loginEmailFieldSchema | typeof loginPasswordFieldSchema,
    value: string,
  ) => {
    if (!value) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      return;
    }

    const result = schema.safeParse(value);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField("email", loginEmailFieldSchema, e.target.value);
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField("password", loginPasswordFieldSchema, e.target.value);
  };

  const handleSubmit = (formData: FormData) => {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = loginSchema.safeParse(rawData);

    if (!result.success) {
      const errors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FieldErrors;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    action(formData);
  };

  return (
    <form action={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="p-4 space-y-4 sm:p-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email"
            onBlur={handleEmailBlur}
            className={
              fieldErrors.email ? "border-destructive" : "border border-border"
            }
          />
          {fieldErrors.email && (
            <p className="text-sm text-destructive">{fieldErrors.email}</p>
          )}
        </div>
        {/* 
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onBlur={handlePasswordBlur}
            className={fieldErrors.password ? "border-destructive" : "border border-border"}
          />
          {fieldErrors.password && (
            <p className="text-sm text-destructive">{fieldErrors.password}</p>
          )}
        </div> */}

        {/* Password
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onBlur={handlePasswordBlur}
            className={
              fieldErrors.password
                ? "border-destructive"
                : "border border-border"
            }
          />
          {fieldErrors.password ? (
            <p className="text-sm text-destructive">{fieldErrors.password}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Enter the password associated with your account.
            </p>
          )}
        </div> */}

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            onBlur={handlePasswordBlur}
            className={fieldErrors.password ? "border-destructive" : "border border-border"}
          />
          {fieldErrors.password && (
            <p className="text-sm text-destructive">{fieldErrors.password}</p>
          )}
        </div>


        {/* <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Submitting..." : "Login"}
        </Button> */}
        {/* Submit Button */}
        
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
