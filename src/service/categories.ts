"use server";

export const getCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/categories`,
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
        message: result.message || "Failed to fetch categories",
        data: [],
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};