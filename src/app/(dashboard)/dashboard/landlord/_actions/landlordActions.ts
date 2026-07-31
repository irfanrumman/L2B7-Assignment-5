"use server";

import { revalidatePath } from "next/cache";
import { getMe } from "@/service/getMe";
import { cookies } from "next/headers";
// import { isAccessTokenExist } from "@/service/refreshToken";

type PropertyState = {
  success: boolean;
  message: string;
};

export async function createProperty(
  prevState: PropertyState,
  formData: FormData
): Promise<PropertyState> {
  try {
    // Logged in user
    const result = await getMe();

    if (!result.success) {
      return {
        success: false,
        message: "Please login first.",
      };
    }

    // Role check
    if (result.data.user.role !== "LANDLORD") {
      return {
        success: false,
        message: "Only landlords can create properties.",
      };
    }

    // const accessToken = await isAccessTokenExist();
    
    //for now,
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
  isAvailable: formData.get("isAvailable") === "on",
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
}