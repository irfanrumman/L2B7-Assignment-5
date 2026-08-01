"use server";

import { cookies } from "next/headers";
import { TenantRentalRequest, PaymentListItem, PaginationMeta } from "@/lib/types";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken ? { Cookie: `accessToken=${accessToken}` } : null;
};

type GetRentalsResult =
  | { success: true; data: TenantRentalRequest[]; meta: PaginationMeta }
  | { success: false; message: string; data: []; meta: null };

export const getTenantRentalsAction = async (): Promise<GetRentalsResult> => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized", data: [], meta: null };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      headers,
      cache: "no-store",
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to fetch rentals", data: [], meta: null };
    }

    return { success: true, data: result.data.data, meta: result.data.meta };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: [], meta: null };
  }
};

type GetPaymentsResult =
  | { success: true; data: PaymentListItem[]; meta: PaginationMeta }
  | { success: false; message: string; data: []; meta: null };

export const getTenantPaymentsAction = async (): Promise<GetPaymentsResult> => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized", data: [], meta: null };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
      headers,
      cache: "no-store",
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to fetch payments", data: [], meta: null };
    }

    return { success: true, data: result.data.data, meta: result.data.meta };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: [], meta: null };
  }
};