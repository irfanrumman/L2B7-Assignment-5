"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RentalRequestForm } from "./RentalRequestForm";

export function PropertyDetailCTA({
  propertyId,
  isAvailable,
}: {
  propertyId: string;
  isAvailable: boolean;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Card className="p-6"><p className="text-muted-foreground">Loading...</p></Card>;
  }

  if (!isAvailable) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">This property is currently unavailable.</p>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="p-6 text-center space-y-3">
        <p className="text-muted-foreground">Please log in to request this property.</p>
        <Link href={`/login?redirectTo=/properties/${propertyId}`}>
          <Button className="w-full">Log In</Button>
        </Link>
      </Card>
    );
  }

  if (user.role !== "TENANT") {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Only tenants can request to rent properties.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-4">Request to Rent</h3>
      <RentalRequestForm propertyId={propertyId} />
    </Card>
  );
}