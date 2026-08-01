"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";



export const getLandlordRequestsAction = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Unauthorized", data: [], meta: null };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch requests",
        data: [],
        meta: null,
      };
    }

    return {
      success: true,
      data: result.data.data,
      meta: result.data.meta,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: [], meta: null };
  }
};

export const updateRequestStatusAction = async (
  requestId: string,
  status: "APPROVED" | "REJECTED"
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/requests/${requestId}`,
      {
        method: "PATCH",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || `Failed to ${status.toLowerCase()} request`,
      };
    }

    revalidatePath("/dashboard/landlord/requests");

    return {
      success: true,
      message: result.message || `Request ${status.toLowerCase()} successfully`,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};