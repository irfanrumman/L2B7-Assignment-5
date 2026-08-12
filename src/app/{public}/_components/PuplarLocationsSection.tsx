import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const locations = [
  {
    city: "Dhaka",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
  },
  {
    city: "Cairo",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80",
  },
  {
    city: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  },
  {
    city: "Chittagong",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
  },
];

export function PopularLocationsSection() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Popular Locations
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
            Browse by city
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-4">
          {locations.map((loc) => (
            <Link
              key={loc.city}
              href={`/properties?location=${encodeURIComponent(loc.city)}`}
              className="group relative h-40 overflow-hidden rounded-2xl shadow-card sm:h-52"
            >
              <Image
                src={loc.image}
                alt={loc.city}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <p className="font-display text-base font-semibold text-white sm:text-lg">
                  {loc.city}
                </p>
                <ArrowUpRight className="h-4 w-4 text-white/80 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
