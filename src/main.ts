import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import * as morgan from "morgan";
import * as dotenv from "dotenv"
import * as bodyParser from "body-parser"
import logger from './middleware/logger.middleware';
async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.use(morgan("dev"))
  app.use(bodyParser.json());
  app.use(logger)
  app.use("/",(req:Request,res:Response,next:Function)=>{
    console.log(`Route Called ${req.originalUrl}`);
    next();
  })
  console.log(process.env.PORT)
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
