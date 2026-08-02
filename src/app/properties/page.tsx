import { Suspense } from "react";
import { getCategoriesAction } from "./_actions/propertyActions";
import { PropertyCardSkeleton } from "@/components/shared/PropertyCardSkeleton";
import PropertyFiltersForm from "@/components/shared/PropertyFiltersForm";
import { PropertiesList } from "./_components/Propertieslist";

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

function PropertiesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function PropertiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const categories = await getCategoriesAction();

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">All Properties</h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Find your next home from our curated listings.
          </p>
        </div>

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

        <Suspense fallback={<PropertiesGridSkeleton />} key={JSON.stringify(params)}>
          <PropertiesList
            page={page}
            search={params.search}
            location={params.location}
            categoryId={params.categoryId}
            minPrice={params.minPrice}
            maxPrice={params.maxPrice}
            isAvailable={params.isAvailable}
          />
        </Suspense>
      </div>
    </main>
  );
}