"use client";

import { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ImageOff, Star, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PropertyListItem } from "@/lib/types";
import { toggleFeaturedAction } from "../_actions/adminPropertyActions";

export function AdminPropertyCard({
  id,
  title,
  description,
  price,
  location,
  isAvailable,
  category,
  image,
  featured,
  landlord,
}: PropertyListItem) {
  const [isPending, startTransition] = useTransition();

  const handleToggleFeatured = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      const result = await toggleFeaturedAction(id, featured);
      if (result.success) {
        toast.success(result.message || "Property updated");
      } else {
        toast.error(result.message || "Failed to update property");
      }
    });
  };

  return (
    <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-md hover:border-primary/50 py-0 gap-0 sm:flex-row">
      {/* Image — mobile e full-width upore, sm+ e left side e fixed width */}
      <div className="relative h-40 w-full shrink-0 overflow-hidden bg-muted sm:h-auto sm:w-56">
        {image ? (
          <Image src={image} alt={title} fill unoptimized className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-8 w-8" />
          </div>
        )}
      </div>

      {/* Middle — Title, category, location, description snippet, landlord */}
      <div className="flex-1 min-w-0 p-4 sm:p-5">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-base font-bold text-primary sm:text-lg">{title}</h4>
          <Badge variant="outline" className="capitalize text-xs">
            {category.name}
          </Badge>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>{location}</span>
        </div>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
          {description}
        </p>

        <p className="text-sm text-muted-foreground mt-2">
          Listed by <span className="font-medium text-foreground">{landlord.name}</span> ({landlord.email})
        </p>

        <div className="mt-2">
          {isAvailable ? (
            <Badge className="bg-green-600 text-white hover:bg-green-600 text-xs">Available</Badge>
          ) : (
            <Badge variant="destructive" className="text-xs">Not Available</Badge>
          )}
        </div>
      </div>

      {/* Right — Price + actions */}
      <div className="flex w-full shrink-0 flex-col items-end justify-between gap-3 border-t border-border p-4 sm:w-44 sm:border-t-0 sm:border-l sm:p-5">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="text-lg font-bold text-primary sm:text-xl">${price.toLocaleString()}</p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Button
            size="sm"
            variant={featured ? "default" : "outline"}
            disabled={isPending}
            onClick={handleToggleFeatured}
            className="gap-1.5 w-full"
          >
            <Star className={`h-3.5 w-3.5 ${featured ? "fill-current" : ""}`} />
            {featured ? "Featured" : "Mark Featured"}
          </Button>

          <Link href={`/dashboard/admin/properties/${id}`} className="w-full">
            <Button size="sm" variant="outline" className="gap-1.5 w-full">
              <Eye className="h-3.5 w-3.5" />
              View
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}