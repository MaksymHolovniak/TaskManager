import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDb = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};

export default connectDb;
