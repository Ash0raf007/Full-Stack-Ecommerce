import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Link href="/products" className='text-3xl decoration-1 hover:text-red-400'>Browes all products</Link>
    </div>
  )
}

export default page

