"use server";

// export const getAllPropertiesAction = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.BACKEND_API_URL}/api/properties`,
//       {
//         next: {
//           revalidate: 60, // 1 minute cache
//         },
//       }
//     );

//     const result = await res.json();

//     if (!result.success) {
//       return {
//         success: false,
//         message: result.message || "Failed to fetch properties",
//         data: [],
//       };
//     }

//     return {
//       success: true,
//       data: result.data.data, // properties array
//       meta: result.data.meta,
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       success: false,
//       message: "Something went wrong",
//       data: [],
//     };
//   }
// };


export const getAllPropertiesAction = async () => {
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


export const getFeaturedPropertiesAction = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch properties");
    }

    return result.data.data;
  } catch (error) {
    console.error("Failed to fetch featured properties:", error);

    return [];
  }
};



export const searchPropertiesAction = async (
  location?: string,
  page: number = 1,
  limit: number = 8
) => {
  try {
    const params = new URLSearchParams();

    if (location) {
      params.set("location", location);
    }

    params.set("page", page.toString());
    params.set("limit", limit.toString());

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  } catch (error) {
    console.error(error);

    return {
      meta: {
        page: 1,
        limit: 8,
        total: 0,
        totalPages: 0,
      },
      data: [],
    };
  }
};



export const getPropertyByIdAction = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties/${id}`,
      {
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  } catch (error) {
    console.error(error);

    return null;
  }
};