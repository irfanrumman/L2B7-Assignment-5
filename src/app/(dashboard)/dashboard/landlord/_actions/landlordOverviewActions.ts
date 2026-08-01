"use server";

import { cookies } from "next/headers";
import { getMe } from "@/service/getMe";
import { PropertyListItem, PaginationMeta, RentalRequestListItem } from "@/lib/types";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken ? { Cookie: `accessToken=${accessToken}` } : null;
};

interface OverviewData {
  properties: { items: PropertyListItem[]; total: number };
  requests: { items: RentalRequestListItem[]; meta: PaginationMeta };
  totalEarnings: number;
  pendingCount: number;
}

type GetOverviewResult =
  | { success: true; data: OverviewData }
  | { success: false; message: string; data: null };

export const getLandlordOverview = async (): Promise<GetOverviewResult> => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized", data: null };
    }

    const meResult = await getMe();
    if (!meResult.success) {
      return { success: false, message: "Unauthorized", data: null };
    }
    const landlordId = meResult.data.user.id;

    const [propertiesRes, requestsPreviewRes, requestsAllRes] = await Promise.all([
      fetch(`${process.env.BACKEND_API_URL}/api/properties?page=1&limit=1000`, {
        headers,
        cache: "no-store",
      }),
      fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests?page=1&limit=5`, {
        headers,
        cache: "no-store",
      }),
      fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests?page=1&limit=1000`, {
        headers,
        cache: "no-store",
      }),
    ]);

    const [propertiesJson, requestsPreviewJson, requestsAllJson] = await Promise.all([
      propertiesRes.json(),
      requestsPreviewRes.json(),
      requestsAllRes.json(),
    ]);

    if (!propertiesJson.success || !requestsPreviewJson.success || !requestsAllJson.success) {
      return { success: false, message: "Failed to load dashboard data", data: null };
    }

    const allProperties: PropertyListItem[] = propertiesJson.data.data;
    const myProperties = allProperties.filter((p) => p.landlord.id === landlordId);

    const allRequests = requestsAllJson.data.data as (RentalRequestListItem & {
      payment?: { status: string; amount: number }[]; // 👈 optional করে দিলাম, guaranteed না
    })[];

    const totalEarnings = allRequests.reduce(
      (sum, req) =>
        sum + (req.payment ?? []).filter((p) => p.status === "PAID").reduce((s, p) => s + p.amount, 0),
        // 👆 (req.payment ?? []) — payment na thakle empty array dhore nao, crash na kore
      0
    );

    const pendingCount = allRequests.filter((req) => req.status === "PENDING").length;

    return {
      success: true,
      data: {
        properties: { items: myProperties.slice(0, 5), total: myProperties.length },
        requests: { items: requestsPreviewJson.data.data, meta: requestsPreviewJson.data.meta },
        totalEarnings,
        pendingCount,
      },
    };
  } catch (error) {
    console.error("🔍 catch block error:", error);
    return { success: false, message: "Something went wrong", data: null };
  }
};