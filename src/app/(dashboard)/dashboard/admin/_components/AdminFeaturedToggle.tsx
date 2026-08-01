"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toggleFeaturedAction } from "../_actions/adminPropertyActions";

export function FeaturedToggle({
  propertyId,
  initialFeatured,
}: {
  propertyId: string;
  initialFeatured: boolean;
}) {
  const [featured, setFeatured] = useState(initialFeatured);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleFeaturedAction(propertyId, featured);
      if (result.success) {
        setFeatured(!featured);
        toast.success(result.message || "Property updated");
      } else {
        toast.error(result.message || "Failed to update property");
      }
    });
  };

  return (
    <Button
      size="lg"
      variant={featured ? "default" : "outline"}
      disabled={isPending}
      onClick={handleToggle}
      className="gap-2"
    >
      <Star className={`h-4 w-4 ${featured ? "fill-current" : ""}`} />
      {featured ? "Featured" : "Mark as Featured"}
    </Button>
  );
}