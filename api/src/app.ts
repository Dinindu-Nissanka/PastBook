import express from 'express';
import passport from 'passport';
import { routes } from './routes';
import morganMiddleware from './middleware/logger.middleware';
import { applyPassportStrategy } from './utils/passport';
import { errorHandlerMiddleware } from './middleware/error.middleware';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './docs/swagger.json';

const app = express();
applyPassportStrategy(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware);
routes(app);
app.use(errorHandlerMiddleware);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { app };
