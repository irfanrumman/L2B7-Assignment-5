"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteProperty } from "../_actions/landlordPropertyActions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

interface Props {
  propertyId: string;
  disabled?: boolean;
}

export default function DeletePropertyDialog({
  propertyId,
  disabled = false,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const result = await deleteProperty(propertyId);

      if (result.success) {
        toast.success(result.message || "Property deleted successfully.");

        router.push("/dashboard/landlord/properties");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete property.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={disabled || loading}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Property?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This property will be
            permanently removed from the platform.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {loading ? "Deleting..." : "Delete Property"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}