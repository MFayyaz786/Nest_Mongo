import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import * as uc from "upper-case-first";


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msg = exception.message;
      console.log("exception",exception.message)
    } else if (exception instanceof MongooseError) {
      status = HttpStatus.BAD_REQUEST; // You can customize this based on your needs
      msg = exception.message;
    }else if(exception['code'] === 11000){
        status=HttpStatus.BAD_REQUEST;
        let errorKey = Object.keys(exception["keyPattern"]).toString();
        errorKey = uc.upperCaseFirst(errorKey);
        msg=`${errorKey} already exists`
    }
    response.status(status).json({
      statusCode: status,
      path: request.url,
      msg: msg,
    });
  }
}
