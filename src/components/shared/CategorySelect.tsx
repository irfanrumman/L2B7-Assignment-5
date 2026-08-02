"use client";

import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CategoryRef } from "@/lib/types";

interface Props {
  categories: CategoryRef[];
  defaultValue?: string;
}

export function CategorySelect({ categories, defaultValue }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("categoryId", value);
    } else {
      params.delete("categoryId");
    }
    params.set("page", "1");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <select
      defaultValue={defaultValue || ""}
      onChange={handleChange}
      disabled={isPending}
      className="w-[70%] rounded-md border bg-background p-2 text-sm h-9 capitalize disabled:opacity-60"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id} className="capitalize">
          {cat.name}
        </option>
      ))}
    </select>
  );
}