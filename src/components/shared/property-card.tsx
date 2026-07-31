"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Heart, ImageOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PropertyListItem } from "@/lib/types";



export function PropertyCard({
  id,
  title,
  description,
  price,
  location,
  isAvailable,
  category,   
  image,     
  featured,   
}: PropertyListItem) {
  return (
    <Link href={`/properties/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-48 sm:h-56">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              unoptimized
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-muted to-muted-foreground/10 flex items-center justify-center text-muted-foreground">
              <ImageOff className="h-10 w-10" />
            </div>
          )}

          {featured && (
            <Badge variant="secondary" className="absolute top-3 right-3">
              Featured
            </Badge>
          )}

          {isAvailable ? (
            <Badge className="absolute bottom-3 left-3 bg-green-600 text-white hover:bg-green-600">
              Available
            </Badge>
          ) : (
            <Badge variant="destructive" className="absolute bottom-3 left-3">
              Not Available
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-3 left-3 rounded-full bg-card shadow-md hover:bg-primary hover:text-primary-foreground"
            aria-label="Save property"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <CardContent className="flex flex-col gap-4 pt-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition line-clamp-2">
                {title}
              </h3>
              <Badge variant="outline" className="shrink-0 capitalize">
                {category.name}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Price & CTA */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-xs text-muted-foreground">Monthly Price</p>
              <p className="font-bold text-lg text-primary">
                ${price.toLocaleString()}
              </p>
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              size="sm"
              disabled={!isAvailable}
            >
              {isAvailable ? "View" : "Unavailable"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}