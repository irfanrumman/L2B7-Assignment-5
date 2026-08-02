"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { PropertyDetail } from "@/lib/types";

type GetPropertyDetailResult =
  | { success: true; data: PropertyDetail }
  | { success: false; message: string; data: null };

export const getPropertyDetailAction = async (
  id: string
): Promise<GetPropertyDetailResult> => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
      cache: "no-store",
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Property not found", data: null };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: null };
  }
};

// Tenant already ei property er jonno request pathiyeche kina check kori
export const checkExistingRequestAction = async (propertyId: string): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return false;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals?limit=1000`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });

    const result = await res.json();

    if (!result.success) return false;

    const existingRequest = result.data.data.find(
      (rental: { propertyId: string }) => rental.propertyId === propertyId
    );

    return !!existingRequest;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const createRentalRequestAction = async (
  propertyId: string,
  prevState: { success: boolean; message: string },
  formData: FormData
) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Please log in to request this property." };
    }

    const payload = {
      propertyId,
      moveInDate: formData.get("moveInDate"),
      moveOutDate: formData.get("moveOutDate"),
      message: formData.get("message"),
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to submit request" };
    }

    revalidatePath(`/properties/${propertyId}`);

    return { success: true, message: result.message || "Request submitted successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};