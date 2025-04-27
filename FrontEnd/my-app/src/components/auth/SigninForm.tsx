"use client";
import Link from "next/link";
import React, { useState } from "react";
import Input from "../Input";
import { signInAction } from "../../../action/auth/SignIn";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";
import { signinSchema } from "@/lib/validation/signinSchema";

const SigninForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [sucess, setSucess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSucess("");

    try {
      signinSchema.parse(formData); 
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        return;
      }
    }

    console.log(formData); 

    const res = await signInAction(formData);
    console.log(res, "test");
    if (res.error) {
      toast.error(res.error);
      return;
    }
    console.log(res.redirectPath, "redirectPath");
    toast.success(res.message || "Sign successful!");
    if (res.redirectPath) {
      router.push(res.redirectPath);
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <div className="mb-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
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
      </form>
      <span className="mt-4 text-sm text-gray-900">Don't have an account? </span>
      <Link href="/auth/signup" className="text-blue-500 hover:underline">
        Sign Up
      </Link>
    </div>
  );
};

export default SigninForm;
