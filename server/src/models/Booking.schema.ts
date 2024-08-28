import mongoose, { Schema, Document, Model } from 'mongoose';
import { ITour } from '../models/Tours.schema';  

// Define an interface representing a document in MongoDB.
export interface IBooking extends Document {
    tourId: mongoose.ObjectId | ITour;  // Reference to Tour
    fullName: string;
    email: string;
    phone: string;
    bookAt: Date;
    guestSize: number;
    totalPrice: number;
    createdAt: Date;
}

// Define the schema for the booking model.
const BookingSchema: Schema<IBooking> = new Schema({
    tourId: { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },  // Changed to string
    bookAt: { type: Date, required: true },
    guestSize: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create the model using the schema and the document interface.
const BookingModel: Model<IBooking> = mongoose.model<IBooking>('Booking', BookingSchema);

export default BookingModel;
