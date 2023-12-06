import mongodb from 'mongodb';
import env from '../env';

const { MongoClient, ObjectId } = mongodb;

export const client = new MongoClient(env.DATABASE_URL, {
  monitorCommands: true,
});

export { ObjectId };
