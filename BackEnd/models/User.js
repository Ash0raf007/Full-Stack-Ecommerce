import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
    first_name:{
        type:String,

        required:true,
        trim:true
    },
    last_name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },  
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
},
{
    timestamps:true
})


const User = mongoose.model('user', userSchema);
export default User;
