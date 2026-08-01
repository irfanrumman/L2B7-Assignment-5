import { getAdminUsersAction } from "../_actions/adminUserAction";
import { UserManagementTable } from "../_components/UserManegmentTable";
import PropertyPagination from "@/components/shared/PropertyPagination";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function AdminUsersPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const result = await getAdminUsersAction(page);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground">
          View and manage all platform users. Ban or unban accounts as needed.
        </p>
      </div>

      {!result.success ? (
        <p className="text-destructive">{result.message}</p>
      ) : result.data.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No users found</p>
        </div>
      ) : (
        <>
          <UserManagementTable users={result.data} />
          <PropertyPagination
            currentPage={result.meta.page}
            totalPages={result.meta.totalPages}
            baseUrl="/dashboard/admin/users"
          />
        </>
      )}
    </div>
  );
}