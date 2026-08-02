"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createReviewAction } from "../_actions/tenantPaymentActions";

const initialState = { success: false, message: "" };

export function ReviewDialog({ rentalRequestId }: { rentalRequestId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [state, formAction, pending] = useActionState(
    createReviewAction.bind(null, rentalRequestId),
    initialState
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      setOpen(false);
      router.refresh(); // 👈 page e giye fresh data anbe, review ta dekhabe
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Leave a Review</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>
            Share your experience with this rental. Your review will be visible on the property page.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Your Rating</label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1;
                const isFilled = starValue <= (hoveredRating || rating);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        isFilled ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <input type="hidden" name="rating" value={rating} />
          </div>

          <div>
            <label htmlFor="comment" className="mb-2 block text-sm font-medium">
              Your Review
            </label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Share your experience with this rental..."
              rows={4}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}