import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <section className="bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-medium tracking-wide text-primary uppercase">
              Handpicked for You
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
              Featured Properties
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Check out our latest rental properties.
            </p>
          </div>

          <Link href="/properties" className="hidden sm:block">
            <Button variant="outline" className="gap-1.5">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Suspense fallback={<PropertiesSkeleton />}>
          <HomePropertiesList searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}