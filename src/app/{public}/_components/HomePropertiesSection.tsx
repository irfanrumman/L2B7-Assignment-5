import { Suspense } from "react";
import { HomePropertiesList } from "./HomePropertiesList";

function PropertiesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-border p-4">
          <div className="h-40 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

export function HomePropertiesSection({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2 sm:mb-10 sm:space-y-3">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
            Featured Properties
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Check out our latest rental properties.
          </p>
        </div>

        <Suspense fallback={<PropertiesSkeleton />}>
          <HomePropertiesList searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}