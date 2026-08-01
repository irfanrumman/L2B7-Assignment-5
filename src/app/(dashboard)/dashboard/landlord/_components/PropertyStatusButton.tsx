"use client";

import { useState } from "react";
import { toast } from "sonner";

import { updateRentalRequestStatusAction } from "../_actions/landlordPropertyActions";

import { Button } from "@/components/ui/button";

interface Props {
  requestId: string;
  disabled?: boolean;
}

export default function StatusButtons({
  requestId,
  disabled = false,
}: Props) {
  const [loading, setLoading] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);

  const handleStatus = async (
    status: "APPROVED" | "REJECTED"
  ) => {
    setLoading(status);

    try {
      const result = await updateRentalRequestStatusAction(
        requestId,
        status
      );

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        disabled={disabled || loading !== null}
        onClick={() => handleStatus("APPROVED")}
      >
        {loading === "APPROVED"
          ? "Approving..."
          : "Approve"}
      </Button>

      <Button
        type="button"
        variant="secondary"
        disabled={disabled || loading !== null}
        onClick={() => handleStatus("REJECTED")}
      >
        {loading === "REJECTED"
          ? "Rejecting..."
          : "Reject"}
      </Button>
    </div>
  );
}