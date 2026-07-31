import { PropertyCard } from "@/components/shared/property-card";

interface Props {
  properties: any[];
}

export function PropertyGrid({ properties }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          title={property.title}
          location={property.location}
          price={property.price}
          image={property.image ?? ""}
          bedrooms={3}
          bathrooms={2}
          featured={false}
        />
      ))}
    </div>
  );
}