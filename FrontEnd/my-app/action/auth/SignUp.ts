'use server';

import { signUp } from "@/lib/axios";
import { SignUpDataType } from "@/types/SignDataType";

interface SignUpResponse {
  error?: string;
  message?: string;
}

export const signUpAction = async (formData:SignUpDataType): Promise<SignUpResponse> => {


  try {
    const user = await signUp(formData);
    console.log(user.data, "user data");
    const success=user?.data.message || "Signup successful!";
    return {
      message:success
    }

     
  } catch (error: any) {
    console.error("Signup error:", error);

    const errorMessage =
      error?.response?.data?.message || error?.message || "Something went wrong";

    return {
      error: errorMessage
    };
  }
};
