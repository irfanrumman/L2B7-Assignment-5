import { Suspense } from "react";
import Image from "next/image";
import { PropertySearch } from "./PropertySearch";

export function HeroSection() {
  return (
    <section className="relative min-h-87.5 overflow-hidden sm:min-h-105">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
          alt="Modern home exterior"
          fill
          unoptimized
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/40 dark:bg-primary/50" />
        <div className="absolute inset-0 bg-background/20 dark:bg-background/35" />
      </div>

      <div className="relative flex min-h-87.5 flex-col justify-between px-4 py-8 sm:min-h-105 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-2 text-center sm:space-y-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-secondary sm:text-4xl md:text-5xl">
            Find Your Perfect
            <span className="text-primary-foreground"> Home</span>
          </h1>

          <p className="mx-auto max-w-xl text-sm font-medium text-foreground sm:text-base">
            Browse thousands of rental properties from trusted landlords.
            Your next home is just a click away.
          </p>
        </div>

        <div className="mx-auto w-full max-w-2xl">
          <div className="rounded-xl bg-card p-3 shadow-lg sm:p-4">
            <Suspense fallback={<div className="h-12 animate-pulse rounded-lg bg-muted" />}>
              <PropertySearch />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}