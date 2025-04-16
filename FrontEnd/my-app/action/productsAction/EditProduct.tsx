"use server";

import { editProduct } from "@/lib/axios";
import {  ProductForm } from "@/types/allProduct";
import { revalidatePath } from "next/cache";

export const editProductAction= async (formData:ProductForm,token:string,ID:string) => {
  try {
    await editProduct(formData,token,ID);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error Adding product:", error);
    return { success: false, message: "Error adding product" };
  }
};