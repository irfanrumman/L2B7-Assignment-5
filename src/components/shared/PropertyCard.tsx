"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Heart, ImageOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PropertyListItem } from "@/lib/types";

export function PropertyCard({
  id,
  title,
  price,
  location,
  isAvailable,
  category,
  image,
  featured,
}: PropertyListItem) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg py-0 gap-0">
      {/* Upore — Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            unoptimized
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-8 w-8" />
          </div>
        )}

        {featured && (
          <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
            Featured
          </Badge>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-2 left-2 h-8 w-8 rounded-full bg-card shadow-md hover:bg-primary hover:text-primary-foreground"
          aria-label="Save property"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {isAvailable ? (
          <Badge className="absolute bottom-2 left-2 bg-green-600 text-white hover:bg-green-600 text-xs">
            Available
          </Badge>
        ) : (
          <Badge className="absolute bottom-2 left-2 bg-red-600 text-white hover:bg-red-600 text-xs">
            Not Available
          </Badge>
        )}
      </div>

      {/* Details */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground transition line-clamp-1">
            {title}
          </h3>
          <Badge variant="outline" className="shrink-0 capitalize text-xs">
            {category.name}
          </Badge>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="font-bold text-lg text-primary">
            ${price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Niche — Button, ekhon eta e shudhu CTA */}
      <div className="px-4 pb-4">
        {isAvailable ? (
          <Link href={`/properties/${id}`}>
            <Button className="w-full" size="sm">
              View
            </Button>
          </Link>
        ) : (
          <Button className="w-full" size="sm" disabled>
            Unavailable
          </Button>
        )}
      </div>
    </Card>
  );
}