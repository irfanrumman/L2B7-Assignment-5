"use server";

import { cookies } from "next/headers";

export const confirmPaymentAction = async (sessionId: string) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/confirm`, {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to confirm payment" };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};