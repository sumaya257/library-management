import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB connection failed:', error);
    process.exit(1);
  }
};
