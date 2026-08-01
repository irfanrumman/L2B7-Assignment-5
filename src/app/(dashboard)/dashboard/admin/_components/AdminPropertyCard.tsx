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
    <Card className="group flex flex-row overflow-hidden transition-all hover:shadow-md hover:border-primary/50 py-0 gap-0">
      {/* Left — Boro image, pura height jure */}
      <div className="relative w-56 shrink-0 overflow-hidden bg-muted hidden sm:block">
        {image ? (
          <Image src={image} alt={title} fill unoptimized className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-8 w-8" />
          </div>
        )}
      </div>
      {/* Mobile e chotto image */}
      <div className="relative w-24 shrink-0 overflow-hidden bg-muted sm:hidden">
        {image ? (
          <Image src={image} alt={title} fill unoptimized className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Middle — Title, category, location, description snippet, landlord */}
      <div className="flex-1 min-w-0 p-4 sm:p-5">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-lg font-bold text-primary">{title}</h4>
          <Badge variant="outline" className="capitalize text-xs">
            {category.name}
          </Badge>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>{location}</span>
        </div>

        {/* Songkhipto description — 1 line pordoyonto, baki view e click korle */}
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
      <div className="flex w-44 shrink-0 flex-col items-end justify-between border-l border-border p-4 sm:p-5">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Monthly Price</p>
          <p className="text-xl font-bold text-primary">${price.toLocaleString()}</p>
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