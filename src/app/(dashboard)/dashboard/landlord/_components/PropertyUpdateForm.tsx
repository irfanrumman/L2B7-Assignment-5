"use client";

import { useActionState, useEffect } from "react";
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

export default function UpdatePropertyForm({
  property,
  categories,
}: Props) {
  const action = updatePropertyAction.bind(null, property.id);

  const [state, formAction, pending] = useActionState(
    action,
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
    <Card className="mx-auto w-full max-w-6xl rounded-2xl shadow-lg">
      <CardHeader className="border-b pb-8">
        <CardTitle className="text-3xl font-bold">
          Update Property
        </CardTitle>

        <CardDescription className="text-base">
          Edit your property information and save the changes.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 md:p-10">
        <form action={formAction} className="space-y-10">
          {/* Property Information */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold">
              Property Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>

              <Input
                id="title"
                name="title"
                defaultValue={property.title}
                required
                className="border"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>

                <CategorySelect
                  categories={categories}
                //   defaultValue={property.categoryId}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Monthly Rent</Label>

                <Input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={property.price}
                  required
                  className="border"
                />
              </div>
            </div>
          </section>

          <hr />

          {/* Location */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold">
              Property Location
            </h3>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>

              <Input
                id="location"
                name="location"
                defaultValue={property.location}
                required
                className="border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">
                Property Image URL
              </Label>

              <Input
                id="image"
                name="image"
                type="url"
                defaultValue={property.image ?? ""}
                placeholder="https://example.com/image.jpg"
                className="border"
              />
            </div>
          </section>

          <hr />

          {/* Description */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold">
              Property Description
            </h3>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description
              </Label>

              <Textarea
                id="description"
                name="description"
                defaultValue={property.description}
                rows={8}
                required
                className="resize-none border"
              />
            </div>
          </section>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={pending}
              className="w-full md:w-56"
            >
              {pending ? "Updating..." : "Update Property"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}