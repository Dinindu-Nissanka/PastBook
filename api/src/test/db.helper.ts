import mongoose from 'mongoose';
import config from 'config';

/**
 * Connect to the in-memory database.
 */
export const connect = async (): Promise<void> => {
  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(config.get('db.uri'), mongooseOpts);

  // await mongoose.connect(
  //   mongod.getUri(),
  //   { useNewUrlParser: true, useCreateIndex: true },
  //   (err) => {
  //     if (err) {
  //       console.error(err);
  //       process.exit(1);
  //     }
  //   }
  // );
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
