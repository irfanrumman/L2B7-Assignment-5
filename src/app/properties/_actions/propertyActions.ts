"use server";

import { PropertyListItem, PaginationMeta, CategoryRef } from "@/lib/types";

export interface PublicPropertyFilters {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
  search?: string;
  isAvailable?: string;
  page?: string;
  limit?: string;
}

type GetPropertiesResult =
  | { success: true; data: PropertyListItem[]; meta: PaginationMeta }
  | { success: false; message: string; data: []; meta: null };

export const getPropertiesAction = async (
  filters: PublicPropertyFilters
): Promise<GetPropertiesResult> => {
  try {
    const searchParams = new URLSearchParams();
    if (filters.location) searchParams.set("location", filters.location);
    if (filters.minPrice) searchParams.set("minPrice", filters.minPrice);
    if (filters.maxPrice) searchParams.set("maxPrice", filters.maxPrice);
    if (filters.categoryId) searchParams.set("categoryId", filters.categoryId);
    if (filters.search) searchParams.set("search", filters.search);
    if (filters.isAvailable) searchParams.set("isAvailable", filters.isAvailable);
    searchParams.set("page", filters.page || "1");
    searchParams.set("limit", filters.limit || "9");

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties?${searchParams.toString()}`,
      { next: { revalidate: 60 } } // public data, kichukhon cache thakleo somossa nei
    );

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to fetch properties", data: [], meta: null };
    }

    return { success: true, data: result.data.data, meta: result.data.meta };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: [], meta: null };
  }
};

export const getCategoriesAction = async (): Promise<CategoryRef[]> => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      next: { revalidate: 3600 }, // category kom bodlay, 1 ghonta cache
    });
    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};