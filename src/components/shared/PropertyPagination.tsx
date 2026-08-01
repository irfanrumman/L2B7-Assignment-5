"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

export default function PropertyPagination({ currentPage, totalPages, baseUrl }: Props) {
  const searchParams = useSearchParams();

  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${baseUrl}?${params.toString()}`;
  };

  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      <Link href={buildUrl(prevPage)} aria-disabled={isFirstPage}>
        <Button variant="outline" size="icon" disabled={isFirstPage} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      <p className="text-sm text-muted-foreground font-medium">
        Page {currentPage} of {totalPages}
      </p>

      <Link href={buildUrl(nextPage)} aria-disabled={isLastPage}>
        <Button variant="outline" size="icon" disabled={isLastPage} className="rounded-full">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}