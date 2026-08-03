import { getCategoriesAction } from "../_actions/adminCategoryActions";
import { CategoryFormDialog } from "../_components/AdminCategoryFormDialog";
import { DeleteCategoryDialog } from "../_components/AdminDeleteCategoryDialog";

export default async function AdminCategoriesPage() {
  const result = await getCategoriesAction();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">Category Management</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Manage property categories available on the platform.
          </p>
        </div>
        <CategoryFormDialog mode="create" />
      </div>

      {!result.success ? (
        <p className="text-destructive">{result.message}</p>
      ) : result.data.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No categories yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {result.data.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground capitalize">{category.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{category.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <CategoryFormDialog mode="edit" category={category} />
                <DeleteCategoryDialog categoryId={category.id} categoryName={category.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}