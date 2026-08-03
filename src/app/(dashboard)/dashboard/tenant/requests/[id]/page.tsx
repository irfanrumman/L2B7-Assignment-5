import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ImageOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RentalRequestStatus } from "@/lib/types";
import { getRentalRequestDetailAction } from "../../_actions/tenantPaymentActions";
import { ReviewDialog } from "../../_components/ReviewDialog";

type Props = {
  params: Promise<{ id: string }>;
};

const statusColors: Record<RentalRequestStatus, string> = {
  PENDING: "bg-yellow-500 text-white hover:bg-yellow-500",
  APPROVED: "bg-blue-600 text-white hover:bg-blue-600",
  REJECTED: "bg-red-600 text-white hover:bg-red-600",
  ACTIVE: "bg-green-600 text-white hover:bg-green-600",
  COMPLETED: "bg-gray-500 text-white hover:bg-gray-500",
};

export default async function RentalRequestDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await getRentalRequestDetailAction(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const request = result.data;

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Request Details
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Full details of your rental request.
        </p>
      </div>

      <Card className="overflow-hidden py-0 gap-0">
        {/* Property Image */}
        <div className="relative h-40 w-full bg-muted sm:h-52">
          {request.property.image ? (
            <Image
              src={request.property.image}
              alt={request.property.title}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageOff className="h-10 w-10" />
            </div>
          )}
        </div>

        <div className="p-4 space-y-4 sm:p-6 sm:space-y-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-foreground sm:text-xl">
                {request.property.title}
              </h2>
              <Badge className={statusColors[request.status]}>
                {request.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1 sm:text-base">
              {request.property.location}
            </p>
          </div>

          <div className="space-y-2 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Landlord</span>
              <span className="text-foreground">
                {request.property.landlord.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Landlord Email</span>
              <span className="text-foreground truncate ml-2">
                {request.property.landlord.email}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Move-in</span>
              <span className="text-foreground">
                {new Date(request.moveInDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Move-out</span>
              <span className="text-foreground">
                {new Date(request.moveOutDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {request.message && (
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-1">Your Message</p>
              <p className="text-sm text-foreground italic">
                &quot;{request.message}&quot;
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-xl font-bold text-primary sm:text-2xl">
                ${request.property.price.toLocaleString()}
              </p>
            </div>

            {/* {request.status === "APPROVED" && (
              <Link href={`/dashboard/tenant/requests/${request.id}/pay`} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">Click To Pay</Button>
              </Link>
            )} */}
            {request.status === "APPROVED" && (
              <Link
                href={`/dashboard/tenant/requests/${request.id}/pay`}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto"
                >
                  Click To Pay
                </Button>
              </Link>
            )}
            
            {request.status === "COMPLETED" && !request.review && (
              <ReviewDialog rentalRequestId={request.id} />
            )}
          </div>

          {request.review && (
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-2">Your Review</p>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < request.review!.rating
                        ? "text-yellow-500"
                        : "text-muted"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-foreground italic">
                &quot;{request.review.comment}&quot;
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
