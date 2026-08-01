"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  updateRentalRequestStatusAction
} from "../_actions/landlordPropertyActions";

import DeletePropertyDialog from "./DeleteProperty";

import { Button } from "@/components/ui/button";

interface Property {
  id: string;
  requestId?: string; 
}

interface Props {
  property: Property;
}

export default function PropertyActions({ property }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleStatus = async (
    status: "APPROVED" | "REJECTED"
  ) => {
    if (!property.requestId) {
      toast.error("No rental request found.");
      return;
    }

    setLoading(true);

    try {
      const result = await updateRentalRequestStatusAction(
        property.requestId,
        status
      );

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      <Button
        variant="outline"
        disabled={loading}
        onClick={() =>
          router.push(
            `/dashboard/landlord/properties/${property.id}`
          )
        }
      >
        Update
      </Button>

      <Button
        disabled={loading}
        onClick={() => handleStatus("APPROVED")}
      >
        Approve
      </Button>

      <Button
        variant="secondary"
        disabled={loading}
        onClick={() => handleStatus("REJECTED")}
      >
        Reject
      </Button>

      <DeletePropertyDialog
        propertyId={property.id}
        disabled={loading}
      />
    </div>
  );
}