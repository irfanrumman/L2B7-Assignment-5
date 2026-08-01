"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { PropertyListItem, PaginationMeta, CategoryRef } from "@/lib/types";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken ? { Cookie: `accessToken=${accessToken}` } : null;
};

export interface AdminPropertyFilters {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
  search?: string;
  isAvailable?: string;
  page?: string;
  limit?: string;
}

type GetAdminPropertiesResult =
  | { success: true; data: PropertyListItem[]; meta: PaginationMeta }
  | { success: false; message: string; data: []; meta: null };

export const getPropertiesAction = async (
  filters: AdminPropertyFilters
): Promise<GetAdminPropertiesResult> => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized", data: [], meta: null };
    }

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
      `${process.env.BACKEND_API_URL}/api/admin/properties?${searchParams.toString()}`,
      { headers, cache: "no-store" }
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
      cache: "no-store",
    });
    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const toggleFeaturedAction = async (propertyId: string, currentFeatured: boolean) => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/properties/${propertyId}`, {
      method: "PATCH",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !currentFeatured }),
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to update property" };
    }

    revalidatePath("/dashboard/admin/properties");
    revalidatePath("/dashboard/admin");
    revalidatePath("/");

    return { success: true, message: result.message };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};