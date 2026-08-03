"use server";

import { cookies } from "next/headers";
import { AdminUserListItem, PropertyListItem, AdminRentalRequestItem, PaginationMeta } from "@/lib/types";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken ? { Cookie: `accessToken=${accessToken}` } : null;
};

interface OverviewData {
  users: { items: AdminUserListItem[]; meta: PaginationMeta };
  properties: { items: PropertyListItem[]; meta: PaginationMeta };
  rentals: { items: AdminRentalRequestItem[]; meta: PaginationMeta };
  totalRevenue: number;
  pendingCount: number;
}

type GetOverviewResult =
  | { success: true; data: OverviewData }
  | { success: false; message: string; data: null };

export const getAdminOverviewAction = async (): Promise<GetOverviewResult> => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized", data: null };
    }

    const [usersRes, propertiesRes, rentalsPreviewRes, rentalsAllRes] = await Promise.all([
      fetch(`${process.env.BACKEND_API_URL}/api/admin/users?page=1&limit=5`, { headers, cache: "no-store" }),
      fetch(`${process.env.BACKEND_API_URL}/api/admin/properties?page=1&limit=6`, { headers, cache: "no-store" }),
      fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals?page=1&limit=5`, { headers, cache: "no-store" }),
      fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals?page=1&limit=1000`, { headers, cache: "no-store" }),
    ]);

    const [usersJson, propertiesJson, rentalsPreviewJson, rentalsAllJson] = await Promise.all([
      usersRes.json(),
      propertiesRes.json(),
      rentalsPreviewRes.json(),
      rentalsAllRes.json(),
    ]);

    if (!usersJson.success || !propertiesJson.success || !rentalsPreviewJson.success || !rentalsAllJson.success) {
      return { success: false, message: "Failed to load dashboard data", data: null };
    }

    const totalRevenue = (rentalsAllJson.data.data as AdminRentalRequestItem[]).reduce(
      (sum, rental) =>
        sum + rental.payment.filter((p) => p.status === "PAID").reduce((s, p) => s + p.amount, 0),
      0
    );

    const pendingCount = (rentalsAllJson.data.data as AdminRentalRequestItem[]).filter(
      (rental) => rental.status === "PENDING"
    ).length;

    return {
      success: true,
      data: {
        users: { items: usersJson.data.data, meta: usersJson.data.meta },
        properties: { items: propertiesJson.data.data, meta: propertiesJson.data.meta },
        rentals: { items: rentalsPreviewJson.data.data, meta: rentalsPreviewJson.data.meta },
        totalRevenue,
        pendingCount,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: null };
  }
};