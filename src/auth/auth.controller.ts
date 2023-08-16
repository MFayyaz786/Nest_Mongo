import { Controller, Get, Param, Body, Post,Req, Delete, Query, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { Auth } from './auth.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}
@Post()
async signUp(@Res() res,@Body() authData:Auth):Promise<Auth>{
    const result=await this.authService.signUp(authData);
    return res.status(HttpStatus.OK).send({msg:"Registered successfully"})
}
@Post('login')
async singIn(@Res() res,@Req() req,@Body() signInData):Promise<Auth>{
    const user=await this.authService.signIn(signInData.email);
    if(user){
     const validatePassword = await this.authService.validatePassword(signInData.password, user.password);
      if (validatePassword) {
        delete user.password;
      return  res.status(200).send({
          msg: "Login Successfully",
          data: user,
        });
      } else {
        res.status(401).send({
          msg: "Invalid Credentials!",
        });
      }
    } else {
     return res.status(401).send({
        msg: "Invalid Credentials!",
      });
    }
}

@Post('requestOtp')
async requestOtp(@Req() req,@Res() res,@Body() credential:{email:String}):Promise<Auth>{
  const result=await this.authService.requestOtp(credential.email);
  if(!result){
  return res.status(HttpStatus.BAD_REQUEST).json({msg:"Otp Not Sent!"})
  }
  return res.status(HttpStatus.OK).json({msg:"Otp Sent"})
}
}
