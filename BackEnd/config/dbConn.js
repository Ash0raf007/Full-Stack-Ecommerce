import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const MONGO_URL = process.env.DATABASE_URL

   export const dbConnect=async()=>{
        try {
             await mongoose.connect(MONGO_URL);
             console.log("MongoDB connected successfully");
        } catch (error) {
             console.error("MongoDB connection error:", error.message);
        }
   }
   