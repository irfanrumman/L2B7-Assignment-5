"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/dist/server/request/cookies";

// import { isAccessTokenExist } from "@/service/refreshToken";

type ActionState = {
  success: boolean;
  message: string;
};

export async function updateProperty(
  propertyId: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    // const accessToken = await isAccessTokenExist();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      location: formData.get("location"),
      price: Number(formData.get("price")),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "PUT",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update property",
      };
    }

    revalidatePath("/dashboard/landlord/properties");

    return {
      success: true,
      message: result.message || "Property updated successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function updateRentalRequestStatus(
  requestId: string,
  status: "APPROVED" | "REJECTED"
): Promise<ActionState> {
  try {
    // const accessToken = await isAccessTokenExist();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/requests/${requestId}`,
      {
        method: "PATCH",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update request",
      };
    }

    revalidatePath("/dashboard/landlord/properties");

    return {
      success: true,
      message: result.message || "Request updated successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function deleteProperty(
  propertyId: string
): Promise<ActionState> {
  try {
    // const accessToken = await isAccessTokenExist();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to delete property",
      };
    }

    revalidatePath("/dashboard/landlord/properties");

    return {
      success: true,
      message: result.message || "Property deleted successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}



export const getPropertyById = async (id: string) => {
  try {
    // const accessToken = await isAccessTokenExist();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties/${id}`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        data: null,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed to fetch property.",
      data: null,
    };
  }
};