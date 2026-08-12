"use client";

import { PropertyCard } from "@/components/shared/PropertyCard";
import { PropertyListItem } from "@/lib/types";

interface Props {
  properties: PropertyListItem[];
}

export function PropertyGrid({ properties }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
        >
          <PropertyCard {...property} />
        </div>
      ))}
    </div>
  );
}