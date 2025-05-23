"use client";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { signUpAction } from "../../../action/auth/SignUp";
import { toast } from "react-toastify";
import { signUpSchema } from "@/lib/validation/signUpSchema ";
import { z } from "zod";

const SignupForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [sucess, setSucess] = useState<string | null>(null);
  const[show,setShow]=useState<boolean>(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };   



  const handleSubmit = async (e: React.FormEvent) => {
setError("")
setSucess("")
    e.preventDefault();

// zod validation logic
    try {
          signUpSchema.parse(formData); 
        } catch (err) {
          if (err instanceof z.ZodError) {
            setError(err.errors[0].message);
            return;
          }
        }
    // ///////////////////////////
        console.log(formData); 


    const res= await signUpAction(formData)
 console.log(res,"test")
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success(res.message || "Signup successful!")
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <div className="mb-4 space-y-4">
          <Input
            label="First Name"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
          <Input
            label="Last Name"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
<div className="relative w-full">
  <Input
    label="Password"
    type={show ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Enter your password"
  />
  <button
    type="button"
    onClick={() => setShow(prev => !prev)}
    className="absolute right-3 top-13 cursor-pointer transform -translate-y-1/2 text-sm text-blue-500"
  >
    {show ? "Hide" : "Show"}
  </button>
</div>

        </div>
        <Button
          name="Sign Up"
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mb-[10px]"
        />
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        {sucess && (
          <div className="text-green-500 text-sm mb-4">
            {sucess}
          </div>
        )}
        <span className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
        </span>
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
