import { PropertySearch } from "./PropertySearch";

export function HeroSection() {
  return (
    <section className="bg-linear-to-b from-primary/10 to-background py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find Your Perfect
              <span className="text-primary"> Home</span>
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              Browse thousands of rental properties from trusted landlords.
              Your next home is just a click away.
            </p>
          </div>

          <PropertySearch />
        </div>
      </div>
    </section>
  );
}