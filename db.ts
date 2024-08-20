import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbConnectionUrl: string = process.env.MONGODB_URI || '';
mongoose.connect(dbConnectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Could not connect to MongoDB:', error));
export default mongoose.connection;