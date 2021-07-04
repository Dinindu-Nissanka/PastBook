import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';
import { ValidationException } from '../exceptions';

const validate =
  (schema: AnySchema) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (e: any) {
      Logger.error(e);
      return next(new ValidationException('Validation failed', e.errors));
    }
  };

export default validate;
