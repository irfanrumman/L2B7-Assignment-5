import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategoryRef } from "@/lib/types";
import { PropertySearchBox } from "@/components/shared/PropertySearchBox";
import { CategorySelect } from "@/components/shared/CategorySelect";

interface Props {
  categories: CategoryRef[];
  defaultValues: {
    location?: string;
    search?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    isAvailable?: string;
  };
}

export default function PropertyFiltersForm({ categories, defaultValues }: Props) {
  return (
    <div className="mb-8 space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <PropertySearchBox defaultValue={defaultValues.search} />
        <CategorySelect categories={categories} defaultValue={defaultValues.categoryId} />
      </div>

      <form
        method="GET"
        className="rounded-lg border bg-card p-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:flex-wrap"
      >
        <input type="hidden" name="search" value={defaultValues.search || ""} />
        <input type="hidden" name="categoryId" value={defaultValues.categoryId || ""} />

        <div className="flex-1 min-w-35">
          <label className="mb-2 block text-sm font-medium">Location</label>
          <Input name="location" placeholder="Dhaka, ..." className="border border-border w-[60%]" defaultValue={defaultValues.location} />
        </div>

        <div className="w-full sm:w-32">
          <label className="mb-2 block text-sm font-medium">Min Price</label>
          <Input name="minPrice" type="number" placeholder="0" className="border border-border w-full" defaultValue={defaultValues.minPrice} />
        </div>

        <div className="w-full sm:w-32">
          <label className="mb-2 block text-sm font-medium">Max Price</label>
          <Input name="maxPrice" type="number" className="border border-border w-full" placeholder="100000" defaultValue={defaultValues.maxPrice} />
        </div>

        <div className="w-full sm:w-36">
          <label className="mb-2 block text-sm font-medium">Availability</label>
          <select
            name="isAvailable"
            defaultValue={defaultValues.isAvailable || ""}
            className="w-full rounded-md border p-2 bg-background text-sm h-9"
          >
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          Apply Filters
        </Button>
      </form>
    </div>
  );
}