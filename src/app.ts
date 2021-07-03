import express from 'express';
import config from 'config';
import connect from './db/connect';
import passport from 'passport';
import { routes } from './routes';
import morganMiddleware from './middleware/logger.middleware';
import Logger from './utils/logger';
import { applyPassportStrategy } from './utils/passport';
import { errorHandlerMiddleware } from './middleware/error.middleware';

const port = config.get('app.port') as number;
const host = config.get('app.host') as string;

const app = express();
applyPassportStrategy(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware);
routes(app);
app.use(errorHandlerMiddleware);

app.listen(port, host, () => {
  Logger.info(`Server listing at http://${host}:${port}`);
  connect();
});
