import { Suspense } from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { PropertySearch } from "./PropertySearch";

export function HeroSection() {
  return (
    <section className="relative flex min-h-95 items-center overflow-hidden sm:min-h-110 lg:min-h-125">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
          alt="Modern home exterior"
          fill
          unoptimized
          priority
          className="object-cover"
        />
        {/* Fixed literal overlay — NOT a theme token, so hero text stays legible in both modes */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/45 to-black/25" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 py-10 text-center sm:gap-6 sm:px-6 sm:py-14 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-medium tracking-wide text-primary-foreground uppercase sm:text-sm">
          <ShieldCheck className="h-3.5 w-3.5" />
          Trusted by 25,000+ renters
        </span>

        <h1
          className="font-display text-3xl leading-tight font-semibold text-white sm:text-5xl lg:text-6xl"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          Find Your Perfect <span className="text-[#d9b877]">Home</span>
        </h1>

        <p
          className="max-w-xl text-sm text-white/90 sm:text-lg"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.4)" }}
        >
          Browse thousands of rental properties from trusted landlords. Your
          next home is just a click away.
        </p>

        <div className="w-full max-w-2xl">
          <div className="rounded-2xl bg-card p-3 shadow-card-hover sm:p-4">
            <Suspense fallback={<div className="h-12 animate-pulse rounded-lg bg-muted" />}>
              <PropertySearch />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
