"use server";

import { PropertyListItem } from "@/lib/types";

type GetHomePropertiesResult =
  | { success: true; data: PropertyListItem[]; isFiltered: boolean }
  | { success: false; message: string; data: []; isFiltered: boolean };

export const getHomePropertiesAction = async (
  locationQuery?: string
): Promise<GetHomePropertiesResult> => {
  try {
    const params = new URLSearchParams();
    params.set("limit", "100");
    if (locationQuery) {
      params.set("location", locationQuery);
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
      { cache: "no-store" }
    );

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to fetch properties", data: [], isFiltered: false };
    }

    const allProperties: PropertyListItem[] = result.data.data;

    if (locationQuery) {
      return { success: true, data: allProperties, isFiltered: true };
    }

    const featuredOnly = allProperties.filter((p) => p.featured);
    return { success: true, data: featuredOnly, isFiltered: false };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: [], isFiltered: false };
  }
};