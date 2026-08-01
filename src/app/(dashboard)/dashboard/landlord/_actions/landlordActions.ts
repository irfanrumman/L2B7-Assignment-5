"use server";

import { revalidatePath } from "next/cache";
import { getMe } from "@/service/getMe";
import { cookies } from "next/headers";

type PropertyState = {
  success: boolean;
  message: string;
};

export const createPropertyAction = async (
  prevState: PropertyState,
  formData: FormData
) => {
  try {
    const result = await getMe();

    if (!result.success) {
      return {
        success: false,
        message: "Please login first.",
      };
    }

    if (result.data.user.role !== "LANDLORD") {
      return {
        success: false,
        message: "Only landlords can create properties.",
      };
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized.",
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
      `${process.env.BACKEND_API_URL}/api/landlord/properties`,
      {
        method: "POST",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to create property.",
      };
    }

    revalidatePath("/dashboard/landlord/properties");

    return {
      success: true,
      message: data.message || "Property created successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};