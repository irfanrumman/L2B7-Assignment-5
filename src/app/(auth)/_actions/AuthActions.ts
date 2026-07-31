
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

  

  return {
    ...result,
    redirectTo: finalRedirect,
  };
};






type RegisterState = {
  success: boolean;
  message: string;
  errorDetails?: unknown;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
  redirectTo?: string;
};

export const registerAction = async (
  redirectTo: string,
  prevState: RegisterState | false,
  formData: FormData
) => {
  const name = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

   const payload = {
    name,
    email,
    password,
    role,
  };

  // ধাপ ১ — Register কল করো
  const registerRes = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const registerResult = await registerRes.json();

  if (!registerResult.success) {
    return registerResult; // register e error, ekhanei thamo
  }

  // ধাপ ২ — Register success hole, shei email/password diyei server-side e login kore felo
  const loginPayload = {
    email,
    password,
  };
  const loginRes = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  });

  const loginResult = await loginRes.json();

  if (!loginResult.success) {
    // Register hoyeche, kintu auto-login e kono karone fail — user ke manually login korte bolo
    return {
      success: true,
      message: "Account created! Please log in.",
    };
  }

  // ধাপ ৩ — Login এর মতোই cookie set করো
  const cookieStore = await cookies();

  cookieStore.set("accessToken", loginResult.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  cookieStore.set("refreshToken", loginResult.data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  const decodedToken = jwt.decode(loginResult.data.accessToken) as JwtPayload;

  let finalRedirect = "/";
  // switch (decodedToken.role) {
  //   case "TENANT":
  //     finalRedirect = "/dashboard/tenant";
  //     break;
  //   case "LANDLORD":
  //     finalRedirect = "/dashboard/landlord";
  //     break;
  //   case "ADMIN":
  //     finalRedirect = "/dashboard/admin";
  //     break;
  // }

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


  return {
    ...loginResult,
    message: "Account created and logged in successfully!",
    redirectTo: finalRedirect,
  };
};