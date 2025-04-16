"use client";
import { Product } from "@/types/allProduct";
import React, { useState } from "react";
import { editProductAction } from "../../../action/productsAction/EditProduct";
import Input from "../Input";
import Button from "../Button";

const EditProduct = ({
  ID,
  data,
  setOpen,
  token,
}: {
  ID: string;
  data: Product;
  setOpen: React.Dispatch<React.SetStateAction<boolean | string | null>>;
  token: string | undefined;
}) => {
  const [formData, setFormData] = useState({
    name: data.name || "",
    description: data.description || "",
    image: data.image || "",
    price: data.price || 0,
    rating: data.rating || 0,
    reviews: data.reviews || 0,
    stock: data.stock || 0,
    category: data.category || "",
    brand: data.brand || "",
    inStock: data.inStock || false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | number | boolean = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      newValue = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      console.error("Token is undefined");
      return;
    }
    try {
      const res = await editProductAction(formData, token, ID);
      console.log("Updated Data:", res);
      setOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" />
        <Input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <Input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
        <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
        <Input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" />
        <Input type="number" name="reviews" value={formData.reviews} onChange={handleChange} placeholder="Reviews Count" />
        <Input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock Quantity" />
        <Input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
        <Input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" />

        <div className="flex items-center gap-3">
          <label htmlFor="inStock" className="text-sm font-medium text-gray-700">In Stock</label>
          <input
            id="inStock"
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button name="Save" type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" />
          <Button name="Cancel" type="button" onClick={() => setOpen(false)} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600" />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
