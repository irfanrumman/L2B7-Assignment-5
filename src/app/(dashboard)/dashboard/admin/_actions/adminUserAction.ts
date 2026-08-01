"use server";

import { cookies } from "next/headers";
import { AdminUserListItem, PaginationMeta } from "@/lib/types";
import { revalidatePath } from "next/cache";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken ? { Cookie: `accessToken=${accessToken}` } : null;
};

type GetAdminUsersResult =
  | { success: true; data: AdminUserListItem[]; meta: PaginationMeta }
  | { success: false; message: string; data: []; meta: null };

export const getAdminUsersAction = async (page: number = 1): Promise<GetAdminUsersResult> => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized", data: [], meta: null };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users?page=${page}&limit=10`,
      {
        headers,
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to fetch users", data: [], meta: null };
    }

    return { success: true, data: result.data.data, meta: result.data.meta };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: [], meta: null };
  }
};

export const toggleUserStatusAction = async (
  userId: string,
  newStatus: "ACTIVE" | "BANNED"
) => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to update user status" };
    }

    revalidatePath("/dashboard/admin/users");

    return { success: true, message: result.message };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};