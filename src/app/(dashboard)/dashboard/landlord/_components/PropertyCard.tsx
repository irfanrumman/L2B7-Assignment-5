"use client";

import Link from "next/link";

import PropertyActions from "./PropertyActions";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  image?: string | null;
  isAvailable: boolean;
  category: Category;
}

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  return (
    <Card className="overflow-hidden rounded-xl border shadow-sm transition hover:shadow-md">
      {/* Image */}
      {/* aspect-[16/9] */}
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={
            property.image ||
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200"
          }
          alt={property.title}
          className="h-full w-full object-cover"
        />
      </div>

      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="line-clamp-1 text-xl">
            {property.title}
          </CardTitle>

          <Badge variant={property.isAvailable ? "default" : "secondary"}>
            {property.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>

        <Badge variant="outline">
          {property.category.name}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {property.description}
        </p>

        <div className="space-y-1">
          <p className="text-sm font-medium">
            📍 {property.location}
          </p>

          <p className="text-lg font-bold text-primary">
            ${property.price.toLocaleString()}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              /month
            </span>
          </p>
        </div>

        <PropertyActions property={property} />
      </CardContent>
    </Card>
  );
}