import DeleteProduct from "@/components/productsProperts/DeleteProduct";
import EditProduct from "@/components/productsProperts/EditProduct";
import Products from "@/components/productsProperts/Products";
import { allProducts } from "@/lib/axios";
import { Product } from "@/types/allProduct";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";


const page = async () => {

  const cookieStore = await cookies();
  const role = cookieStore?.get("role")?.value;
  const token = cookieStore?.get("token")?.value;
  if (!token || !role) {
    console.log("Token is undefined");
    return;
  }

  const res = await allProducts()
  console.log(res)
  const products:Product[] = res.data
  console.log(products)

  return (
    <div>

{role === "admin" && (
        <div className="flex justify-end px-[10px] mt-[20px]">
          <Link
            href="/products/add-product"
            className="bg-blue-500 text-white px-2 py-2 rounded mt-[10px]"
          >
            Add Product
          </Link>
        </div>
      )}
<Products products={products} token={token} role={role}/>

    </div>
  );
};

export default page;
