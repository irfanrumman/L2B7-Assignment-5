"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { PropertyListItem } from "@/lib/types";
import { deletePropertyAction } from "../_actions/landlordPropertyActions";

interface Props {
  properties: PropertyListItem[];
}

export function LandlordPropertyList({ properties }: Props) {
  const [isPending, startTransition] = useTransition();
  const [selectedProperty, setSelectedProperty] = useState<PropertyListItem | null>(null);

  const openConfirmDialog = (property: PropertyListItem) => {
    setSelectedProperty(property);
  };

  const closeDialog = () => {
    setSelectedProperty(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedProperty) return;

    startTransition(async () => {
      const result = await deletePropertyAction(selectedProperty.id);
      if (result.success) {
        toast.success(result.message || "Property deleted");
      } else {
        toast.error(result.message || "Failed to delete property");
      }
      closeDialog();
    });
  };

  return (
    <>
      <div className="space-y-4">
        {properties.map((property) => (
          <Card
            key={property.id}
            className="group flex flex-row overflow-hidden transition-all hover:shadow-md hover:border-primary/50 py-0 gap-0"
          >
            <div className="relative w-32 shrink-0 overflow-hidden bg-muted sm:w-40">
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
                  <ImageOff className="h-6 w-6" />
                </div>
              )}
            </div>

            <div className="flex flex-1 min-w-0 flex-col justify-between p-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {property.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  by {property.landlord.name}
                </p>
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

              <div className="flex justify-end gap-2 mt-3">
                <Link href={`/dashboard/landlord/properties/${property.id}`}>
                  <Button variant="secondary" size="sm" disabled={isPending}>
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isPending}
                  onClick={() => openConfirmDialog(property)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete "{selectedProperty?.title}"?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the property listing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete Property"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}