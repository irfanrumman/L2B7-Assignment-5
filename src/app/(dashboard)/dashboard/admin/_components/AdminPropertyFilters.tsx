import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategoryRef } from "@/lib/types";
import { AdminPropertySearchBox } from "./AdminPropertySearchBox";

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

export default function AdminPropertyFilters({ categories, defaultValues }: Props) {
  return (
    <div className="mb-8 space-y-4">
      <AdminPropertySearchBox defaultValue={defaultValues.search} />

      <form
        method="GET"
        className="rounded-lg border bg-card p-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:flex-wrap"
      >
        <input type="hidden" name="search" value={defaultValues.search || ""} />

        <div className="flex-1 min-w-35">
          <label className="mb-2 block text-sm font-medium">Location</label>
          <Input name="location" placeholder="Dhaka, ..." defaultValue={defaultValues.location} />
        </div>

        <div className="w-full sm:w-40">
          <label className="mb-2 block text-sm font-medium">Category</label>
          <select
            name="categoryId"
            defaultValue={defaultValues.categoryId || ""}
            className="w-full rounded-md border p-2 bg-background text-sm h-9 capitalize"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="capitalize">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-32">
          <label className="mb-2 block text-sm font-medium">Min Price</label>
          <Input name="minPrice" type="number" placeholder="0" defaultValue={defaultValues.minPrice} />
        </div>

        <div className="w-full sm:w-32">
          <label className="mb-2 block text-sm font-medium">Max Price</label>
          <Input name="maxPrice" type="number" placeholder="100000" defaultValue={defaultValues.maxPrice} />
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