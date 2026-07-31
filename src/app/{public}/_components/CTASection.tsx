import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="border-t bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

        <div className="space-y-4">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to find your home?
          </h2>

          <p className="text-lg text-muted-foreground">
            Join thousands of happy tenants who found their perfect rental.
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/properties">
            <Button size="lg">
              Browse Properties
            </Button>
          </Link>

          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
            >
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}