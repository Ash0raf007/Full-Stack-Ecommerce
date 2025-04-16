"use server";

import {  deleteProduct } from "@/lib/axios";
import { revalidatePath } from "next/cache";

export const deleteProductAction= async (token:string,id:string) => {
  try {
   const res= await deleteProduct(token,id);
    revalidatePath("/");
    return { success: true, message: "product deleted" };
  } catch (error) {
    console.error("Error Adding product:", error);
    return { success: false, message: "Error delete product" };
  }
};