"use server";

type searchParams = {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
  search?: string;
  isAvailable?: string;
  page?: string;
  limit?: string;
};

export const getPropertiesAction = async (params: searchParams) => {
  try {
    const searchParams = new URLSearchParams();

    if (params.categoryId) searchParams.set("categoryId", String(params.categoryId));
    if (params.isAvailable) searchParams.set("isAvailable", String(params.isAvailable));
    if (params.limit) searchParams.set("limit", String(params.limit));
    if (params.search) searchParams.set("search", params.search);
    if (params.minPrice) searchParams.set("minPrice", String(params.minPrice));
    if (params.maxPrice) searchParams.set("maxPrice", String(params.maxPrice));
    if (params.page) searchParams.set("page", String(params.page));
    if (params.location) searchParams.set("location", params.location);

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties?${searchParams.toString()}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch properties",
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

    return {
      success: false,
      message: "Something went wrong",
      data: [],
      meta: null,
    };
  }
};