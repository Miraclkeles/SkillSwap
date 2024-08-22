import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoDBConnectionURI: string = process.env.MONGODB_URI || '';

mongoose.connect(mongoDBConnectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB.'))
.catch((error) => console.error('Connection error with MongoDB:', error));

export default mongoose.connection;