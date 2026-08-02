"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CategoryItem } from "@/lib/types";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken ? { Cookie: `accessToken=${accessToken}` } : null;
};

type GetCategoriesResult =
  | { success: true; data: CategoryItem[] }
  | { success: false; message: string; data: [] };

export const getCategoriesAction = async (): Promise<GetCategoriesResult> => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      cache: "no-store",
    });
    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to fetch categories", data: [] };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", data: [] };
  }
};

export const createCategoryAction = async (
  prevState: { success: boolean; message: string },
  formData: FormData
) => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized" };
    }

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories/create`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to create category" };
    }

    revalidatePath("/dashboard/admin/categories");
    return { success: true, message: result.message || "Category created successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const updateCategoryAction = async (
  categoryId: string,
  prevState: { success: boolean; message: string },
  formData: FormData
) => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized" };
    }

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories/${categoryId}`, {
      method: "PATCH",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to update category" };
    }

    revalidatePath("/dashboard/admin/categories");
    return { success: true, message: result.message || "Category updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const deleteCategoryAction = async (categoryId: string) => {
  try {
    const headers = await getAuthHeader();
    if (!headers) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories/delete/${categoryId}`, {
      method: "DELETE",
      headers,
    });

    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message || "Failed to delete category" };
    }

    revalidatePath("/dashboard/admin/categories");
    return { success: true, message: result.message || "Category deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};