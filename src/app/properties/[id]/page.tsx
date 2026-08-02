import Image from "next/image";
import { redirect } from "next/navigation";
import { ImageOff, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMe } from "@/service/getMe";
import {
  getPropertyDetailAction,
  checkExistingRequestAction,
} from "../_actions/propertyDetailsActions";
import { PropertyDetailCTA } from "../_components/PropertyDetailCTA";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await getPropertyDetailAction(id);

  if (!result.success || !result.data) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-destructive">{result.message}</p>
      </div>
    );
  }

  const property = result.data;

  // Logged-in tenant hole, age theke request pathano ache kina check kori
  const meResult = await getMe();
  if (meResult.success && meResult.data.user.role === "TENANT") {
    const alreadyRequested = await checkExistingRequestAction(id);
    if (alreadyRequested) {
      redirect("/dashboard/tenant");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-80 w-full overflow-hidden rounded-lg bg-muted">
            {property.image ? (
              <Image
                src={property.image}
                alt={property.title}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <ImageOff className="h-16 w-16" />
              </div>
            )}
            {property.featured && (
              <Badge variant="secondary" className="absolute top-4 right-4">
                Featured
              </Badge>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h1 className="text-3xl font-bold text-foreground">{property.title}</h1>
              <Badge variant="outline" className="capitalize">
                {property.category.name}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
            </div>
          </div>

          <Card className="p-6 space-y-4">
            <div>
              <h2 className="font-semibold text-foreground mb-2">Description</h2>
              <p className="text-muted-foreground">{property.description}</p>
            </div>

            <div className="border-t border-border pt-4">
              <h2 className="font-semibold text-foreground mb-2">About the Category</h2>
              <p className="text-sm text-muted-foreground">{property.category.description}</p>
            </div>

            <div className="border-t border-border pt-4">
              <h2 className="font-semibold text-foreground mb-2">Landlord</h2>
              <p className="text-sm text-foreground">{property.landlord.name}</p>
              <p className="text-sm text-muted-foreground">{property.landlord.email}</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-foreground mb-4">
              Reviews ({property.reviews.length})
            </h2>
            {property.reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            ) : (
              <div className="space-y-3">
                {property.reviews.map((review) => (
                  <div key={review.id} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-500" : "text-muted"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Monthly Price</p>
            <p className="text-3xl font-bold text-primary">
              ${property.price.toLocaleString()}
            </p>
            <div className="mt-2">
              {property.isAvailable ? (
                <Badge className="bg-green-600 text-white hover:bg-green-600">Available</Badge>
              ) : (
                <Badge className="bg-red-600 text-white hover:bg-red-600">Not Available</Badge>
              )}
            </div>
          </Card>

          <PropertyDetailCTA propertyId={property.id} isAvailable={property.isAvailable} />
        </div>
      </div>
    </main>
  );
}