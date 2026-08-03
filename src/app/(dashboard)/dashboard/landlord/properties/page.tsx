import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getLandlordPropertiesAction } from "../_actions/landlordPropertyActions";
import { LandlordPropertyList } from "../_components/LandlordPropertyList";

export default async function LandlordPropertiesPage() {
  const result = await getLandlordPropertiesAction();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Property Management</h1>
          <p className="text-muted-foreground">
            Edit or remove listings.
          </p>
        </div>
        <Link href="/dashboard/landlord/properties/new">
          <Button>Add Property</Button>
        </Link>
      </div>

      {!result.success ? (
        <p className="text-destructive">{result.message}</p>
      ) : result.data.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground mb-4">No properties yet</p>
          <Link href="/dashboard/landlord/properties/new">
            <Button>Create Listing</Button>
          </Link>
        </div>
      ) : (
        <LandlordPropertyList properties={result.data} />
      )}
    </div>
  );
}