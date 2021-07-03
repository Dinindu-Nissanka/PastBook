import HttpException from '../exceptions/HttpException';
import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';

export const errorHandlerMiddleware = (
  exception: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = exception.statusCode || exception.status || 500;
  const message = exception.message || 'Something went wrong';
  const errors = exception.errors;

  Logger.error(errors);

  response.status(status).send({
    status,
    message,
    errors,
  });
};
