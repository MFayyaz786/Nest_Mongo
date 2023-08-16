import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {MongooseModule} from "@nestjs/mongoose"
import { AppService } from './app.service';
import { APP_INTERCEPTOR,APP_FILTER } from '@nestjs/core';
import * as dotenv from "dotenv"
import { GlobalExceptionFilter } from './middleware/globelErrorHandler.middleware';
import { AuthModule } from './auth/auth.module';
dotenv.config();
@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE,),AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,{
provide:APP_FILTER,
useClass:GlobalExceptionFilter
  },],
})
export class AppModule {}
