import AddProductForm from '@/components/productsProperts/AddProductForm'
import { cookies } from 'next/headers';
import React from 'react'


const page = async() => {
      const cookieStore = await cookies();
      const token = cookieStore.get('token')?.value; 
  return (
    <div>
      <AddProductForm token={token} />
    </div>
  )
}

export default page
