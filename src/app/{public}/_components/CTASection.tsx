import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80"
          alt=""
          fill
          unoptimized
          className="object-cover"
        />
        {/* Fixed literal overlay — NOT a theme token, so it never flips in dark mode */}
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-primary/20" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
          <Home className="h-6 w-6 text-accent-foreground" />
        </div>

        <h2
          className="font-display text-2xl font-semibold text-white sm:text-4xl"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
        >
          Ready to find your next home?
        </h2>

        <p className="mt-4 text-sm text-white/85 sm:text-lg">
          Join thousands of happy tenants who found their perfect rental.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/properties" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              Browse Properties
            </Button>
          </Link>

          <Link href="/register" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white/50 bg-transparent text-white hover:border-white/70 hover:bg-white/15 sm:w-auto"
            >
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
