import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import HttpException from '../exceptions/HttpException';
import { fetchImagesFromUrl } from '../service/gallery.service';

// Returns the uploaded photo lis of the logged in user
export const getUploadedPhotosHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const user = get(req, 'user');

    if (!user || !user.email) {
      throw new HttpException(401, 'Unauthorized');
    }

    const gallery = await fetchImagesFromUrl(user.email);

    if (!gallery) {
      return res.sendStatus(404);
    }

    return res.send(gallery);
  } catch (error) {
    next(error);
  }
};
