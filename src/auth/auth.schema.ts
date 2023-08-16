import * as mongoose from "mongoose"
export const AuthSchema=new mongoose.Schema  ({
   name:String,
   email:{type:String,unique:true,required:true},
   password:String,
   contact:Number,
   otp:{type:Number,default:null},
   otpExpire:{type:Date,default:null},
});
export  interface Auth extends Document{
     name:string,
     email:string,
     password:string,
     contact:number,
     otp:number,
     otpExpire:Date

}