"use server";

import { cookies } from "next/headers";
import { AdminRentalRequestItem } from "@/lib/types";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken ? { Cookie: `accessToken=${accessToken}` } : null;
};

export const getPropertyRentalRequests = async (
  propertyId: string
): Promise<AdminRentalRequestItem[]> => {
  try {
    const headers = await getAuthHeader();
    if (!headers) return [];

    // Shob rental request ekhon anchi (boro limit diye), tarpor client-side e filter korbo
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/rentals?limit=1000`,
      { headers, cache: "no-store" }
    );

    const result = await res.json();

    if (!result.success) return [];

    const allRentals: AdminRentalRequestItem[] = result.data.data;

    // shudhu ei property er request gulo bache rakhchi
    return allRentals.filter((rental) => rental.property.id === propertyId);
  } catch (error) {
    console.error(error);
    return [];
  }
};