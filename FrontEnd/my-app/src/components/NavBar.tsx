'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { useCartDetails } from './productsProperts/TotalAmount'
import Cookies from 'js-cookie'

import Logout from './auth/Logout'

const NavBar = () => {
  const { totalQuantity} = useCartDetails();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      setUser(cookieUser);
    }
  }, []);


  return (
    <div>
      <div className="flex justify-between px-[20px] mt-[10px] items-center">
      <div className='flex items-center gap-[20px] justify-center'>
      <Link href="/products" className="text-[30px] font-bold">
     E-Store
        </Link>
        <p className='text-[17px] text-gray-800 font-semibold'>Hello 👋 {user} </p> 

      </div>
    
        <div className='flex items-center gap-[10px]'>
        <Logout/>
        <Link href="/products/cart" className="relative flex items-center gap-2">
          <MdShoppingCart className="text-[40px] rounded-2xl border-2 p-[5px]" />
          <span className="text-sm font-semibold">({totalQuantity})</span>
        </Link>
        </div>
  
      </div>
    </div>
  )
}

export default NavBar
