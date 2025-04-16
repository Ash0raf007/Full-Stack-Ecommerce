'use server';
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface SignOutResponse {
  error?: string;
  redirectPath?: string;
}

export const signOutAction = async (): Promise<SignOutResponse> => {
  let redirectPath

  try {

    const cookieStore = await cookies();
    cookieStore.delete('token');
    cookieStore.delete('refreshToken');
    cookieStore.delete('role');
    cookieStore.delete('user')
revalidatePath("/")    
    return {
      redirectPath: "/auth/login",
    };

  } catch (error: any) {
    console.error("Signup error:", error);

    const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";

    return {
      error: errorMessage,
    };
  }
};
