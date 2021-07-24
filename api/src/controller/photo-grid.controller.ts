import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import HttpException from '../exceptions/HttpException';
import {
  findPhotoGrid,
  updatePhotoGrid,
  createPhotoGrid,
} from '../service/photo-grid.service';

// Returns the photo grid of the requested user
export const getPhotoGridHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = get(req, 'user');

  if (!user || !user.email) {
    throw new HttpException(401, 'Unauthorized');
  }

  const photoGrid = await findPhotoGrid(user.email);

  if (!photoGrid) {
    return res.sendStatus(404);
  }

  return res.send(photoGrid);
};

// Create photo grid in the database
export const createPhotoGridHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const user = get(req, 'user');

    if (!user || !user.email) {
      throw new HttpException(401, 'Unauthorized');
    }

    const body = req.body;
    const photoGrid = await createPhotoGrid(user.email, { ...body });
    return res.send(photoGrid);
  } catch (e) {
    next(e);
  }
};

// Update photo grid in the database
export const updatePhotoGridHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const user = get(req, 'user');

    if (!user || !user.email) {
      throw new HttpException(401, 'Unauthorized');
    }

    const body = req.body;
    const photoGrid = await updatePhotoGrid(user.email, { ...body });
    return res.send(photoGrid);
  } catch (e) {
    next(e);
  }
};
