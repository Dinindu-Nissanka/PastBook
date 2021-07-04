import config from 'config';
import Logger from './utils/logger';
import { app } from './app';
import connect from './db/connect';

const port = config.get('app.port') as number;
const host = config.get('app.host') as string;

app.listen(port, host, () => {
  Logger.info(`Server listing at http://${host}:${port}`);
  connect();
});
