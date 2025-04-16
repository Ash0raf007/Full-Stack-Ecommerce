"use client";
import React, { useState } from "react";
import { addProductAction } from "../../../action/productsAction/AddProduct";
import Input from "../Input";

type tokenType = {
  token: string | undefined;
};

const AddProductForm = ({ token }: tokenType) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    rating: 0,
    reviews: 0,
    stock: 0,
    brand: "",
    discount: 0,
    inStock: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("Token is missing.");
      return;
    }

    setLoading(true);
    try {
      const res = await addProductAction(formData, token);
      console.log(res, "response");
      setSuccess("Product added successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        rating: 0,
        reviews: 0,
        stock: 0,
        brand: "",
        discount: 0,
        inStock: false,
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-4 mt-4 px-[20px] text-blue-300">Add Product</h3>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full flex flex-col gap-4"
      >
        <Input
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product name"
          required
        />
        <Input
          label="Description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product description"
          required
        />
        <Input
          label="Price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          required
        />
        {/* <Input
          label="Image URL"
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
        /> */}
        <Input
          label="Category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <Input
          label="Rating"
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="0"
        />
        <Input
          label="Reviews"
          type="number"
          name="reviews"
          value={formData.reviews}
          onChange={handleChange}
          placeholder="0"
        />
        <Input
          label="Stock"
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="0"
          required
        />
        <Input
          label="Brand"
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />
        <Input
          label="Discount (%)"
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="0"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleCheckboxChange}
            id="inStock"
          />
          <label htmlFor="inStock" className="text-sm text-gray-700">
            In Stock
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
