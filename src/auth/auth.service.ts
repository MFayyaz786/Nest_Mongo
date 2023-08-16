import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from "mongoose"
import { Auth } from './auth.schema';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService{
    constructor(@InjectModel('Auth') private readonly authModel:Model<Auth & Document>){}
    async signUp(authData:Auth):Promise<Auth>{
        const salt=await bcrypt.genSalt(10);
        authData.password=await bcrypt.hash(authData.password,salt);
    const result= new this.authModel(authData);
    return await result.save()
    }

    async signIn(email:String):Promise<Auth>{
    return await this.authModel.findOne({email:email},{__v:0,contact:0}).lean();
    }

    async validatePassword(password:string, realPassword:string):Promise<Auth>{
    console.log(password, realPassword);
    const valid = await bcrypt.compare(password, realPassword);
    console.log("valid: ", valid);
    return valid;
  }

  async requestOtp(email:String):Promise<Auth>{
    return await this.authModel.findOneAndUpdate({email:email},{otp:1111})
  }
}