import { allProducts } from '@/lib/axios'
import { Product } from '@/types/allProduct'
import Image from 'next/image'
import React from 'react'

const page = async() => {
  const res = await allProducts()
  console.log(res)
  const products:Product[] = res.data
  console.log(products)


  return (
    <div>
      <div>
      {
        products.map((product) => {
          return (
            <div key={product._id} className='flex items-center justify-center'>
              <h1>{product.name}</h1>
              <p>{product.category}</p>
              <p>{product.brand}</p>
              <p>{product.rating}</p>
              <p>{product.reviews}</p>
              <p>{product.stock}</p>
              <p>{product.discount}</p>
              <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <Image src={product.image} alt={product.name} width={200} height={200} />
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default page
