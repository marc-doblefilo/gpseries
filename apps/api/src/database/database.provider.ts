import { createConnection } from 'mongoose';

export const mongoConnection = 'mongoConnection';

export const mongoConnectionProvider = {
  provide: mongoConnection,
  useFactory: async () =>
    createConnection(
      process.env.MONGO_DB_URI || 'mongodb://localhost:27017/gpseries',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
};
