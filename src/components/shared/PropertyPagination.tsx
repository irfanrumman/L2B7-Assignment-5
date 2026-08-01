"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

export default function PropertyPagination({ currentPage, totalPages, baseUrl }: Props) {
  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      <Link href={`${baseUrl}?page=${prevPage}`} aria-disabled={isFirstPage}>
        <Button
          variant="outline"
          size="icon"
          disabled={isFirstPage}
          className="rounded-full transition-colors hover:bg-primary hover:text-primary-foreground disabled:hover:bg-transparent disabled:hover:text-current"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      <p className="text-sm text-muted-foreground font-medium">
        Page {currentPage} of {totalPages}
      </p>

      <Link href={`${baseUrl}?page=${nextPage}`} aria-disabled={isLastPage}>
        <Button
          variant="outline"
          size="icon"
          disabled={isLastPage}
          className="rounded-full transition-colors hover:bg-primary hover:text-primary-foreground disabled:hover:bg-transparent disabled:hover:text-current"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}