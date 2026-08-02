"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/AuthActions";
import { useAuth } from "@/lib/auth-context";
import {
  registerSchema,
  fullNameFieldSchema,
  emailFieldSchema,
  passwordFieldSchema,
} from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";
  const [role, setRole] = useState<"TENANT" | "LANDLORD">("TENANT");
  const [passwordValue, setPasswordValue] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [state, action, pending] = useActionState(registerAction.bind(null, redirectTo), false);
  const { refetchUser } = useAuth();

  // useEffect(() => {
  //   if (!state) return;

  //   if (state.success) {
  //     toast.success(state.message || "Account created successfully!");

  //     if (state.redirectTo) {
  //       refetchUser().then(() => {
  //         router.push(state.redirectTo!);
  //       });
  //     } else {
  //       router.push("/login");
  //     }
  //   } else {
  //     toast.error(state.message || "Registration failed");
  //   }
  // }, [state, refetchUser, router]);

  useEffect(() => {
  if (!state) return;

  if (state.success) {
    if (state.redirectTo) {
      refetchUser().then(() => {
        toast.success(state.message || "Account created successfully!");
        router.push(state.redirectTo!);
      });
    } else {
      toast.success(state.message || "Account created successfully!");
      router.push("/login");
    }
  } else {
    toast.error(state.message || "Registration failed");
  }
}, [state, refetchUser, router]);

  // 👇 Generic helper — je field e blur hobe, sheita validate kore fieldErrors update kore
  const validateField = (
    field: keyof FieldErrors,
    schema: typeof fullNameFieldSchema | typeof emailFieldSchema | typeof passwordFieldSchema,
    value: string
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

  const handleFullNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField("fullName", fullNameFieldSchema, e.target.value);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField("email", emailFieldSchema, e.target.value);
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    validateField("password", passwordFieldSchema, e.target.value);
  };

  const handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      return;
    }
    setFieldErrors((prev) => ({
      ...prev,
      confirmPassword: value !== passwordValue ? "Passwords do not match" : undefined,
    }));
  };

  const handleSubmit = (formData: FormData) => {
    const rawData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      role: formData.get("role"),
    };

    const result = registerSchema.safeParse(rawData);

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
    <form action={handleSubmit} className="space-y-4">
      {/* className="p-4 space-y-4 sm:p-6 sm:space-y-5" */}
      <div className="p-4 space-y-4 sm:p-6 sm:space-y-5" >
        {/* Full Name */}
        {/* className="flex flex-col gap-2" */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            onBlur={handleFullNameBlur}
            className={fieldErrors.fullName ? "border-destructive" : "border border-border"}
          />
          {fieldErrors.fullName && (
            <p className="text-sm text-destructive">{fieldErrors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email"
            onBlur={handleEmailBlur}
            className={fieldErrors.email ? "border-destructive" : "border border-border"}
          />
          {fieldErrors.email && (
            <p className="text-sm text-destructive">{fieldErrors.email}</p>
          )}
        </div>

        {/* Role Selection */}
        <div className="flex flex-col gap-3">
          <Label>I am a:</Label>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
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
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            onBlur={handlePasswordBlur}
            className={fieldErrors.password ? "border-destructive" : "border border-border"}
          />
          {fieldErrors.password ? (
            <p className="text-sm text-destructive">{fieldErrors.password}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              At least 6 characters, with a letter, number, and special character.
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            onBlur={handleConfirmBlur}
            className={fieldErrors.confirmPassword ? "border-destructive" : "border border-border"}
          />
          {fieldErrors.confirmPassword && (
            <p className="text-sm text-destructive">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;