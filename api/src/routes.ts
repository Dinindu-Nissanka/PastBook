import { Express, Request, Response } from 'express';
import passport from 'passport';
import {
  getPhotoGridHandler,
  createPhotoGridHandler,
} from './controller/photo-grid.controller';
import { loginHandler, signUpHandler } from './controller/auth.controller';
import { getUploadedPhotosHandler } from './controller/user.controller';
import { validateRequest } from './middleware';
import { createPhotoGridSchema, loginSchema, signUpSchema } from './schema';

// Routes
export const routes = (app: Express): void => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // Create a PhotoGrid for user
  app.post(
    '/api/photogrid',
    passport.authenticate('jwt', { session: false }),
    validateRequest(createPhotoGridSchema),
    createPhotoGridHandler
  );

  // Get the photo grid of the user
  app.get(
    '/api/photogrid',
    passport.authenticate('jwt', { session: false }),
    getPhotoGridHandler
  );

  // User login
  app.post('/api/login', validateRequest(loginSchema), loginHandler);

  // User sign up
  app.post('/api/signup', validateRequest(signUpSchema), signUpHandler);

  // User sign up
  app.get(
    '/api/uploaded-images',
    passport.authenticate('jwt', { session: false }),
    getUploadedPhotosHandler
  );
};
