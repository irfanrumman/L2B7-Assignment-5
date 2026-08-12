"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { profileSchema } from "@/lib/validations";

export type UpdateProfileState =
  | { success: true; message: string }
  | { success: false; message: string }
  | false;

export const updateProfileAction = async (
  prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "You must be logged in." };
    }

    const rawData = {
      name: formData.get("name")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
    };

    const parsed = profileSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message || "Invalid input",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/my-profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          name: parsed.data.name,
          phone: parsed.data.phone || null,
        }),
      }
    );

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to update profile",
      };
    }

    revalidatePath("/dashboard/profile");

    return {
      success: true,
      message: result.message || "Profile updated successfully",
    };
  } catch (error) {
    console.error(error);
    return { 
        success: false, 
        message: "Something went wrong" 
    };
  }
};
