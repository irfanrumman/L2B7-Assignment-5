import { Suspense } from "react";
import { getPropertiesAction, getCategoriesAction } from "../_actions/adminPropertyActions";
import { AdminPropertyCard } from "../_components/AdminPropertyCard";
import  PropertyFiltersForm  from "@/components/shared/PropertyFiltersForm";
import PropertyPagination from "@/components/shared/PropertyPagination";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    location?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    isAvailable?: string;
  }>;
};

export default async function AdminPropertiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const [result, categories] = await Promise.all([
    getPropertiesAction({
      page: String(page),
      limit: "9",
      search: params.search,
      location: params.location,
      categoryId: params.categoryId,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      isAvailable: params.isAvailable,
    }),
    getCategoriesAction(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Property Management</h1>
        <p className="text-muted-foreground">
          View all platform properties. Mark properties as featured to show them on the homepage.
        </p>
      </div>

      <Suspense fallback={<div className="h-16" />}>
        <PropertyFiltersForm
          categories={categories}
          defaultValues={{
            search: params.search,
            location: params.location,
            categoryId: params.categoryId,
            minPrice: params.minPrice,
            maxPrice: params.maxPrice,
            isAvailable: params.isAvailable,
          }}
        />
      </Suspense>

      {!result.success ? (
        <p className="text-destructive">{result.message}</p>
      ) : result.data.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No properties found</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {result.data.map((property) => (
              <AdminPropertyCard key={property.id} {...property} />
            ))}
          </div>
          <Suspense fallback={<div className="h-16" />}>
            <PropertyPagination
              currentPage={result.meta.page}
              totalPages={result.meta.totalPages}
              baseUrl="/dashboard/admin/properties"
            />
          </Suspense>
        </>
      )}
    </div>
  );
}