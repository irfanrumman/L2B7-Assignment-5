import { getAdminRentalsAction } from "../_actions/adminRentalActions";
import { AdminRentalTable } from "../_components/AdminRentalTable";
import PropertyPagination from "@/components/shared/PropertyPagination";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function AdminRentalRequestsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const result = await getAdminRentalsAction(page);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">Rental Requests</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Monitor all rental requests and payments across the platform.
        </p>
      </div>

      {!result.success ? (
        <p className="text-destructive">{result.message}</p>
      ) : result.data.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No rental requests found</p>
        </div>
      ) : (
        <>
          <AdminRentalTable requests={result.data} />
          <PropertyPagination
            currentPage={result.meta.page}
            totalPages={result.meta.totalPages}
            baseUrl="/dashboard/admin/rental-requests"
          />
        </>
      )}
    </div>
  );
}