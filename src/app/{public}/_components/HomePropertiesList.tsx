import { PropertyGrid } from "@/components/shared/PropertyGrid";
import { getHomePropertiesAction } from "../_actions/HomePageActions";

export async function HomePropertiesList({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const query = await searchParams;
  const result = await getHomePropertiesAction(query.location);

  if (!result.success) {
    return (
      <p className="py-12 text-center text-destructive">{result.message}</p>
    );
  }

  if (result.data.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        {result.isFiltered
          ? "No properties found in this location."
          : "No featured properties yet."}
      </p>
    );
  }

  return <PropertyGrid properties={result.data} />;
}