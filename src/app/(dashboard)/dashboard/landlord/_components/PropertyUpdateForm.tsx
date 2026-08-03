"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updatePropertyAction } from "../_actions/landlordPropertyActions";
import CategorySelect from "./CategorySelect";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Category {
  id: string;
  name: string;
}

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  image?: string | null;
  categoryId: string;
}

interface Props {
  property: Property;
  categories: Category[];
}

const initialState = {
  success: false,
  message: "",
};

export default function UpdatePropertyForm({ property, categories }: Props) {
  const router = useRouter();
  const action = updatePropertyAction.bind(null, property.id);

  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      router.push("/dashboard/landlord/properties"); // 👈 update sofol hole redirect
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Card className="mx-auto w-full max-w-4xl rounded-xl shadow-sm sm:rounded-2xl sm:shadow-lg">
      <CardHeader className="border-b p-4 pb-6 sm:p-6 sm:pb-8">
        <CardTitle className="text-xl font-bold sm:text-2xl md:text-3xl">
          Update Property
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Edit your property information and save the changes.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 md:p-8">
        <form action={formAction} className="space-y-6 sm:space-y-8 md:space-y-10">
          {/* Property Information */}
          <section className="space-y-4 sm:space-y-6">
            <h3 className="text-base font-semibold sm:text-lg">Property Information</h3>

            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                name="title"
                className="border border-border w-[60%]"
                defaultValue={property.title}
                required
              />
            </div>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <CategorySelect
                  categories={categories}
                  defaultValue={property.categoryId} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Rent</Label>
                <Input
                className="border border-border w-[60%]"
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={property.price}
                  required
                />
              </div>
            </div>
          </section>

          <hr />

          {/* Location */}
          <section className="space-y-4 sm:space-y-6">
            <h3 className="text-base font-semibold sm:text-lg">Property Location</h3>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
              className="border border-border w-[60%]"
                id="location"
                name="location"
                defaultValue={property.location}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Property Image URL</Label>
              <Input
              className="border border-border w-[60%]"
                id="image"
                name="image"
                type="url"
                defaultValue={property.image ?? ""}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </section>

          <hr />

          {/* Description */}
          <section className="space-y-4 sm:space-y-6">
            <h3 className="text-base font-semibold sm:text-lg">Property Description</h3>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={property.description}
                rows={6}
                required
                className="resize-none sm:rows-8 border border-border w-[80%]"
              />
            </div>
          </section>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={pending}
              className="w-full sm:w-56"
            >
              {pending ? "Updating..." : "Update Property"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}