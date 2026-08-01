import Image from "next/image";
import { ImageOff, MapPin, Phone, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { PropertyListItem } from "@/lib/types";
import { FeaturedToggle } from "../../_components/AdminFeaturedToggle";
import { PropertyRentalRequests } from "../../_components/AdminPropertyRentalReq";
import { getPropertyRentalRequests } from "../../_actions/adminPropertyDetailActions";

async function getPropertyDetail(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Unauthorized", data: null };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Property not found", data: null };
    }

    return { success: true, data: result.data as PropertyListItem & { reviews: any[] } };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: null };
  }
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminPropertyDetailPage({ params }: Props) {
  const { id } = await params;

  const [result, rentalRequests] = await Promise.all([
    getPropertyDetail(id),
    getPropertyRentalRequests(id),
  ]);

  if (!result.success || !result.data) {
    return (
      <div className="max-w-3xl mx-auto">
        <p className="text-destructive">{result.message}</p>
      </div>
    );
  }

  const property = result.data;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Property Details</h1>
        <p className="text-muted-foreground">Review property information and manage featured status.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="relative h-64 w-full bg-muted">
          {property.image ? (
            <Image src={property.image} alt={property.title} fill unoptimized className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageOff className="h-12 w-12" />
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-foreground">{property.title}</h2>
              <Badge variant="outline" className="capitalize">
                {property.category.name}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Landlord full details */}
          <div className="space-y-2 border-t border-border pt-4">
            <h3 className="font-semibold text-foreground mb-2">Landlord Details</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="text-foreground">{property.landlord.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" /> Email
              </span>
              <span className="text-foreground">{property.landlord.email}</span>
            </div>
            {"phone" in property.landlord && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" /> Phone
                </span>
                <span className="text-foreground">
                  {(property.landlord as { phone: string | null }).phone || "Not provided"}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Availability</span>
              {property.isAvailable ? (
                <Badge className="bg-green-600 text-white hover:bg-green-600">Available</Badge>
              ) : (
                <Badge variant="destructive">Not Available</Badge>
              )}
            </div>
          </div>

          <p className="text-sm text-foreground border-t border-border pt-4">
            {property.description}
          </p>

          {/* Reviews/comments */}
          <div className="border-t border-border pt-4">
            <h3 className="font-semibold text-foreground mb-2">
              Reviews ({property.reviews.length})
            </h3>
            {property.reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            ) : (
              <div className="space-y-2">
                {property.reviews.map((review: any) => (
                  <div key={review.id} className="rounded-lg border border-border p-3 text-sm">
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-500" : "text-muted"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rental requests / tenants */}
          <PropertyRentalRequests requests={rentalRequests} />

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Price</p>
              <p className="text-2xl font-bold text-primary">
                ${property.price.toLocaleString()}
              </p>
            </div>

            <FeaturedToggle propertyId={property.id} initialFeatured={property.featured} />
          </div>
        </div>
      </Card>
    </div>
  );
}