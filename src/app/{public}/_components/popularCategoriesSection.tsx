import { Suspense } from "react";
import Link from "next/link";
import { Home, Building2, Warehouse, Building, Hotel, LandPlot } from "lucide-react";
import { getCategoriesAction } from "@/app/properties/_actions/propertyActions";

const ICONS = [Home, Building2, Warehouse, Building, Hotel, LandPlot];

function CategoriesSkeleton() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12 sm:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-32 w-[calc(50%-0.5rem)] animate-pulse rounded-2xl bg-muted sm:w-[calc(33.333%-1rem)] lg:w-[calc(16.666%-1.25rem)]"
        />
      ))}
    </div>
  );
}

async function CategoriesGrid() {
  const categories = await getCategoriesAction();

  if (categories.length === 0) return null;

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12 sm:gap-6">
      {categories.slice(0, 6).map((category, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <Link
            key={category.id}
            href={`/properties?categoryId=${category.id}`}
            className="card-interactive group flex w-[calc(50%-0.5rem)] flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-6 text-center sm:w-[calc(33.333%-1rem)] lg:w-[calc(16.666%-1.25rem)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
              <Icon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground capitalize sm:text-base">
              {category.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export function PopularCategoriesSection() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Browse by Type
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
            Explore property categories
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Find the type of place that fits your lifestyle.
          </p>
        </div>

        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesGrid />
        </Suspense>
      </div>
    </section>
  );
}
