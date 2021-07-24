import { Express, Request, Response } from 'express';
import passport from 'passport';
import {
  getPhotoGridHandler,
  createPhotoGridHandler,
  updatePhotoGridHandler,
} from './controller/photo-grid.controller';
import { loginHandler, signUpHandler } from './controller/auth.controller';
import { getUploadedPhotosHandler } from './controller/gallery.controller';
import { validateRequest } from './middleware';
import { createPhotoGridSchema, loginSchema, signUpSchema } from './schema';

// Routes
export const routes = (app: Express): void => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // Create a PhotoGrid for user
  app.post(
    '/api/v1/photogrid',
    passport.authenticate('jwt', { session: false }),
    validateRequest(createPhotoGridSchema),
    createPhotoGridHandler
  );

  // Get the photo grid of the user
  app.get(
    '/api/v1/photogrid',
    passport.authenticate('jwt', { session: false }),
    getPhotoGridHandler
  );

  // Get the photo grid of the user
  app.put(
    '/api/v1/photogrid',
    passport.authenticate('jwt', { session: false }),
    validateRequest(createPhotoGridSchema),
    updatePhotoGridHandler
  );

  // User login
  app.post('/api/v1/login', validateRequest(loginSchema), loginHandler);

  // User sign up
  app.post('/api/v1/signup', validateRequest(signUpSchema), signUpHandler);

  // User sign up
  app.get(
    '/api/v1/gallery',
    passport.authenticate('jwt', { session: false }),
    getUploadedPhotosHandler
  );
};
