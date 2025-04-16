"use client";
import { Product } from "@/types/allProduct";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { FaEdit } from "react-icons/fa";
import AddToCart from "./AddToCart";

type ProductsProps = {
  products: Product[];
  token: string;
  role: string;
};

const Products = ({ products, token, role }: ProductsProps) => {
  const [open, setOpen] = React.useState<boolean | string | null>(false);

  return (
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
  {products.map((product) => (
    <div
      key={product?._id}
      className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/products/${product?._id}`}>
        {product?.image ? (
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </Link>

      <div className="flex-1 flex flex-col justify-between p-4 gap-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        </div>

        <div className="text-sm text-gray-500 space-y-1 mt-2">
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Rating:</strong> {product.rating}</p>
          <p><strong>Reviews:</strong> {product.reviews}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p className={product.inStock ? "text-green-600" : "text-red-500"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
          <p className="text-lg font-bold text-black">Price: ${product.price}</p>
        </div>

        {role === "admin" && (
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() =>
                setOpen(open === product._id ? null : product._id)
              }
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaEdit className="text-xl" />
            </button>

            <DeleteProduct ID={product._id} token={token} />
          </div>
        )}

        {open === product?._id && role === "admin" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10">
            <EditProduct
              ID={product._id}
              data={product}
              setOpen={setOpen}
              token={token}
            />
          </div>
        )}

        {role === "user" && (
          <div className="mt-4">
            <AddToCart
              id={product._id}
              name={product.name}
              description={product.description}
              image={product.image}
              price={product.price}
            />
          </div>
        )}
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Products;
