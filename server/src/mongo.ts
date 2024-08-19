import mongoose, { Document, Schema } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error: Error) => {
    console.error('Failed to connect to MongoDB:', error.message);
  });

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
