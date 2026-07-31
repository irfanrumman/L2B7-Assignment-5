export const getAllProperties = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties`,
      {
        next: {
          revalidate: 60, // 1 minute cache
        },
      }
    );

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch properties",
        data: [],
      };
    }

    return {
      success: true,
      data: result.data.data, // properties array
      meta: result.data.meta,
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