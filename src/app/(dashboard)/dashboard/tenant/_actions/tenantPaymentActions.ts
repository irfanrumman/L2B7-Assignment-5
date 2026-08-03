"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RentalRequestDetail } from "@/lib/types";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken ? { Cookie: `accessToken=${accessToken}` } : null;
};

type GetRentalDetailResult =
  | { success: true; data: RentalRequestDetail }
  | { success: false; message: string; data: null };

export const getRentalRequestDetailAction = async (
  requestId: string
): Promise<GetRentalDetailResult> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Unauthorized", data: null };
    }

    // 👇 Token theke nijer tenantId ber kore anlam
    const decodedToken = jwt.decode(accessToken) as JwtPayload;
    const currentUserId = decodedToken?.id;

    if (!currentUserId) {
      return { success: false, message: "Unauthorized", data: null };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${requestId}`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to fetch request", data: null };
    }

    // 👇 Frontend nijei check korche — ei rental request ta ki actually ei logged-in tenant er?
    if (result.data.tenantId !== currentUserId) {
      return { success: false, message: "You are not authorized to view this request", data: null };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: null };
  }
};


export const createPaymentAction = async (rentalRequestId: string) => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ rentalRequestId, provider: "STRIPE" }),
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to create payment session" };
    }

    return { success: true, checkoutUrl: result.data.checkoutUrl as string };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};





export const createReviewAction = async (
  rentalRequestId: string,
  prevState: { success: boolean; message: string },
  formData: FormData
) => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized" };
    }

    const payload = {
      rentalRequestId,
      rating: Number(formData.get("rating")),
      comment: formData.get("comment"),
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to submit review" };
    }

    return { success: true, message: result.message || "Review submitted successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};