import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDBConnectionURI: string = process.env.MONGODB_URI || '';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoDBConnectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Connection error with MongoDB:', error);
  }
};

connectToMongoDB();

export default mongoose.connection;