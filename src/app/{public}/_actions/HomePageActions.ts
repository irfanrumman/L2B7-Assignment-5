"use server";

import { PropertyListItem } from "@/lib/types";

type GetFeaturedPropertiesResult =
  | { success: true; data: PropertyListItem[] }
  | { success: false; message: string; data: [] };

export const getFeaturedPropertiesAction = async (): Promise<GetFeaturedPropertiesResult> => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties?limit=100`, {
      next: { revalidate: 60 },
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to fetch properties", data: [] };
    }

    const allProperties: PropertyListItem[] = result.data.data;

    // Backend e featured filter nei, tai frontend e nijei filter korchi
    const featuredOnly = allProperties.filter((p) => p.featured);

    return { success: true, data: featuredOnly };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: [] };
  }
};