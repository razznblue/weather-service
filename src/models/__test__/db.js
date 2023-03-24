import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


let mongoDB;

export const connect = async () => {
  mongoDB = await MongoMemoryServer.create();
  const uri = mongoDB.getUri();
  await mongoose.connect(uri);
}

export const cleanData = async () => {
  await mongoose.connection.db.dropDatabase();
}

export const disconnect = async () => {
  await mongoose.disconnect();
  await mongoDB.stop();
}