'use server';

import { login } from "@/lib/axios";
import { SignInDataType } from "@/types/SignDataType";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

interface SignUpResponse {
  error?: string;
  message?: string;
  token?: string;
  refreshToken?: string;
  redirectPath?: string;
  role?: string;
  user?:string
}

export const signInAction = async (formData: SignInDataType): Promise<SignUpResponse> => {
  let redirectPath, token, refreshToken, role,username;

  try {
    const user = await login(formData);

    console.log(user.data, "user data");
    const success = user?.data.message || "Signup successful!";
    token = user?.data.token;
    refreshToken = user?.data.refreshToken;
    role = user?.data.role ; // Default to 'user' if role is not provided
     username = user.data.user;
    const cookieOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict' as const, // Ensure 'strict' is treated as a valid value
      path: '/',
    };

    const decoded = jwtDecode(user?.data?.token);

    // Await the cookies to resolve before calling .set
    const cookieStore = await cookies();

    cookieStore.set('token', token);
    cookieStore.set('refreshToken', refreshToken, cookieOption);
    cookieStore.set('role', role, cookieOption);
    cookieStore.set('user', username);

    return {
      message: success,
      token: token,
      refreshToken: refreshToken,
      redirectPath: "/products",
    };

  } catch (error: any) {
    console.error("Signup error:", error);

    const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";

    return {
      error: errorMessage,
    };
  }
};
