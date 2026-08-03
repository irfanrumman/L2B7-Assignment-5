import { getTenantRentalsAction, getTenantPaymentsAction } from "./_actions/tenantActions";
import { TenantStats } from "./_components/TenantStats";
import { TenantDashboardTabs } from "./_components/TenantDashboardTabs";

export default async function TenantDashboardPage() {
  const [rentalsResult, paymentsResult] = await Promise.all([
    getTenantRentalsAction(),
    getTenantPaymentsAction(),
  ]);

  const rentals = rentalsResult.success ? rentalsResult.data : [];
  const payments = paymentsResult.success ? paymentsResult.data : [];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">My Rentals</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Track your rental requests and payments.
        </p>
      </div>

      {!rentalsResult.success && !paymentsResult.success ? (
        <p className="text-destructive">
          {rentalsResult.message || paymentsResult.message}
        </p>
      ) : (
        <>
          <TenantStats rentals={rentals} payments={payments} />
          <TenantDashboardTabs rentals={rentals} payments={payments} />
        </>
      )}
    </div>
  );
}