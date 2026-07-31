"use client";

import { AdminPropertyCard } from "@/components/shared/AdminPropertyCard";
import { PropertyListItem } from "@/lib/types";

interface Props {
  properties: PropertyListItem[];
}

export function AdminPropertyGrid({ properties }: Props) {
  return (
    <div className="space-y-3">
      {properties.map((property) => (
        <AdminPropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
}