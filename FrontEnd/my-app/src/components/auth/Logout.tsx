import React from 'react'
import Button from '../Button'
import { signOutAction } from '../../../action/auth/Logout'
import { useRouter } from 'next/navigation'

const Logout = () => {
    const router=useRouter()
    const handelLogout = async() => {
       const res=await signOutAction()
       if(res.redirectPath){
        router.push(res.redirectPath)
       }

    }
  return (
    <div>
      
    <Button
    name="Logout"
    type="submit"
    className="bg-red-600 text-white py-2 px-4 rounded-full"
    onClick={handelLogout}
    />
    </div>
  )
}

export default Logout
