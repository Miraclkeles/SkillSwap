interface MongoDBEventHandlers {
  onConnected?: () => void;
  onError?: (error: any) => void;
  onDisconnected?: () => void;
}

import mongoose, { ConnectionOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDBConnectionURI: string = process.env.MONGODB_URI || '';

const connectionOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
};

const defaultEventHandlers: MongoDBEventHandlers = {
  onConnected: () => console.log('Successfully connected to MongoDB.'),
  onError: (error) => console.error('MongoDB connection error:', error),
  onDisconnected: () => console.log('MongoDB connection disconnected.'),
};

const connectToMongoDB = async (eventHandlers: MongoDBEventHandlers = defaultEventHandlers) => {
  try {
    const db = mongoose.connection;

    db.on('connecting', () => console.log("MongoDB: Connecting..."));
    db.on('error', (error) => {
      if (eventHandlers.onError) eventHandlers.onError(error);
      mongoose.disconnect();
    });
    db.on('connected', () => {
      if (eventHandlers.onConnected) eventHandlers.onConnected();
    });
    db.once('open', () => console.log("MongoDB: Connection is open..."));
    db.on('reconnected', () => console.log("MongoDB: Reconnected!"));
    db.on('disconnected', () => {
      if (eventHandlers.onDisconnected) eventHandlers.onDisconnected();
      console.log("MongoDB: Disconnected. Attempting to reconnect...");
      setTimeout(() => {
        connectToMongoDB(eventHandlers);
      }, connectionOptions.reconnectInterval);
    });

    await mongoose.connect(mongoDBConnectionURI, connectionOptions);
  } catch (error) {
    if (eventHandlers.onError) eventHandlers.onError(error);
  }
};

connectToMongoDB();

export default mongoose.connection;