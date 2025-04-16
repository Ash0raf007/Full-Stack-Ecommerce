import React from 'react'
import Image from 'next/image'
import ClientComponent from '@/components/ClientComponent'
import Logout from '@/components/Logout'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/nextAuth'

const page =async () => {
  const session=await getServerSession(authOptions)
  console.log(session) 
   return (
    <div>{
      session && 
      
      (
        <div>
          <p>Server side data</p>
          <p>      {session?.user?.name}      </p>
          <p>      {session?.user?.email}      </p>
          <Image src={session.user?.image as string}
          alt='userimg'
          width={100}
          height={100}
          />
          <Logout/>
    
          </div>
    
      )
    }
    
    {/* show same data in client side */}
    <ClientComponent/>
    </div>
  )
}

export default page