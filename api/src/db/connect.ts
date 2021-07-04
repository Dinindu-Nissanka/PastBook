import mongoose from 'mongoose';
import config from 'config';
import Logger from '../utils/logger';

const connect = async (): Promise<void> => {
  const dbUri = config.get('db.uri') as string;

  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      Logger.info('Database connected');
    })
    .catch((error) => {
      Logger.error('db error', error);
      process.exit(1);
    });
};

export default connect;
