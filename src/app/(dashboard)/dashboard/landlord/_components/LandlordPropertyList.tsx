// "use client";

// import { useState, useTransition } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { MapPin, ImageOff } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { toast } from "sonner";
// import { PropertyListItem } from "@/lib/types";
// import { deletePropertyAction } from "../_actions/landlordPropertyActions";

// interface Props {
//   properties: PropertyListItem[];
// }

// export function LandlordPropertyList({ properties }: Props) {
//   const [isPending, startTransition] = useTransition();
//   const [selectedProperty, setSelectedProperty] = useState<PropertyListItem | null>(null);

//   const openConfirmDialog = (property: PropertyListItem) => {
//     setSelectedProperty(property);
//   };

//   const closeDialog = () => {
//     setSelectedProperty(null);
//   };

//   const handleConfirmDelete = () => {
//     if (!selectedProperty) return;

//     startTransition(async () => {
//       const result = await deletePropertyAction(selectedProperty.id);
//       if (result.success) {
//         toast.success(result.message || "Property deleted");
//       } else {
//         toast.error(result.message || "Failed to delete property");
//       }
//       closeDialog();
//     });
//   };

//   return (
//     <>
//       <div className="space-y-4">
//         {properties.map((property) => (
//           <Card
//             key={property.id}
//             className="group flex flex-col overflow-hidden transition-all hover:shadow-md hover:border-primary/50 py-0 gap-0 sm:flex-row"
//           >
//             <div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted sm:h-auto sm:w-64">
//               {property.image ? (
//                 <Image
//                   src={property.image}
//                   alt={property.title}
//                   fill
//                   unoptimized
//                   className="object-cover transition-transform group-hover:scale-105"
//                 />
//               ) : (
//                 <div className="flex h-full w-full items-center justify-center text-muted-foreground">
//                   <ImageOff className="h-10 w-10" />
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-1 min-w-0 flex-col justify-between p-5 sm:p-6">
//               <div className="min-w-0">
//                 <h3 className="text-lg font-bold text-foreground truncate sm:text-xl">
//                   {property.title}
//                 </h3>
//                 {/* Landlord name — filter thik moto kaj korche kina verify korar jonno */}
//                 <p className="text-xs text-muted-foreground mt-0.5">
//                   Listed by <span className="font-medium text-foreground">{property.landlord.name}</span>
//                 </p>
//                 <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
//                   <MapPin className="h-3.5 w-3.5 shrink-0" />
//                   <span className="truncate">{property.location}</span>
//                 </div>
//                 <p className="text-lg font-bold text-primary mt-2 sm:text-xl">
//                   ${property.price.toLocaleString()}
//                   <span className="text-sm font-normal text-muted-foreground">/month</span>
//                 </p>
//                 {property.isAvailable ? (
//                   <Badge className="mt-2 bg-green-600 text-white hover:bg-green-600">
//                     Available
//                   </Badge>
//                 ) : (
//                   <Badge variant="destructive" className="mt-2">
//                     Currently Rented / Unavailable
//                   </Badge>
//                 )}
//               </div>

//               <div className="flex justify-end gap-2 mt-4">
//                 <Link href={`/dashboard/landlord/properties/${property.id}`}>
//                   <Button variant="secondary" size="sm" disabled={isPending}>
//                     Edit
//                   </Button>
//                 </Link>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   disabled={isPending}
//                   onClick={() => openConfirmDialog(property)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && closeDialog()}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete &quot;{selectedProperty?.title}&quot;?</DialogTitle>
//             <DialogDescription>
//               This action cannot be undone. This will permanently delete the property listing.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={closeDialog} disabled={isPending}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleConfirmDelete} disabled={isPending}>
//               {isPending ? "Deleting..." : "Delete Property"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }


"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ImageOff } from "lucide-react";
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
            className="group flex flex-col overflow-hidden transition-all hover:shadow-md hover:border-primary/50 py-0 gap-0 sm:flex-row sm:justify-between"
          >
            {/* Column 1 — Image */}
            <div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted sm:h-auto sm:w-56">
              {property.image ? (
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <ImageOff className="h-10 w-10" />
                </div>
              )}
            </div>

            {/* Column 2 — Details */}
            <div className="flex-1 min-w-0 p-5 sm:p-6">
              <h3 className="text-lg font-bold text-foreground truncate sm:text-xl">
                {property.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Listed by <span className="font-medium text-foreground">{property.landlord.name}</span>
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{property.location}</span>
              </div>
              <p className="text-lg font-bold text-primary mt-2 sm:text-xl">
                ${property.price.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
              {property.isAvailable ? (
                <Badge className="mt-2 bg-green-600 text-white hover:bg-green-600">
                  Available
                </Badge>
              ) : (
                <Badge variant="destructive" className="mt-2">
                  Currently Rented / Unavailable
                </Badge>
              )}
            </div>

            {/* Column 3 — Actions */}
            <div className="flex flex-row gap-2 border-t border-border p-4 sm:w-40 sm:shrink-0 sm:flex-col sm:justify-center sm:border-t-0 sm:border-l sm:p-6">
              <Link href={`/dashboard/landlord/properties/${property.id}`} className="flex-1 sm:flex-none">
                <Button variant="secondary" size="sm" disabled={isPending} className="w-full">
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                disabled={isPending}
                onClick={() => openConfirmDialog(property)}
                className="flex-1 sm:flex-none w-full"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete &quot;{selectedProperty?.title}&quot;?</DialogTitle>
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