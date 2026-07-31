"use client";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
}

export default function CategorySelect({ categories }: Props) {
  return (
    <select
      name="categoryId"
      required
      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="">Select Category</option>

      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}