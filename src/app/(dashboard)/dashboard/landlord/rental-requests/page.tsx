import { getLandlordRequestsAction } from "../_actions/landlordPropertyRequestActions";
import { RequestList } from "../_components/PropertyRequestList";

export default async function LandlordRequestsPage() {
  const result = await getLandlordRequestsAction();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tenant Requests</h1>
        <p className="text-muted-foreground">
          Review and manage incoming rental requests for your properties.
        </p>
      </div>

      {!result.success ? (
        <p className="text-destructive">{result.message}</p>
      ) : result.data.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No rental requests yet</p>
        </div>
      ) : (
        <RequestList requests={result.data} />
      )}
    </div>
  );
}