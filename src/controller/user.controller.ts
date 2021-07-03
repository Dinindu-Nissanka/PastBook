import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import HttpException from '../exceptions/HttpException';
import { fetchUploadedImages } from '../service/user.service';

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

    const photoGrid = await fetchUploadedImages(user.email);

    if (!photoGrid) {
      return res.sendStatus(404);
    }

    return res.send(photoGrid);
  } catch (error) {
    next(error);
  }
};
