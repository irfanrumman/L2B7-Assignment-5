"use client";

import { PropertyCard } from "@/components/shared/PropertyCard";
import { PropertyListItem } from "@/lib/types";

interface Props {
  properties: PropertyListItem[];
}

export function PropertyGrid({ properties }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
}