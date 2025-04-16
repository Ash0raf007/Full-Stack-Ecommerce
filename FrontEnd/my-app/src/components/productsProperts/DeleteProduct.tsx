"use client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import Button from "../Button";
import { deleteProductAction } from "../../../action/productsAction/DeleteProduct";

type DeleteProductProps = {
  token: string | undefined;
  ID: string;
};
const DeleteProduct = ({ token, ID }: DeleteProductProps) => {
  const handleDelete = async () => {
    try {
      if (!token) {
        console.error("Token is undefined");
        return;
      }
      const res = await deleteProductAction(token, ID);
      console.log(res, "res");
      if (res.success) {
        console.log("Product deleted successfully");
        
      } else {
        console.error("Failed to delete product:", res.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div>
      <button
        name="Sign Up"
        onClick={handleDelete}
        className="w-full  rounded hover:bg-blue-600 transition mb-[10px]"
      >
        <FaTrash className="text-red-600 text-[20px]" />
      </button>
    </div>
  );
};

export default DeleteProduct;
