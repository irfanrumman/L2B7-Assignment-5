import { Suspense } from "react";
import { getPropertiesAction, getCategoriesAction } from "./_actions/propertyActions";
import { PropertyGrid } from "@/components/shared/PropertyGrid";
import PropertyFiltersForm from "@/components/shared/PropertyFiltersForm";
import PropertyHeader from "./_components/PropertyHeader";
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

export default async function PropertiesPage({ searchParams }: Props) {
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
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-12">
        <PropertyHeader total={result.success ? result.meta.total : 0} />

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
          <h2 className="text-xl font-semibold text-destructive">{result.message}</h2>
        ) : result.data.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No properties found</p>
          </div>
        ) : (
          <>
            <PropertyGrid properties={result.data} />
            <Suspense fallback={<div className="h-16" />}>
              <PropertyPagination
                currentPage={result.meta.page}
                totalPages={result.meta.totalPages}
                baseUrl="/properties"
              />
            </Suspense>
          </>
        )}
      </div>
    </main>
  );
}