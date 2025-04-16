import { ProductForm } from "@/types/allProduct"
import { SignInDataType, SignUpDataType } from "@/types/SignDataType"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  timeout: 50000,
})

export async function signUp(formData: SignUpDataType) {
  return await axiosInstance.post(`/api/auth/register`, formData 
  )}

export async function login(formData: SignInDataType){
  return await axiosInstance.post(`/api/auth/login`, formData 
  )}


  
export async function allProducts() {
    return await axiosInstance.get(`/api/products`)
  }

export async function singleProduct(id: string) {
    return await axiosInstance.get(`/api/products/${id}`)
  }
  
export async function addProduct(formData:ProductForm , token: string) {
    return await axiosInstance.post(`/api/products/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  export async function editProduct(formData:ProductForm , token: string, id: string) {
    return await axiosInstance.put(`/api/products/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
   
 export async function deleteProduct( token: string, id: string) {
    return await axiosInstance.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }    


