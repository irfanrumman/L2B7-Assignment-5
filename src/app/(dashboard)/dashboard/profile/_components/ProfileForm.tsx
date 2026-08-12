"use client";

import { useActionState, useEffect, useState } from "react";
import { Pencil, X, Loader2, Mail, Phone, ShieldCheck, CalendarDays } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import {
  profileSchema,
  profileNameFieldSchema,
  profilePhoneFieldSchema,
} from "@/lib/validations";
import { User } from "@/lib/types";
import { updateProfileAction } from "../_actions/profileActions";

type FieldErrors = {
  name?: string;
  phone?: string;
};

export function ProfileForm({ user }: { user: User }) {
  const { refetchUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [state, formAction, pending] = useActionState(updateProfileAction, false);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Profile updated successfully");
      setIsEditing(false);
      refetchUser();
    } else {
      toast.error(state.message || "Failed to update profile");
    }
  }, [state, refetchUser]);

  const validateField = (
    field: keyof FieldErrors,
    schema: typeof profileNameFieldSchema | typeof profilePhoneFieldSchema,
    value: string
  ) => {
    const result = schema.safeParse(value);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  };

  const handleCancel = () => {
    setName(user.name);
    setPhone(user.phone ?? "");
    setFieldErrors({});
    setIsEditing(false);
  };

  const handleSubmit = (formData: FormData) => {
    const rawData = {
      name: formData.get("name")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
    };

    const result = profileSchema.safeParse(rawData);

    if (!result.success) {
      const errors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FieldErrors;
        if (!errors[field]) errors[field] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    formAction(formData);
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="mx-auto w-full max-w-2xl p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-foreground">{user.name}</p>
          <Badge variant="secondary" className="mt-1 capitalize">
            {user.role.toLowerCase()}
          </Badge>
        </div>

        {!isEditing && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        )}
      </div>

      <form action={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          {isEditing ? (
            <>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => validateField("name", profileNameFieldSchema, e.target.value)}
                className={fieldErrors.name ? "border-destructive" : ""}
              />
              {fieldErrors.name && (
                <p className="text-sm text-destructive">{fieldErrors.name}</p>
              )}
            </>
          ) : (
            <p className="flex items-center gap-2 text-sm text-foreground">{user.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          {isEditing ? (
            <>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={(e) => validateField("phone", profilePhoneFieldSchema, e.target.value)}
                className={fieldErrors.phone ? "border-destructive" : ""}
              />
              {fieldErrors.phone && (
                <p className="text-sm text-destructive">{fieldErrors.phone}</p>
              )}
            </>
          ) : (
            <p className="flex items-center gap-2 text-sm text-foreground">
              <Phone className="h-4 w-4 text-muted-foreground" />
              {user.phone || (
                <span className="text-muted-foreground">Not provided</span>
              )}
            </p>
          )}
        </div>

        <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
          <div className="space-y-1">
            <Label className="text-muted-foreground">Email</Label>
            <p className="flex items-center gap-2 text-sm text-foreground">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {user.email}
            </p>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Status</Label>
            <p className="flex items-center gap-2 text-sm text-foreground">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <span className="capitalize">{user.status.toLowerCase()}</span>
            </p>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <Label className="text-muted-foreground">Member Since</Label>
            <p className="flex items-center gap-2 text-sm text-foreground">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              {new Date(user.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button type="submit" disabled={pending} className="gap-2 sm:w-auto">
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              {pending ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={handleCancel}
              className="gap-1.5 sm:w-auto"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
}
