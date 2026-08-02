"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createRentalRequestAction } from "../_actions/propertyDetailsActions";

const initialState = { success: false, message: "" };

export function RentalRequestForm({ propertyId }: { propertyId: string }) {
  const [state, formAction, pending] = useActionState(
    createRentalRequestAction.bind(null, propertyId),
    initialState
  );

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="moveInDate">Move-in Date</Label>
          <Input id="moveInDate" name="moveInDate" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="moveOutDate">Move-out Date</Label>
          <Input id="moveOutDate" name="moveOutDate" type="date" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message to Landlord</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Hi, I'm interested in renting this property..."
          rows={4}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Submitting..." : "Request to Rent"}
      </Button>
    </form>
  );
}