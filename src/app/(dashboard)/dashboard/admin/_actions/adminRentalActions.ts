"use server";

import { cookies } from "next/headers";
import { AdminRentalRequestItem, PaginationMeta } from "@/lib/types";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken ? { Cookie: `accessToken=${accessToken}` } : null;
};

type GetAdminRentalsResult =
  | { success: true; data: AdminRentalRequestItem[]; meta: PaginationMeta }
  | { success: false; message: string; data: []; meta: null };

export const getAdminRentalsAction = async (page: number = 1): Promise<GetAdminRentalsResult> => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized", data: [], meta: null };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/rentals?page=${page}&limit=10`,
      {
        headers,
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to fetch rental requests", data: [], meta: null };
    }

    return { success: true, data: result.data.data, meta: result.data.meta };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: [], meta: null };
  }
};