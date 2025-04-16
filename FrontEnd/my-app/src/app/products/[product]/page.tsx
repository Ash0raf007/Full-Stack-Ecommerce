import { singleProduct } from '@/lib/axios';
import { Product } from '@/types/allProduct';
import React from 'react'

type ProductParams = Promise<{
  product: string;
}>;
const Page = async (props: { params: ProductParams }) => {
  const params = await props.params;
  const productid = params?.product;
  let data: Product | null = null;
try{
const product =await singleProduct(productid)
 data =product.data
console.log(product,"sq")
}catch(error){
  console.error(error);
}
  return (
    <div className='flex items-center justify-center '>
      <div className="bg-slate-100 max-w-[700px] p-2 rounded-xl flex flex-col items-center mt-[20px]">
      <div className="flex justify-center items-center">
      </div>
        <hr className="w-full" />
        <h2>{data?.name}</h2>
        <hr className='w-full' />
        <p className='w-[220px]'>{data?.description}</p>
        <hr className='w-full' />
        <p>Price: {data?.price.toFixed(2)}</p>
        <p>Rating : {data?.rating} ⭐</p>
        <p>Stock :{data?.stock} </p>
      </div>
    </div>
  )
}

export default Page