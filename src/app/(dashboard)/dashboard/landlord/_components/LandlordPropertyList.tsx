"use client";

import { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Property } from "@/lib/types";
import { deletePropertyAction } from "../_actions/landlordPropertyActions";

interface Props {
  properties: Property[];
}

export function LandlordPropertyList({ properties }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this property?")) return;

    startTransition(async () => {
      const result = await deletePropertyAction(id);
      if (result.success) {
        toast.success(result.message || "Property deleted");
      } else {
        toast.error(result.message || "Failed to delete property");
      }
    });
  };

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <Card
          key={property.id}
          className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Left side — image + info */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            {/* Thumbnail */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted sm:h-20 sm:w-20">
              {property.image ? (
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <ImageOff className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {property.title}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {property.location} • ${property.price.toLocaleString()}
              </p>
              {property.isAvailable ? (
                <Badge className="mt-1 bg-green-600 text-white hover:bg-green-600">
                  Available
                </Badge>
              ) : (
                <Badge variant="destructive" className="mt-1">
                  Currently Rented / Unavailable
                </Badge>
              )}
            </div>
          </div>

          {/* Right side — actions */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link href={`/dashboard/landlord/properties/${property.id}/edit`}>
              <Button variant="secondary" size="sm" disabled={isPending}>
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              disabled={isPending}
              onClick={() => handleDelete(property.id)}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}