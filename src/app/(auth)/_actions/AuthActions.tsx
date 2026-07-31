// "use server";

// import jwt, { JwtPayload } from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// type LoginState = {
//   success: true;
//   statusCode: number;
//   message: string;
//   data: {
//     accessToken: string;
//     refreshToken: string;
//   };
// };

// export const loginAction = async (
//   redirectTo: string,
//   prevState: LoginState,
//   formData: FormData,
// ) => {
//   const email = formData.get("email");
//   const password = formData.get("password");

//   const payload = {
//     email,
//     password,
//   };

//   const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });

//   const result = await res.json();

//   if (result.success) {
//     const cookieStore = await cookies();

//     cookieStore.set("accessToken", result.data.accessToken, {
//       httpOnly: true,
//       maxAge: 60 * 60 * 24,
//       sameSite: "lax",
//     });
//     cookieStore.set("refreshToken", result.data.refreshToken, {
//       httpOnly: true,
//       maxAge: 60 * 60 * 24 * 7,
//       sameSite: "lax",
//     });

//     const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

//     //     if(redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")){
//     //         redirect(redirectTo)
//     //     }

//     //     if(decodedToken.role === "TENANT"){
//     //         redirect("/dashboard/tenant");
//     //     } else if (decodedToken.role === "ADMIN"){
//     //         redirect("/dashboard/admin");
//     //     } else if (decodedToken.role === "LANDLORD"){
//     //         redirect("/dashboard/landlord");
//     //     }
//     // }

//     let finalRedirect = "/";

//     if (
//       redirectTo &&
//       redirectTo.startsWith("/") &&
//       !redirectTo.startsWith("//")
//     ) {
//       finalRedirect = redirectTo;
//     } else {
//       switch (decodedToken.role) {
//         case "TENANT":
//           finalRedirect = "/dashboard/tenant";
//           break;

//         case "LANDLORD":
//           finalRedirect = "/dashboard/landlord";
//           break;

//         case "ADMIN":
//           finalRedirect = "/dashboard/admin";
//           break;

//         default:
//           finalRedirect = "/";
//       }
//     }
//   }

//   return {
//     ...result,
//     finalRedirect,
//   };
// };





"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
  redirectTo?: string;
};

export const loginAction = async (
  redirectTo: string,
  prevState: LoginState | false,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!result.success) {
    return result;
  }

  const cookieStore = await cookies();

  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    path: "/",
  });

  const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;


  console.log("🔍 DEBUG decodedToken:", decodedToken); // 👈 temporary
console.log("🔍 DEBUG redirectTo param:", redirectTo);


  let finalRedirect = "/";

  if (
    redirectTo &&
    redirectTo.startsWith("/") &&
    !redirectTo.startsWith("//")
  ) {
    finalRedirect = redirectTo;
  };

  if (!redirectTo) {
    switch (decodedToken.role) {
      case "TENANT":
        finalRedirect = "/dashboard/tenant";
        break;
      case "LANDLORD":
        finalRedirect = "/dashboard/landlord";
        break;

      case "ADMIN":
        finalRedirect = "/dashboard/admin";
        break;

      default:
        finalRedirect = "/";
    }
  }

  console.log("🔍 DEBUG finalRedirect:", finalRedirect);

  return {
    ...result,
    redirectTo: finalRedirect,
  };
};