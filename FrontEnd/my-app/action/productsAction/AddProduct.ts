"use server";

import { addProduct } from "@/lib/axios";
import { ProductForm } from "@/types/allProduct";
import { revalidatePath } from "next/cache";

export const addProductAction= async (formData:ProductForm,token:string) => {
  try {
    await addProduct(formData,token);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error Adding product:", error);
    return { success: false, message: "Error adding product" };
  }
};