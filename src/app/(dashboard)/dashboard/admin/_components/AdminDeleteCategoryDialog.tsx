"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteCategoryAction } from "../_actions/adminCategoryActions";

export function DeleteCategoryDialog({ categoryId, categoryName }: { categoryId: string; categoryName: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteCategoryAction(categoryId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button size="sm" variant="destructive" className="gap-1.5" onClick={() => setOpen(true)}>
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete "{categoryName}"?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Properties using this category may be affected.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}