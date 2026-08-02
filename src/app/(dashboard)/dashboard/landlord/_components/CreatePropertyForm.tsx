"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { createPropertyAction } from "../_actions/landlordActions";
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
import { CategoryRef, CreatePropertyActionState } from "@/lib/types"; 



interface Props {
  categories: CategoryRef[]; 
}

const initialState: CreatePropertyActionState = {
  success: false,
  message: "",
};

const inputClass =
  "border-2 border-slate-300 dark:border-slate-700 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20";

export default function CreatePropertyForm({ categories }: Props) {
  const [state, formAction, pending] = useActionState(
    createPropertyAction,
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
    <Card className="mx-auto w-full max-w-7xl rounded-2xl border shadow-xl">
      <CardHeader className="border-b pb-8">
        <CardTitle className="text-3xl font-bold">Create New Property</CardTitle>
        <CardDescription className="text-base">
          Fill in the information below to publish your property for rent.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 md:p-10 lg:p-12">
        <form action={formAction} className="space-y-10">
          <section className="space-y-8">
            <h3 className="text-xl font-semibold">Property Information</h3>

            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Modern Family House"
                required
                className={inputClass}
              />
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <CategorySelect categories={categories} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Rent Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="15000"
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <hr />

          <section className="space-y-8">
            <h3 className="text-xl font-semibold">Property Location</h3>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Mohammadpur, Dhaka"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Property Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/property.jpg"
                className={inputClass}
                required
              />
            </div>
          </section>

          <hr />

          <section className="space-y-8">
            <h3 className="text-xl font-semibold">Property Description</h3>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={8}
                required
                placeholder="Write a detailed description of your property..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg" disabled={pending} className="h-12 w-full md:w-64">
              {pending ? "Creating..." : "Create Property"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}