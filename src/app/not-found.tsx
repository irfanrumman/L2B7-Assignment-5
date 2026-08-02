import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="rounded-full bg-primary/10 p-4 sm:p-6">
        <SearchX className="h-12 w-12 text-primary sm:h-16 sm:w-16" />
      </div>

      <h1 className="mt-4 text-4xl font-bold text-foreground sm:mt-6 sm:text-5xl lg:text-6xl">
        404
      </h1>
      <h2 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
        Page Not Found
      </h2>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground sm:max-w-md sm:text-base">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>

      <div className="mt-6 flex w-full max-w-xs flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:w-auto">
        <Link href="/" className="w-full sm:w-auto">
          <Button size="lg" className="w-full gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/properties" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full">
            Browse Properties
          </Button>
        </Link>
      </div>
    </div>
  );
}