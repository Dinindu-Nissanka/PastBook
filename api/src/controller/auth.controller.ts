import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import jwt from 'jsonwebtoken';
import config from 'config';
import HttpException from '../exceptions/HttpException';
import User, { IUser } from '../model/user.model';
import { createUser } from '../service/user.service';

// handles the user login and returns the jwt token
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, password } = get(req, 'body');

  try {
    const user: IUser | null = await User.findOne({ email });
    if (user && user.email) {
      const isPasswordMatched = await user.comparePassword(password);

      if (!isPasswordMatched) {
        throw new HttpException(403, 'Incorrect username or password');
      }
      // Sign token
      const token = jwt.sign({ email }, config.get('jwt.privateKey'), {
        expiresIn: 1000000,
      });

      res.status(200).json({ email, name: user.name, ...{ token } });
    } else {
      throw new HttpException(403, 'User not found');
    }
  } catch (e) {
    next(e);
  }
};

// handles the user sign up and returns the jwt token
export const signUpHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, password, name } = get(req, 'body');

  try {
    const user = await User.findOne({ email });
    if (!user) {
      createUser({
        email: email,
        password: password,
        name: name,
      });
      // Sign token
      const token = jwt.sign({ email }, config.get('jwt.privateKey'), {
        expiresIn: 10000000,
      });
      res.status(201).json({ name, email, ...{ token } });
    } else {
      throw new HttpException(403, 'User already exists with the given email');
    }
  } catch (e) {
    next(e);
  }
};
