"use client"
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import Button from '../Button'
import Logout from './Logout'

const UserProfile = () => {
const user =Cookies.get("user")
const[open,setOpen]=useState<boolean>(false)
return (
    <div >
<Button
 name="Profile"
 type="button"
 onClick={() => setOpen((prev) => !prev)}
 className="bg-transparent text-black "


/>
{
open ? (
    <>
    <p>hello {user}</p> 
   
    </>

) 
:null
}
   




    </div>
  )
}

export default UserProfile
