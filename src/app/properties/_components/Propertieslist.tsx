import { getPropertiesAction } from "../_actions/propertyActions";
import { PropertyGrid } from "@/components/shared/PropertyGrid";
import PropertyPagination from "@/components/shared/PropertyPagination";

interface Props {
  page: number;
  search?: string;
  location?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  isAvailable?: string;
}

export async function PropertiesList({
  page,
  search,
  location,
  categoryId,
  minPrice,
  maxPrice,
  isAvailable,
}: Props) {
  const result = await getPropertiesAction({
    page: String(page),
    limit: "8",
    search,
    location,
    categoryId,
    minPrice,
    maxPrice,
    isAvailable,
  });

  if (!result.success) {
    return <h2 className="text-xl font-semibold text-destructive">{result.message}</h2>;
  }

  if (result.data.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center">
        <p className="text-muted-foreground">No properties found</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <PropertyGrid properties={result.data} />
      <PropertyPagination
        currentPage={result.meta.page}
        totalPages={result.meta.totalPages}
        baseUrl="/properties"
      />
    </div>
  );
}