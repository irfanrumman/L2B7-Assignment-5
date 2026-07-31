import { PropertyGrid } from "./PropertyGrid";
import { PropertyListItem } from "@/lib/types";

interface Props {
  properties: PropertyListItem[]; // 👈 local duplicate type na, centralized type
}

export function FeaturedProperties({ properties }: Props) {
  return (
    <section className="py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-4">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Featured Properties
          </h2>

          <p className="text-lg text-muted-foreground">
            Check out our latest rental properties.
          </p>
        </div>

        <PropertyGrid properties={properties} />
      </div>
    </section>
  );
}