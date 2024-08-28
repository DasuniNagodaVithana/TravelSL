

import mongoose, { Document, Schema } from 'mongoose';

interface IUserBooking extends Document {
  fullName: string;
  email: string;
  phone: string;
  bookAt: Date;
  guestSize: number;
  totalPrice: number;
  createdAt: Date;
}

const UserBookingSchema: Schema<IUserBooking> = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  bookAt: {
    type: Date,
    required: true,
  },
  guestSize: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserBooking = mongoose.model<IUserBooking>('UserBooking', UserBookingSchema);

export default UserBooking;
